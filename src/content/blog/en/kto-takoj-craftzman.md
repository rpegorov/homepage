---
title: "Who is craftzman: from forensic expert to architect"
description: "Rostislav Egorov (craftzman): an engineer and lawyer who became a backend developer, team lead, and architect. The path from property valuation to Rust and industrial systems."
lang: "en"
slug: "kto-takoj-craftzman"
date: "2026-09-29"
published: "2026-09-29T12:00:00+03:00"
updated: "2026-10-03"
draftaId: "50DEA3F1-BCB5-4F19-9C77-6442F0AF7FFC"
tags: []
machineTranslated: true
translation:
  sourceHash: "2792e3a6e343fac9326e7e01129800c161c898dd89fd8a160d1b05fc9392414d"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:07:02.968Z"
---

My name is Rostislav Egorov, online I'm craftzman. I build systems that hold up under load: industrial telemetry, CRM, infrastructure for AI agents. By day it's architecture and teams, by night it's Rust, Go, and my own products. I'm writing this article so you don't have to guess who's behind the site and why my path into development looks unusual.

## Why craftzman

The word "craftsman" means a master who makes a thing himself and is responsible for it entirely. In the footer of the site there's the character 匠 ("takumi," master) and the phrase "made personally." This isn't decoration. This is how I work: from the first conversation with a client to the last release, I don't pass responsibility down a chain of managers, analysts, and contractors. One person holds in their head both the business task and the architecture and the code.

## Beginnings: engineer and forensic expert

I was born in 1991 in Dneprodzerzhinsk (today Kamianske). In 2015 I graduated from Saint Petersburg State Forest Technical University with a degree in engineering. That same year I opened a property valuation firm and became a forensic expert: I valued property for courts of general jurisdiction and arbitration, and later began handling cases myself.

Those years gave me what you won't find in programming textbooks:

- **The habit of proving things.** An expert's report must withstand cross-examination in court. A number without justification doesn't survive there. Now I treat architectural decisions the same way: each one must have a reason that can be written down and defended.
- **Working with documents and requirements.** I can read contracts and technical specifications and see where the hole is in them.
- **Responsibility to the client.** If I make a mistake, it has consequences for a living person, not just a bug in a tracker.

In 2020 I graduated from Moscow Financial-Industrial University and earned a master's degree in law. My legal education still helps: contracts, personal data, licenses, liability of the parties — in serious projects you can't do without it.

## Transition into development

In 2018 I completed Java developer courses and went into backend. My first production job was a decision support system for the Ministry of Internal Affairs on Java and Spring Boot. There I designed the architecture, built integrations with external services, and refactored inherited code. Details are in the project card [Frontiers](/ru/works/frontiers).

After that the path looked like this:

| Year | Role                                                        | What I did                                                                                                             |
| ---- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 2018 | Backend developer                                         | Java, Spring Boot, system for the Ministry of Internal Affairs                                                                                    |
| 2021 | Senior backend developer                                 | PHP and Node.js, [enterprise HR system](/ru/works/hr-crm) with Telegram and WhatsApp integration                           |
| 2023 | Team lead  | [Tezish](/ru/works/tezishApp) and [FlameApp](/ru/works/flameApp): team, microservices on Nest.js, Kafka, RabbitMQ, CI |
| 2024 | Team lead, then architect | [AtomMind](/ru/works/atomMind): industrial platform on Java and Go                                                   |
| 2026 | My own products in Rust                                       | [Ruslo](/ru/works/ruslo), [Istok](/ru/works/infodiode), [Keel](/ru/works/keel)                                        |

Currently I'm a tech lead and architect in industrial automation. AtomMind selects equipment operating modes to reduce the defect rate and warns about parameter deviations.

## My own products

Alongside my day job, I build my own products and am solely responsible for them. I started with Swift: [Drafta](/ru/works/drafta) — a Markdown editor for developers, then [Echo](/ru/works/echo) — a system monitor in the macOS menu bar. In 2026 I switched to Rust. An overview of all projects is in the article Чем я занимаюсь: мои продукты и проекты.

My own products are the best test of the approach. When you don't have a boss who'll say "it'll do," you're forced to decide for yourself what "good enough" means. I decided that good enough means the system won't break in a year and won't need to be rewritten.

## How I can be useful

If you need development from scratch or an audit and evolution of an existing system, here's what people come to me for:

- **Architecture and design** — from idea and requirements to the system diagram. More details: Архитектура ПО: проектирование и планирование до первой строки кода.
- **Turnkey development** — backend in Rust, Go, Java, Node.js, web interfaces in Vue. How it's structured: Разработка ПО с нуля под ключ: от идеи до релиза.
- **Security and quality** — Безопасная разработка ПО: как защита закладывается с первого дня and Качество кода: что оно значит для бизнеса и как его обеспечить as part of the process, not a separate "later" service.
- **Tech lead and team** — organizing work, code review, code style, CI.

## And outside of work

On weekends I'm in the forest with my German Shepherd Katie and a tent. About that — in the article Чем я занимаюсь вне кода: лес, кемпинг, фото и овчарка Кэти.

## How to contact me

The best way is to message me on Telegram: [@w1shmaster](https://t.me/w1shmaster). My profile on [GitHub](https://github.com/rpegorov) and [LinkedIn](https://www.linkedin.com/in/rostislav-egorov-2721b8220/) is also open. Describe the task in a few sentences, and I'll reply with where it should start.
