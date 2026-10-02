---
title: "Software architecture: design and planning before the first line of code"
description: "Why design software architecture before development: requirements, key decisions, ADRs, decomposition, and planning. How this reduces project cost and risks."
lang: "en"
slug: "arhitektura-programmnogo-obespecheniya"
date: "2026-10-01"
published: "2026-10-01T20:00:00+03:00"
updated: "2026-10-03"
draftaId: "4133F4FD-27C9-4833-B02E-5FC6FE4F4863"
tags: []
machineTranslated: true
translation:
  sourceHash: "51b4d90b4f7cd30a2b940fc71890e00119924049c73732ee4017d2d61c19433b"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:27:15.614Z"
---

The most expensive thing you can do in development is write a lot of code and then find out that the system is not structured the way it needs to be. Fixing the foundation in a finished building is more expensive than doing it right. Therefore, in any project, whether it is an industrial platform or an internal service, I start with architecture. This is part of the overall process described in the article [Software development from scratch turnkey: from idea to release](/blog/razrabotka-po-s-nulya).


## What architecture is and why it is needed

Architecture is a set of key decisions about a system that are difficult to change later: what parts it consists of, how they communicate, where data is stored, how the system is deployed, and how it is protected. Small decisions (function names, the internals of a module) can be changed in a day. Decisions like "one database or several" or "monolith or services" take months to change.

Good architecture gives the client practical things:

- **predictable timelines and budget** — it is clear what the work consists of;
- **the ability to evolve the system** — new features are added without rewriting;
- **fewer errors** — module boundaries keep problems from spreading;
- **security by design** — protection is built into the structure, which is discussed in more detail in the article Безопасная разработка ПО: как защита закладывается с первого дня;
- **independence from the author** — decisions are recorded, and another engineer can take over the project.

## Step 1. Requirements: functional and non-functional

Before drawing diagrams, you need to understand exactly what we are building. I divide requirements into two parts.

**Functional**: what the system does, who works with it, what roles and scenarios it has.

**Non-functional**, which most often determine the architecture:

| Group | Questions |
|---|---|
| Load | How many users, how much data, what is the throughput per second? |
| Reliability | What happens if a server fails? Can data be lost? |
| Security | Who should not see what? What data is personal? |
| Environment | Cloud, own servers, a closed network without internet? |
| Maintenance | Who will deploy and update it? |
| Constraints | Budget, deadlines, mandatory technologies, regulatory requirements |

For example, for ["Ruslo": how an IIoT platform is built for an enterprise's closed network](/blog/ruslo-iiot-platforma) two requirements became decisive: telemetry throughput and operation without internet. They determined the choice of ClickHouse and the rejection of cloud dependencies. For [Keel: how to design a system where you can't peek](/blog/keel-obezlichivanie), the depersonalization requirement was decisive: it determined the structure of the databases.

## Step 2. Key decisions and how to record them

For each significant decision, I record it in a short document called an ADR (Architecture Decision Record):

1. **Context** — what problem is being solved and what constraints exist.
2. **Options** — what was considered.
3. **Decision** — what was chosen.
4. **Consequences** — what was gained and what was paid.

Such a record is needed for two reasons. First, it forces me to test the choice rather than rely on habit. Second, a year later you will not have to guess why the system is structured exactly this way. The habit of justifying decisions came to me from legal practice: a conclusion without justification is not accepted there. More details are in the article [Who is craftzman: from forensic expert to architect](/blog/kto-takoj-craftzman).

## Step 3. Boundaries and structure of the system

Next I determine what parts the system consists of. The questions I ask:

- **Monolith or services?** For a small team and a clear domain, a well-structured modular monolith often wins. Services are needed when parts of the system need to be scaled and deployed independently. In the project [FlameApp](/ru/works/flameApp), we split the monolith into microservices with Kafka and RabbitMQ precisely because there were reasons for it.
- **Where do the data boundaries run?** Who owns the data and who has the right to change it.
- **How do the parts communicate?** Synchronous calls, queues, events.
- **What can be replaced?** I hide external dependencies behind interfaces so that changing a provider does not break the system.

The result is a clear diagram at several levels of detail: context (the system and its environment), containers (applications and storages), components (modules inside).

## Step 4. Choosing technologies

I choose technologies based on requirements, not out of love for what is new. The criteria are maturity, support, availability of specialists, and fit with the load and environment. If a task requires reliability and years of failure-free operation, Rust will do. For enterprise integrations, Java and Spring Boot are often good. For a fast API, Node.js. There is nothing "universally best," and I do not impose my preferences.

## Step 5. Decomposition and planning

When the structure is clear, the system is broken down into tasks. The rules I follow:

- a task is no more than a few days of work and has a verifiable definition of done;
- the first tasks are those that remove the biggest risks (integrations, load, complex access rules);
- an end-to-end scenario is assembled early: from the interface to the database, to verify that the parts fit together;
- the plan separately accounts for tests, documentation, and deployment, rather than "however it turns out."

You get stages with clear results. After each stage, you can stop, look at what has been achieved, and adjust course.

## Step 6. Risks and Plan B

For each notable risk, I write down what causes it, how likely it is, and what to do. For example: "integration with an external service is unstable — then we add a queue and retries." It is better to discuss this in advance than on the delivery day.

## Typical mistakes that architecture helps avoid

- Development starts without non-functional requirements, and at the last moment it turns out that the system cannot handle the load.
- Security is postponed until the end, and it has to be stitched into a finished solution.
- All parts are connected to all others, and any change breaks ten places.
- Decisions are not recorded anywhere and live only in one person's head.

## Need architecture for your product?

I can perform the design separately (as a standalone service) or as part of full development. As a result, you will receive a system diagram, a chosen stack with justification, a list of risks, and a work plan. Write to me: [Telegram @w1shmaster](https://t.me/w1shmaster). How the code is built further is explained in the articles about Качество кода: что оно значит для бизнеса и как его обеспечить and Тестирование и приёмка ПО: как убедиться, что система работает до релиза.
