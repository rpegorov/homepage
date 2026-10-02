---
title: "Echo 1.1: Prevent Sleep really does prevent sleep"
description: "In Echo 1.1, Prevent Sleep has been fixed: the display no longer turns off, and the Mac no longer goes to sleep, including with the lid closed."
lang: "en"
slug: "echo-1-1-prevent-sleep"
date: "2026-07-07"
published: "2026-07-07T16:13:00+03:00"
updated: "2026-10-03"
draftaId: "EA8FDD49-B511-42D5-9E68-273DE8C9F785"
tags: []
machineTranslated: true
translation:
  sourceHash: "22da04be8ca7b51224cb216b745545a8eba686a15a9d0a03c2ea542f9d7c30d1"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:51:01.721Z"
---

Release with a single fix.

In 1.0, Prevent Sleep did not work in all cases:

- the display still turned off, and it looked as if the Mac had gone to sleep;
- with the laptop lid closed, the feature did not work at all.

The reason was that Echo only prevented system sleep when idle, while the display remained under the control of the usual timer. In 1.1, Echo takes the system assertion `NoDisplaySleep`: it keeps both the display and the system awake. The same mechanism is used by Caffeine, Lungo, and similar utilities.

The update is `Echo-1.1.dmg` on the [releases page](https://github.com/rpegorov/Echo/releases).
