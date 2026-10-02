---
title: "Software development from scratch turnkey: from idea to release"
description: "How software development from scratch proceeds: idea, requirements, architecture, planning, development, testing, release, and support. Stages, timelines, risks, and what the customer gets."
lang: "en"
slug: "razrabotka-po-s-nulya"
date: "2026-10-01"
published: "2026-10-01T16:00:00+03:00"
updated: "2026-10-03"
draftaId: "306F760F-AA81-4C9E-8073-D8F9B12673D8"
tags: []
machineTranslated: true
translation:
  sourceHash: "e84ecb6ddd062cef0fad38fc426a886d7bb96e08f44f37d03b576e95dde84d9a"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:24:37.193Z"
---

Custom development from scratch is always a risk: the client pays for something that doesn't exist yet and can't touch the result in advance. A good process turns that risk into a manageable one. Below is how I handle turnkey software development: from the first conversation about the idea to release and support. Who I am and what I work with is described in the article [Who is craftzman: from forensic expert to architect](/blog/kto-takoj-craftzman).

## What "turnkey" means

"Turnkey" means you don't have to assemble a team of an analyst, architect, backend and frontend developers, tester, and DevOps engineer yourself and coordinate them. I take full responsibility for the result: from understanding the task to a working system on your servers or in your infrastructure. I apply this approach in my own products as well: ["Ruslo"](/ru/works/ruslo), [Keel](/ru/works/keel), [Drafta](/ru/works/drafta).

## Development stages

| Stage | Result for the client |
|---|---|
| 1. Idea and goals | A clear formulation: what the system does and why the business needs it |
| 2. Requirements | A document describing what is included in the system and what is not |
| 3. Architecture | System diagram, chosen stack, rationale for decisions |
| 4. Planning | Decomposition, stages, timelines, delivery order |
| 5. Development | Working parts of the system that can be reviewed along the way |
| 6. Testing | Confirmation that the system works and withstands load |
| 7. Release | Deployed system, instructions, knowledge transfer |
| 8. Support | Fixes, development, updates |

### 1. Idea and goals

I start with questions, not technologies. What problem are you solving? Who will use it? How will we know it worked? A good formulation of the goal saves months: most often it's not development that costs a lot, but development of the wrong thing.

### 2. Requirements

I divide requirements into functional ("what the system does") and non-functional ("how well it does it"): load, availability, security, data retention periods, deployment environment. Clients most often forget non-functional requirements, and adapting the system to them later is the most expensive. This stage also brings out the expert's experience: I'm used to reading contracts and specifications and finding contradictions in them before work begins.

### 3. Architecture

This is the most important stage, and it comes before writing the main code. I choose the approach, module boundaries, data stores, and deployment method, and then I write down the decisions along with the reasons. Detailed breakdown: Архитектура ПО: проектирование и планирование до первой строки кода.

### 4. Planning

I break the system into small parts that can be built and verified within a few days. The first thing done is what removes the biggest risk or brings the client the first benefit. You get a plan with stages, not a promise that "everything will be at the end."

### 5. Development

Work proceeds in short iterations. Each ends with a working part of the system that can be reviewed, not a report on what was done. The process follows rules that I describe in detail in the articles Качество кода: что оно значит для бизнеса и как его обеспечить and Безопасная разработка ПО: как защита закладывается с первого дня: code review, a unified style, automated checks, security by default.

### 6. Testing and acceptance

Verification starts not at the end, but from day one: automated tests, integration checks, load testing. Before release, acceptance takes place according to pre-agreed criteria. More details: Тестирование и приёмка ПО: как убедиться, что система работает до релиза.

### 7. Release and handover

The system must be deployable, updatable, and rollback-capable. I leave behind the deployment configuration (docker-compose, nginx, CI), technical documentation, and instructions. You are not tied to me: another engineer can take over the project.

### 8. Support and development

After release, real users appear, and with them, new ideas. A system with clean architecture and tests can be developed without fear of breaking what exists.

## How development from scratch differs from enhancement

From scratch, it's easier to lay the right foundations: structure, security, tests. But there's also a risk — the temptation to do "everything" at once. I follow the principle of a **minimum viable product**: first the core that solves the main task, then extensions based on real feedback. When enhancing an existing system, I start with an audit: I read the code, look at the architecture, find bottlenecks and risks, and only then plan changes. I have extensive refactoring experience; for example, in the [FlameApp](/ru/works/flameApp) project I split a monolith into microservices.

## Technology stack

I choose the stack for the task, not for fashion:

- **Rust** — systems with high requirements for reliability, performance, and security: industrial platforms, server-side components with strict access rules;
- **Go, Java (Spring Boot)** — enterprise services and integrations;
- **Node.js / Nest.js** — fast APIs and microservices;
- **Vue 3 and TypeScript, Astro** — interfaces and websites;
- **Postgres, ClickHouse** — relational data and time series;
- **Swift** — native applications for macOS.

## Frequently asked questions

**How much does development cost and how long does it take?** It depends on the scope. I don't quote figures based on a "in a nutshell" description: after the idea, requirements, and architecture stages, you get a plan with estimates by stage.

**What do I get at the end?** A working system, source code, documentation, deployment configuration, and a description of architectural decisions.

**What if the requirements change?** That's normal. That's why work proceeds in iterations, and the architecture is designed with room for change.

**Who owns the code?** The terms are determined by the contract. I discuss the rights to the source code and licenses in advance.

**Is it possible to work from a closed network?** Yes. I have experience with systems that operate entirely within a closed environment: ["Ruslo": how an IIoT platform is built for an enterprise's closed network](/blog/ruslo-iiot-platforma).

## Let's start with a conversation

If you have a product idea or an internal system that it's time to build, message me on Telegram: [@w1shmaster](https://t.me/w1shmaster). Describe the task in a few sentences, and I'll tell you where it's best to start and what can be avoided.
