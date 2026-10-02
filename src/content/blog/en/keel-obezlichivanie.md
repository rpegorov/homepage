---
title: "Keel: how to design a system where you can't peek"
description: "Analysis of the Keel CRM architecture for foreign trade: depersonalization at the server level and separate databases, rather than hiding fields in the interface. Rust, axum, sqlx, Vue 3, Postgres."
lang: "en"
slug: "keel-obezlichivanie"
date: "2026-10-01"
published: "2026-10-01T12:00:00+03:00"
updated: "2026-10-03"
draftaId: "4D94884E-8016-466A-8643-E2ACF8514B2F"
tags: []
machineTranslated: true
translation:
  sourceHash: "cc22828a58d5790ea2dba8d87e5e0f2881b1b79b104a54a656ec058d36de602d"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:14:37.434Z"
---

In most CRMs, "hide a field" means removing it from the screen. The data still sits in the same table, arrives in the browser in the API response, and can be retrieved by anyone who opens developer tools. For an ordinary task, that's enough. For [Keel](/ru/works/keel), it isn't, because the whole point of the product is that some people shouldn't know certain things. Let me explain how this is designed.

## The task: the client → manager → declarant chain

Keel is a web CRM for the foreign trade (foreign economic activity) process. There are three roles in the process:

- **Client** — the company that needs cargo cleared.
- **Manager** — works with the client and knows them.
- **Customs declarant** — prepares the documents and knows the request.

The key requirement is **depersonalization**: the manager never knows which declarant is handling the request, and the declarant never knows who the client is. This protects the service's business model and personal data: you can't "bypass" the intermediary because there's nothing to bypass.

## Why hiding a field in the interface isn't a solution

If the restriction is implemented in the interface, it holds only until the first API request. Typical holes:

1. The API returns the entire object, and the frontend simply doesn't display some fields.
2. Error messages accidentally reveal identifiers.
3. Search, filters, and sorting allow the hidden value to be inferred indirectly.
4. Exports and reports are built with a query that doesn't know about visibility rules.

Each such hole is a real production incident. That's why in Keel the restriction sits where it can't be bypassed.

## What was done in the architecture

Depersonalization is ensured by the server and **physically separate databases**:

| Layer | How it works |
|---|---|
| Storage | Data that different roles shouldn't know about each other lies in physically separate databases |
| Server | Each request is executed in the context of a role. The server physically does not access the data that the role must not know |
| API | The role doesn't receive extra fields even when called manually. Only what is permitted is returned |
| Interface | Simply displays what the server permitted. Security doesn't rely on it |

The principle is this: **security shouldn't depend on a developer not forgetting to add a check**. If the data isn't in the response, it can't be stolen or shown by mistake.

## The stack and why it's this way

- **Rust (axum, sqlx)** — strict typing makes it possible to express access rules at the type level, and some errors of this kind are caught by the compiler rather than in production. The sqlx library can verify SQL queries against the database schema at build time.
- **Postgres** — a reliable relational database with rich access-control capabilities.
- **S3** — document storage.
- **Vue 3 + TypeScript** — an interface with typed API access.
- **Self-hosted, single-tenant** — each customer has their own installation and their own data, with no shared multi-tenant database.

## What else the product can do

The CRM core: roles, client cards with controlled access to personal data, requests with SLAs. On top of it — task management with kanban boards, Gantt chart planning, time tracking, a block-based document editor with export to DOCX and PDF, as well as client communication channels via Telegram, email, and WhatsApp.

## What this project teaches

1. **Security requirements need to be identified before design, not after.** "The manager must not know the declarant" isn't a checklist item at the end, it's an initial condition that determined the structure of the databases.
2. **Security is a property of the architecture.** It can't be "bolted on" before release. More on the approach: Безопасная разработка ПО: как защита закладывается с первого дня.
3. **Strict tools save time.** Types and build-time checks catch errors long before production, and that's part of Качество кода: что оно значит для бизнеса и как его обеспечить.
4. **Legal literacy helps.** Personal data, roles, and the responsibilities of the parties need to be understood before writing code.

## Need a system with strict access rules?

If your product has data that different groups of people shouldn't see, start by designing the access boundaries. Describe your task to me on Telegram: [@w1shmaster](https://t.me/w1shmaster). The article Разработка ПО с нуля под ключ: от идеи до релиза explains how we go from idea to a working system.
