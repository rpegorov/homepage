---
title: "\"Ruslo\": how an IIoT platform is built for an enterprise's closed network"
description: "How the Ruslo IIoT platform is structured: telemetry collection via MQTT, Modbus TCP, and OPC UA, ClickHouse, enterprise tree, operation without the internet. Analysis of architectural decisions."
lang: "en"
slug: "ruslo-iiot-platforma"
date: "2026-09-30"
published: "2026-09-30T18:00:00+03:00"
updated: "2026-10-03"
draftaId: "45EFD30D-4852-44E8-8F9D-5BF39CC55DD8"
tags: []
machineTranslated: true
translation:
  sourceHash: "a7746ad93454bc9cceb4ebb580d34c074c86e55ae12ac61aa2863f4fc50f118b"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:18:05.506Z"
---

Customers of industrial systems ask the same question: "Can you do it without the cloud?" There is no internet in the workshop, and sometimes it cannot be connected due to security requirements. This question gave rise to ["Ruslo"](/ru/works/ruslo) — an IIoT platform that collects telemetry from equipment, stores it, and shows it to engineers. I'll tell you what solutions form its foundation and why they are the way they are.

## What problem the platform solves

A production facility has dozens of machines and sensors, and each speaks its own protocol. You need to collect the data, not lose it, display it in an understandable form, and warn in time when a metric goes beyond a threshold. All of this must work inside the enterprise's closed network, without cloud dependencies or third-party licenses.

## Four data ingestion channels

"Ruslo" receives telemetry through four independent channels:

| Protocol | Where it is found |
|---|---|
| MQTT | sensors and gateways that publish data themselves |
| HTTP | integrations and scripts |
| Modbus TCP | controllers and instruments |
| OPC UA | modern automation systems |

One detail matters here: the platform uses the **source timestamp, not the polling time**. If a gateway accumulated data due to a communication failure and sent it in a batch, it will land on the graph at the moment when it was actually measured. For analyzing a technological process, this is fundamental: otherwise the curves will drift, and the conclusions will turn out to be incorrect.

## The enterprise as a tree

The data is organized as a tree: "plant → shop → section → machine → metric." This is not just convenient navigation. Access is restricted **by branch**: a section foreman sees their section, a shop manager sees the shop, the director sees everything. Rights are built on the enterprise structure, not on a list of allowed screens.

## Storing time series in ClickHouse

Telemetry is a huge stream of similar records. An ordinary relational database suffocates under such a stream, so for time series I chose ClickHouse. The platform:

- automatically calculates minute and hourly aggregates so that graphs for a month are built instantly;
- uses multi-level storage: fresh data is stored in detail, old data in aggregated form;
- does not force the engineer to think about where a particular graph comes from.

For the platform's other data (users, rights, settings), the stack includes Postgres. Each storage is responsible for what it is good at.

## Mimic diagrams, notifications, and extensions

The Vue 3 interface is complemented by:

- **2.5D mimic diagrams of the shop** — a visual diagram where you can see which unit is in which state;
- **threshold notifications** with a delivery log: you can check that the message went out and to whom;
- **extension modules** from third-party developers. They are installed as packages and appear in the interface without rebuilding the platform.

## Working without the internet

A closed network is not a limitation but a design requirement. Therefore, in "Ruslo":

1. there are no calls to cloud services during operation;
2. there are no third-party licenses or internet access;
3. the entire stack is deployed on the enterprise's servers.

The platform is written in Rust. For such a system, I care about three properties of the language: memory safety, the absence of a garbage collector with unexpected pauses, and the ability to build a self-contained artifact. For more on why safety is built in at the design stage, see the article Безопасная разработка ПО: как защита закладывается с первого дня.

## How to test such a platform

A platform that collects telemetry must be tested for losses and delays. For this I use a separate test bench — ["Istok"](/ru/works/infodiode). It generates a data stream, checks integrity using SHA-256, and measures latency. This way, load testing becomes part of development rather than a formality before delivery. I described how verification before release is generally structured in the article Тестирование и приёмка ПО: как убедиться, что система работает до релиза.

## Need a similar system?

If you need a platform for collecting and analyzing production data, as well as any product with strict requirements for reliability and network isolation, let's discuss: [Telegram @w1shmaster](https://t.me/w1shmaster). We'll start with Архитектура ПО: проектирование и планирование до первой строки кода, because that is exactly what determines how long the system will live.
