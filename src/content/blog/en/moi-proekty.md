---
title: "What I do: my products and projects"
description: "Overview of craftzman projects: the Ruslo IIoT platform, Keel CRM, the Istok stand, the Drafta editor, the Echo monitor, the Helm workspace. Stack, ideas, and what they have in common."
lang: "en"
slug: "moi-proekty"
date: "2026-09-29"
published: "2026-09-29T18:00:00+03:00"
updated: "2026-10-03"
draftaId: "9413D1BA-5B4B-445B-9069-741155F342CA"
tags: []
machineTranslated: true
translation:
  sourceHash: "8634f27a11d7b0beeebcab5490ec9d6ffd18279bca4f6066e6c3c83dbe6049ac"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:11:50.306Z"
---

Briefly about what I do: during the day — architecture and a team in industrial automation, in the evening — my own products. Here I'll gather them in one place so it's clear what systems with different purposes have in common. I told the story of my path into development in the article [Who is craftzman: from forensic expert to architect](/blog/kto-takoj-craftzman).

## Employment: AtomMind

Since 2024 I've been working on [AtomMind](/ru/works/atomMind) — an industrial digitalization platform built on Java, Go, and Angular. It selects equipment parameters and operating modes to reduce the share of products that don't meet standards, displays the production process, and reports deviations. I started as a team lead, then became an architect, and now I'm a tech lead and architect.

## My own products in Rust

In 2026 I switched to Rust. The reason is simple: for systems that run for years and must not fail, I need strict typing, predictable memory consumption, and a single static binary instead of a scattering of dependencies.

### "Ruslo" — an industrial IIoT platform

["Ruslo"](/ru/works/ruslo) collects telemetry from shop-floor equipment via MQTT, HTTP, Modbus TCP, and OPC UA. An enterprise is represented as a tree "plant → shop → section → machine → metric", and access is restricted by branch. Time series are stored in ClickHouse with automatic aggregates. The platform is deployed inside a closed network, without clouds or internet access. I break down the system's design in the article «Русло»: как строится IIoT-платформа для закрытой сети предприятия.

### Keel — a CRM where depersonalization is built into the architecture

[Keel](/ru/works/keel) — a web CRM for foreign economic activity: client → manager → customs declarant. The manager never sees which declarant is handling a request, and the declarant never sees the client. This is ensured by the server and separate databases, not by hiding fields in the interface. Stack: Rust (axum, sqlx), Vue 3, Postgres. Details in the article Keel: как спроектировать систему, в которой нельзя подсмотреть.

### "Istok" — a test bench for data diodes

["Istok"](/ru/works/infodiode) tests one-way data transfer through a hardware diode. The sender generates traffic, the receiver verifies integrity, measures latency, and counts losses, and there is no return channel between them. It supports MQTT, TCP, Modbus TCP, OPC UA, and SFTP. Each message carries a SHA-256 checksum and a timestamp. It builds into static musl binaries for Astra Linux SE.

## My own products in Swift

Before Rust, I made apps for macOS:

- **[Drafta](/ru/works/drafta)** — a Markdown editor for developers built on CodeMirror 6 inside a native SwiftUI app: version history, notebooks, tags, iCloud sync. Drafta has its own blog, it lives on this same site, for example [Drafta MCP server: agents read and write notes](/blog/mcp-server) and [AI assistant in Drafta: ⌘J and your key](/blog/ai-assistent).
- **[Echo](/ru/works/echo)** — a system monitor in the menu bar: CPU, RAM, disk, network, a tiling window manager, clipboard history. Monitoring pauses when there are no windows and saves battery.
- **[Helm](/ru/works/helm)** — a workspace for macOS: documents, tasks, Gantt charts, risks, and project planning.

## What unites all the projects

The projects are different, but the approach is the same:

1. **Architecture first.** I don't start writing code until I understand what the system should do and what it should not do. There's a separate article about this: Архитектура ПО: проектирование и планирование до первой строки кода.
2. **Security as a property of the system.** In Keel it's data isolation, in "Ruslo" it's working without the internet. A breakdown of the approach: Безопасная разработка ПО: как защита закладывается с первого дня.
3. **One author — one responsibility.** I'm responsible for the product as a whole, and that's why I don't leave "temporary solutions" in place.
4. **Native design and ease of operation.** One binary, clear configuration, minimal external dependencies.

## Previous employment

The portfolio also includes projects from earlier years: a decision support system for the Ministry of Internal Affairs ([Frontiers](/ru/works/frontiers)), an [enterprise HR system](/ru/works/hr-crm), the apps [Tezish](/ru/works/tezishApp) and [FlameApp](/ru/works/flameApp), and the business card website [Etalon](/ru/works/etalon). The full list is on the [Projects](/ru/works) page.

## Want the same for your product

If you need a system with clear architecture, security, and tests from day one, start with a conversation: [Telegram @w1shmaster](https://t.me/w1shmaster). How development works from idea to release is described in the article Разработка ПО с нуля под ключ: от идеи до релиза.
