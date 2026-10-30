---
title: "High loads and large data volumes: how to test them and what the numbers show"
description: "How to test a system for high loads and large data volumes: load profiles, tool choice (Rust vs Go), accounting for losses without a feedback channel, integrity and latency control. Real numbers: hundreds of gigabytes, millions of messages, zero distortion."
lang: "en"
slug: "vysokie-nagruzki-obemy-dannyh"
date: "2026-10-02"
published: "2026-10-02T22:00:00+03:00"
updated: "2026-10-31"
draftaId: "80648B91-8E38-4466-944C-C3F4A1E96B83"
tags: []
machineTranslated: true
translation:
  sourceHash: "985d9d9f8bfafacacd61c43d12f949e414a2620ec5cf5f8fe6a199fe87ef8b72"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-30T22:15:42.131Z"
---

"Will the system handle the load?" is a question most often answered with "it should." Meanwhile, no one has seen the numbers. I answer with measurements: first I translate the requirement into bytes and messages per second, then I create that load on a test bench and see how much arrived, whether intact, and in what time. Below is how this is structured using the example of tests where about 960 GB of data passed through a single gateway, and what follows from them for any system with large flows. The general approach to pre-release verification is described in the article [Software testing and acceptance: how to make sure the system works before release](/blog/testirovanie-i-priemka).

## You need to start by translating the requirement into numbers

The requirement "the system must withstand enterprise load" cannot be verified. It must be broken down into numbers. Here is how it looked in a real task:

| Profile parameter | Value |
|---|---|
| Machines at the enterprise | 100–200 |
| Indicators per machine | estimated value 50 |
| Collection frequency | no more than once per second |
| Telemetry packet | about 300 KB per message |
| File exchange | file up to 1 MB every few minutes |

This yields the requirement: 200 machines × 50 indicators × 1 Hz = **10,000 indicators per second**. Writing one indicator takes about 130 bytes, meaning the flow is **1.24 MB/s (10.4 Mbit/s)**. For a conservative estimate at 200 bytes per record — 1.91 MB/s. Per day this is about 0.10 TB.

Now the requirement has units of measurement, and it can be compared with what the bench showed. Without this step, any "successful test" proves nothing.

## What the measurements showed

The load was created across five protocols simultaneously (MQTT, TCP, SFTP, Modbus TCP, OPC UA) at two independent sites with different network infrastructure.

| Metric | Site 1 | Site 2 |
|---|---|---|
| Continuous operation under load | 4 h 31 min | 40 min |
| Data delivered | 834 GB | 127 GB |
| Messages delivered | 2.57 million | 0.39 million |
| Delivery bandwidth | 52.5 MB/s (440 Mbit/s) | 52.9 MB/s (444 Mbit/s) |
| SHA-256 checksum mismatches | 0 | 0 |
| CRC16 errors in telemetry frames | 0 | 0 |

In total: about 961 GB, 2.96 million messages, and 789 thousand industrial telemetry frames without a single corrupted message. The main metrics of the two sites differ by less than 1%, meaning the result is reproducible and does not depend on a specific network.

The headroom relative to the requirement came out as follows:

| Requirement | Needed | Measured | Headroom |
|---|---|---|---|
| 10,000 indicators/s | 1.24 MB/s | 52.5–52.9 MB/s | 42× (at 200 B per record — 27×) |
| The same data as 300 KB messages | 4.2 msg/s | 158–159 msg/s | at least 24× |
| 1 MB file every 3 minutes | 5.7 KB/s | 1.06 MB/s | 191× |

A headroom of two orders of magnitude is the correct answer to the question "will it handle it": not "yes," but "24 times more than needed, and here is how we measured it."

## How the bench is structured

For such checks I built ["Istock"](/ru/works/infodiode). It consists of two independent services on opposite sides of the system under test: a load generator at the input and a receiver-verifier at the output. There may be no return channel between them, so the receiver itself counts what arrived and what did not.

### Load profiles

A single "maximum requests" says nothing about the system. Different profiles are needed:

| Profile | What it checks |
|---|---|
| Streaming | uniform transmission one message at a time, as in real operation |
| Batch | maximum throughput with parallel sending |
| Large-block | bandwidth and behavior on packets of 5–100 MB |
| Industrial telemetry | the cycle "N machines × M indicators × F Hz" |
| Combined | all protocols simultaneously and how they share the total bandwidth |

All profiles are launched by a command via the API, without manual actions. This is needed for reproducibility: a run can be repeated and compared with the previous one.

### Honest load

Two decisions that determine what can be trusted:

- **Uniform rate.** Rate limiting is done with a token bucket algorithm without burst accumulation. After a pause, the generator does not dump the accumulated backlog in a burst, so the measured latency reflects the behavior of the system, not the generator's buffer.
- **Deterministic data.** The content is set by the generator seed: with the same seed, the sequence is reproduced bit for bit.

## The generator itself must not be a bottleneck

If the generator cannot sustain the required rate, you are measuring it, not the system. Therefore the load tool must be verified as rigorously as the system under test. "Istock" existed for me in several versions, and the difference turned out to be significant:

