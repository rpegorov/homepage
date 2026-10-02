---
title: "Software testing and acceptance: how to make sure the system works before release"
description: "Software testing before release: unit, integration, load, and end-to-end tests, security checks, acceptance criteria, and release plan."
lang: "en"
slug: "testirovanie-i-priemka"
date: "2026-10-02"
published: "2026-10-02T18:00:00+03:00"
updated: "2026-10-03"
draftaId: "E0B10FB7-2AD3-4675-9CC1-6CB952FF34E4"
tags: []
machineTranslated: true
translation:
  sourceHash: "5459e903a91a5b5a96d169f6741ee267c44965ca3d521012934c2f4772d8210b"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:33:49.957Z"
---

The phrase "we checked everything" means nothing until you answer the question: what exactly was checked and how. Testing is the last barrier between development and your users, but it needs to be built from the first day of the project, not in the last week. I describe how it works for me. This is the final part of the process I describe in the article [Software development from scratch turnkey: from idea to release](/blog/razrabotka-po-s-nulya).

## Why testing is needed

A bug found during development costs minutes. One found after release costs hours, money, and reputation. In industrial systems, the price is even higher: for example, a platform like ["Ruslo": how an IIoT platform is built for an enterprise's closed network](/blog/ruslo-iiot-platforma) has no right to lose data or produce incorrect readings. That's why tests are not a formality but part of the design.

## The testing pyramid

Checks come at different levels, and each has its own role:

| Level | What it checks | Speed | Quantity |
|---|---|---|---|
| Unit tests | Individual functions and rules | Instant | Many |
| Integration | The connection to the database, queues, external services | Seconds | Moderate |
| End-to-end (e2e) | Key user scenarios as a whole | Slow | Few, but important |
| Load | Behavior under data flow and peaks | Separate run | As needed |
| Security checks | Access rights, edge and hostile cases | Per regulations | For critical areas |

The lower the level, the faster and more reliable the test. That's why the foundation is fast unit tests, while there are fewer end-to-end tests, but they cover what the product can't exist without.

## How this is built into development

1. **Tests are written alongside the code.** A new feature without a test is considered unfinished.
2. **Automatic execution.** Every change is run through checks in CI ([Code quality: what it means for business and how to ensure it](/blog/kachestvo-koda)). If it doesn't pass, it won't get into the main branch.
3. **Tests as documentation.** A good test shows how the system should behave and protects against accidental breakage as it evolves.
4. **Bugs get a test.** A found bug is first reproduced by a test and only then fixed, so it won't come back.

## Load testing

A system can work perfectly with three users and fall apart with three hundred. I check how it behaves under realistic volumes: how many requests it handles, where latency appears, what happens under overload, and how it recovers.

Industrial systems need special tools. That's why I built ["Istok"](/ru/works/infodiode) — a load-testing rig for unidirectional data transfer through a hardware diode. The sender generates data over MQTT, TCP, Modbus TCP, OPC UA, and SFTP; the receiver verifies integrity via a SHA-256 checksum, measures latency, and counts losses, with no return channel between them. This approach produces real numbers, not assumptions.

## Security testing

Security checks are part of testing, not a separate ritual. Among the checks:

- attempts to access others' data with incorrect permissions;
- malformed, empty, and huge input data;
- behavior when external services are unavailable;
- checking dependencies for known vulnerabilities.

These checks follow from a threat model drawn up in advance. More details in the article [Secure software development: how protection is built in from day one](/blog/bezopasnaya-razrabotka).

## Acceptance criteria

So that acceptance doesn't turn into a "like it — don't like it" argument, the criteria are agreed upon in advance, at the requirements stage. A good criterion is verifiable and unambiguous: "the monthly report is generated in no more than N seconds for such-and-such a data volume," "a user with role X does not see section Y." Each requirement has a verification method, and acceptance comes down to passing the list.

## Preparing for and conducting a release

A release is a controlled procedure, not a leap into the unknown. Before launch I check:

1. the build is reproducible, versions are pinned;
2. configuration and secrets are moved out of the code;
3. database migrations are tested on a copy of real data;
4. there is a rollback plan and verified backups;
5. logs and monitoring are set up to notice a problem before users do;
6. deployment and maintenance instructions are prepared.

The handover package includes deployment configurations (for example, docker-compose and nginx), technical documentation, and a description of architectural decisions. If the system runs in an isolated environment, like ["Ruslo"](/ru/works/ruslo), all of this is designed for deployment without internet access.

## After release

A release is not the end. I monitor logs and system behavior on real data, fix what's found, and help develop the product further. Thanks to tests and clean architecture, new features are added without fear of breaking something.

## Frequently asked questions

**Is testing needed if the project is small?** Yes, but in reasonable scope: the key logic and main scenarios. The absence of tests is most costly precisely when the product starts to grow.

**Who writes the tests?** I do, as part of development. It's not a separate paid "later" option.

**Can an existing system be tested?** Yes. We start with an audit, cover the riskiest areas with tests, then expand coverage as improvements are made.

**Will you help with acceptance on the customer's side?** Yes, I prepare an acceptance checklist and take part in the verification together with your team.

## Want to release with confidence?

If you need development from scratch where testing is built into the process, or help with verifying an existing product, write to me: [Telegram @w1shmaster](https://t.me/w1shmaster). We'll start with a short discussion of the task and the risk that scares you the most.
