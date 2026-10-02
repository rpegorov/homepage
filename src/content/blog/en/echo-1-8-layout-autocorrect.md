---
title: "Echo 1.8: you type ghbdtn — you get privet"
description: "Echo 1.8 introduces Ultra Switch: a word typed in the wrong layout is corrected automatically, the layout switches right after, and language switching works with ⌥Space. And the app now updates itself."
lang: "en"
slug: "echo-1-8-layout-autocorrect"
date: "2026-08-08"
published: "2026-08-08T03:51:00+03:00"
updated: "2026-10-03"
draftaId: "513E0C34-DE9D-427E-8A95-305F2A07A4F0"
tags: []
machineTranslated: true
translation:
  sourceHash: "b94bc76ddeed53956cf48525fc2c405f2e941f65650a8078f90a8560a1494e34"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:52:58.257Z"
---

The biggest Echo update since launch. Versions 1.2 through 1.8 shipped overnight, and this post covers everything that appeared in them.

## Layout autocorrection

A word typed in the wrong layout corrects itself as soon as a space is pressed: `ghbdtn` becomes `привет`, `руддщ` — `hello`. The layout switches right after, and you can keep typing without stopping.

To decide which layout a word is real in, Echo checks against its dictionaries: 163,000 Russian and 59,000 English words. Words like `github`, `json`, or `qwerty` don't get turned into Russian.

The replacement works in any app that accepts keyboard input, including Pages and Electron apps. Echo doesn't read text from the input field: many apps don't expose it. Instead, Echo remembers the word just typed, deletes it, and types the corrected one, as if you had done it yourself.

## Two hotkeys

- **⌥Space** — instant layout switching instead of the slow globe key.
- **⌥⇧Space** — move the last word to the other layout manually. Pressing it again returns the word back, so it also doubles as an undo for autocorrection.

Both shortcuts are configurable in settings. Autocorrection can be turned off with a toggle right in the Echo window.

## What stays on your Mac

Only one word being typed and one previous word, no longer than 64 characters, live in memory. Nothing is written to disk. In password fields, in Keychain, 1Password, and Bitwarden, autocorrection doesn't work.

It needs two permissions in System Settings → Privacy & Security: Accessibility — to type corrections, and Input Monitoring — to see what's being typed. Echo opens the right tab itself and picks up the granted access without a restart.

## Updates

Since 1.8, Echo updates itself: it checks for new versions and offers to install them with one button. No more downloading the DMG manually.

`Echo-1.8.dmg` — at the [releases page](https://github.com/rpegorov/Echo/releases).