| Version | What the measurements showed |
|---|---|
| Rust | about 120 thousand messages per second |
| Go | about 20 thousand messages per second, i.e., 6 times less |
| Deno | a memory leak appeared under prolonged load |

For 10,000 indicators per second, any of them would have been enough. But the bench must provide a load **with a large margin above the system under test**, otherwise you will not learn its limit: you will hit the generator's ceiling and mistake it for the system's ceiling. In addition, a run lasts for hours, and the tool must sustain the load as stably at the end as at the beginning. A memory leak in the generator ruins a long test: the bench degrades, and it is unclear what exactly you measured.

Therefore the working version became Rust: it has headroom in rate and predictable memory consumption over the long haul.

## How to count losses and corruption

If there is no return channel, there is nowhere to get "delivery confirmations" from. Losses are counted in two independent ways:

- **Comparing counters on both sides.** An end-to-end message number distinguishes loss from reordering.
- **Sequence gaps.** Each telemetry frame has a cyclic counter. A hole in it means lost frames, and this does not require data from the transmitting side.

Corruption is counted separately from losses: a SHA-256 mismatch and a CRC16 error are a different type of failure. If they are mixed, the final figure will not make it clear what broke: the network, the gateway, or the format.

For a system in which data cannot be retransmitted, integrity is the main result. Here it is confirmed on a volume of 961 GB: zero corruption.

## Latency and clocks

Latency is calculated as the difference between the reception time and the source timestamp in the message. If the server clocks diverge, the numbers are meaningless, and in a one-way scheme, clocks cannot be synchronized over the channel.

During the tests, the bench clocks diverged by about 7 minutes. The bench noticed this itself: a negative latency is physically impossible, and from the number of such samples it estimated the offset and marked the metrics as `UNRELIABLE`. Therefore, the final report does not include latency at all. An honest "not measured" is better than a beautiful number that cannot be defended.

> [!IMPORTANT]
> Time synchronization via NTP on both sides is enabled before measurements begin, not after. Without it, nothing can be said about latency.

## How not to break the measurement with the measurement itself

A few rules that seem like trifles until they ruin a run:

1. **Do not write every message to the log.** At thousands of messages per second, this itself distorts the result. The log is kept as aggregates once every 10 seconds.
2. **Write statistics snapshots to disk on a schedule.** If the service crashes in the middle of a 24-hour run, the result remains, and no operator is needed nearby.
3. **Measure the full frame and the payload separately.** Bandwidth is compared with the declared value by full frame size, and the useful channel throughput — by payload.
4. **Check channels one by one before a long run.** A configuration error in one protocol devalues a day of combined testing of the others.
5. **Zero the counters before the start.** The initial state is recorded explicitly.

## What these tests did not prove

This is no less important than the results, and I wrote this directly in the report:

- **A full day was not measured.** The maximum continuous operation was 4 h 31 min. Values of about 3.4 TB per day were obtained by recalculation: this is an estimate, not a measurement.
- **The ceiling was not found.** The bench channel was close to saturation: a gigabit line at 440 Mbit/s with half occupied by extra load. The obtained 52 MB/s is the delivered stream under this configuration, not the limit of the system.
- **The data compressed well.** The volume at the input and output of the gateway differed in such a way that the compression effect is visible: the test load contained whitespace padding. On poorly compressible data, the limit may be lower.
- **The saturation point of one of the protocols was not determined.** Only the interval is known: 2.7% loss at 17 frames/s and 79% at 95 frames/s. The profile requirement lies within this interval, so the honest answer is "not proven, another run with frequency stepping is needed."

Such a list is needed not for self-criticism. It defines what exactly the customer can accept as fact and what as an estimate, and which runs to conduct next.

## What follows from this for your system

1. **Translate the requirement into numbers** before testing: messages per second, bytes per second, volume per day.
2. **Measure the margin, not "works/doesn't work."** The margin factor is immediately visible, and it shows where the risk is.
3. **Check the load generator itself:** its rate ceiling and memory behavior over the long haul. The choice of language matters here: in my measurements, the difference between Rust and Go was 6 times.
4. **Count losses and distortions separately** and with independent counters.
5. **Separate measurement from estimation.** Recalculation to a day is not the same as a day of operation.
6. **Check the bench itself in advance:** channel capacity, clocks, data compression.
7. **Test across multiple profiles** and at two sites if you can: reproducibility is itself a result.

The same principles also work for stream storage: how I choose a database for a large telemetry stream is described in the article ["Ruslo": how an IIoT platform is built for an enterprise's closed network](/blog/ruslo-iiot-platforma), and how non-functional load requirements affect architecture choice — in the article [Software architecture: design and planning before the first line of code](/blog/arhitektura-programmnogo-obespecheniya).

## Need to test your system's load?

If it matters to you to know not "it should work" but "it withstands N times more than needed, and here is the proof," write: [Telegram @w1shmaster](https://t.me/w1shmaster). We'll start by translating requirements into numbers and selecting profiles.
