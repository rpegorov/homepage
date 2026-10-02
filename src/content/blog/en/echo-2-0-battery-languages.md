---
title: "Echo 2.0: battery and two languages"
description: "Echo 2.0 has a battery feature — a charge graph for the day and the apps that drained it — with an interface in Russian and English, and layout autocorrection has become a separate toggle."
lang: "en"
slug: "echo-2-0-battery-languages"
date: "2026-09-23"
published: "2026-09-23T21:45:00+03:00"
updated: "2026-10-03"
draftaId: "6F5FE133-6E27-4372-A88F-AA0D8E5056AE"
tags: []
machineTranslated: true
translation:
  sourceHash: "9b80419b763553adacb6e40c78868ba9b869c2730b9ff69f28b7c44a64b0fa04"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:57:33.404Z"
---

## Battery

A battery row has appeared in the Echo window: the charge level and what it's currently doing — charging, running on power adapter, charged, or running on battery.

A separate tab shows a charge graph for the last 24 hours. Charging periods are marked on the time axis. Click anywhere on the graph — Echo will show the ten apps that used the most energy at that moment.

How it works:

- while the Mac is running on battery, Echo samples energy usage per process every 5 minutes;
- the history is stored only on your Mac and only for the last 24 hours.

## Russian and English

The Echo interface is now in two languages. By default it follows the macOS language, and in Settings → General you can choose English or Russian. The language changes instantly, without a restart.

## Autocorrect — separately

Previously, layout autocorrect was enabled only together with Ultra Switch. Now they are two independent toggles: you can keep the ⌥Space and ⌥⇧Space hotkeys but turn off autocorrect, and vice versa.

## Little things

- Clipboard History and Prevent Sleep remember their state after a restart.
- On the CPU and Memory tabs — the ten heaviest processes.
- The labels under the rings are larger and readable at a glance.
- The clipboard history window closes immediately after selecting an entry.

The update arrives on its own, or `Echo-2.0.dmg` — on the [releases page](https://github.com/rpegorov/Echo/releases).
