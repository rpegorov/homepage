---
title: "Secure software development: how protection is built in from day one"
description: "Secure software development: threat modeling, secure architecture, data and secret protection, dependency control, review and testing. Principles and checklist."
lang: "en"
slug: "bezopasnaya-razrabotka"
date: "2026-10-02"
published: "2026-10-02T10:00:00+03:00"
updated: "2026-10-03"
draftaId: "915598B4-CFE7-4EF7-9AA1-A57BF50C76A6"
tags: []
machineTranslated: true
translation:
  sourceHash: "0daeb7e80e1f69b6d0b93fcd5a90e86bc2a3e8b00ed4c32deadd887fe3acac62"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T22:30:50.344Z"
---

Security cannot be bought as a separate service at the end of a project. Once the system is already written, any protection turns into patches: expensive, incomplete, and breaking what used to work. That is why I build security into the process from day one: into requirements, architecture, code, checks, and deployment. Below is what this looks like in practice. This is part of the overall approach described in the article [Software development from scratch turnkey: from idea to release](/blog/razrabotka-po-s-nulya).

## Principle: security is a property of the system

A telling example is the CRM [Keel: how to design a system where you can't peek](/blog/keel-obezlichivanie). The requirement "a manager must not know the declarant" can be implemented by hiding the field in the interface, or by separating the data across isolated databases so that the server physically cannot disclose it. The first option breaks with a single API request. The second option is protected by the very structure of the system. I always choose the second path when the cost of error is high.

## 1. Threat modeling at the design stage

Even before writing code, I answer the questions:

- **What are we protecting?** Personal data, trade secrets, control commands, service availability.
- **From whom?** An external attacker, a malicious employee, user error, a compromised dependency.
- **How can they attack?** For assessment I use the STRIDE classification: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.
- **What should be done?** For each threat I define a measure: prohibit, restrict, detect, or consciously accept the risk.

The result is a short document that becomes part of [Software architecture: design and planning before the first line of code](/blog/arhitektura-programmnogo-obespecheniya). It is needed so that protection is built according to a plan, not according to a feeling.

## 2. Secure architecture

Architectural decisions follow from the threat model:

| Principle | What it means |
|---|---|
| Least privilege | Each service and user receives only the rights needed to do the work |
| Data separation | Sensitive data is stored separately and accessible to a narrow circle |
| Defense in depth | Several independent barriers: a failure of one does not give up the whole system |
| Deny by default | If an access rule is not described, access is closed |
| Minimum external dependencies | Less third-party code and fewer external channels, smaller attack surface |

The extreme case is ["Ruslo": how an IIoT platform is built for an enterprise's closed network](/blog/ruslo-iiot-platforma): the platform is deployed inside a closed enterprise network, without cloud dependencies and without internet access during operation. No external channel means no attacks through it.

## 3. Secure code

At the code level, I follow practices that close most common vulnerabilities from the OWASP Top 10 list:

- **Input validation** at the system boundary. Data from a user, external service, or device is considered untrusted until verified.
- **Parameterized queries** to the database. No string concatenation of SQL: this closes injections. In Rust, the sqlx library additionally checks queries at build time.
- **Server-side access control** on every request, not only in the interface.
- **Secure handling of passwords and sessions**: strong hashing, limited lifetime, protection against brute force.
- **Careful error messages**: the user sees clear text, while details go to the log.
- **Memory safety.** For critical systems I choose Rust, where entire classes of errors (buffer overflow, use-after-free) are eliminated by the compiler.

## 4. Secrets and configuration

Passwords, keys, and tokens are not stored in code or the repository. They are passed through the environment or a secrets store, different for different environments. Access is restricted and logged. If a secret does end up in the repository, it is considered compromised and replaced.

## 5. Dependencies and the supply chain

A modern application is 90% third-party code, so it must be controlled:

- I minimize the number of dependencies and choose mature, maintained ones;
- I pin versions (lock files) so that the build is reproducible;
- I regularly check dependencies for known vulnerabilities using the ecosystem's standard tools (`cargo audit`, `npm audit`);
- I update dependencies on a schedule, not only when something breaks.

## 6. Checks in the process

Security is checked at every stage, not before release:

1. **Code review** with special attention to access rights and input handling.
2. **Automated checks** in CI: linters, static analysis, dependency checks.
3. **Security tests**: attempts to access others' data, incorrect rights, boundary values.
4. **Load testing** showing how the system behaves under pressure. For this I also use my own test bench ["Istok"](/ru/works/infodiode).

More about checks — in the articles [Code quality: what it means for business and how to ensure it](/blog/kachestvo-koda) and Тестирование и приёмка ПО: как убедиться, что система работает до релиза.

## 7. Logs, backups, and recovery

If something happens, it must be possible to reconstruct the picture. Therefore the system has a log of significant actions (without passwords and unnecessary personal data), backups, and a proven recovery procedure. A backup that has never been tested for recovery is a hope, not protection.

## 8. Personal data and the legal side

When working with personal data, one must understand not only the technology but also the law: what data to collect, how long to store it, who has access to it. My legal education (a master's degree in law) helps discuss these matters with the client in the same language and build requirements into the architecture, rather than remembering them during an audit. At the same time, I do not replace your company's lawyer: the final compliance assessment is made by specialists in your field.

## A short checklist for the client

Questions worth asking any contractor:

- Do you have a threat model for my system?
- Where are secrets stored and who has access to them?
- How do you control dependencies?
- How is access control verified?
- How does recovery from a backup work?
- What is written to the log, and what is not?

If there are no clear answers to these questions, security most likely remains a wish.

## Want security to be built into your project?

Write to me: [Telegram @w1shmaster](https://t.me/w1shmaster). We will discuss what exactly needs to be protected and how to build it into the system from the very beginning.
