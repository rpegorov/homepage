---
title: "Echo 2.3.1: accurate CPU and GPU temperature"
description: "Fixed the CPU and GPU temperature sticking at ~105 °C at idle and the disappearance of the temperature tab after a sensor read failure."
lang: "en"
slug: "echo-2-3-1-temperature-fix"
date: "2026-10-31"
published: "2026-10-31T01:05:00+03:00"
updated: "2026-10-31"
draftaId: "F72B99A5-21EA-445B-A20F-E38DC70F3FB2"
tags: []
machineTranslated: true
translation:
  sourceHash: "e683cde378f23f524c857417063ba25bb145896ffe002108ec36d649b2c5ff16"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-30T23:06:01.590Z"
---

## What Was Fixed

In Echo 2.3, the CPU temperature could show ~105 °C on a cold laptop at idle. The reason: the SMC, along with the real sensors, reports throttle limits — "overheat threshold" constants for each P-cluster that are read as regular values (93–105 °C). The temperature tab shows the maximum across all keys, and the stored limit always won out over the real sensors. The filter that separates limits from measurements trusted a key forever after its first change — and limits shift over time, so once a key shifted, it stuck to the maximum forever.

Now a key must constantly "move" to be included in the maximum: a key with no movement is treated as a limit immediately, and a key that has sat at the same value for 12 seconds is excluded again. The idle temperature is now honest right away — 55–60 °C, with no starting window of 105 °C after launch.

The second fix is small but nice: a single failed sensor read cycle no longer hides the temperature tab until restart — availability follows the last read.

## Update

Echo 2.3.1 is already on GitHub. The update will arrive automatically via the built-in updater, or download Echo-2.3.1.dmg (4.9 MB) from the releases page.
