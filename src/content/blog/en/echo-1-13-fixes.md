---
title: "Echo 1.13: fixes in manual conversion and keyboard cleaning"
description: "Echo 1.13–1.13.7 — bug-fix releases: manual word conversion via ⌥⇧Space no longer swallows the space and now genuinely works as undo, while Keyboard Cleaning locks the keyboard entirely, including the top row."
lang: "en"
slug: "echo-1-13-fixes"
date: "2026-09-16"
published: "2026-09-16T15:20:00+03:00"
updated: "2026-10-03"
draftaId: "259500C1-A354-401A-B929-AA6F58013E3C"
tags: []
machineTranslated: true
translation:
  sourceHash: "044fcbda7b6b7c02132f598538fe23e84f1c91c8f636797e9578bf569d920aa4"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:57:26.135Z"
---

Eight small releases in two weeks, with no new features. Here's what was fixed in them.

## Manual conversion with ⌥⇧Space

⌥⇧Space converts the last word to a different keyboard layout, and pressing it again switches it back. In 1.13.2–1.13.5, two bugs were fixed:

- **The space disappeared.** If you pressed ⌥⇧Space in the middle of typing a word, Echo deleted one character too many and ate the space before the word.
- **Pressing again didn't undo.** After conversion, Echo didn't always remember the new version of the word, and a second press didn't switch anything back.

## Keyboard Cleaning blocks the top row completely

Keyboard Cleaning blocks the keyboard while you wipe it. Previously, the top row slipped through: brightness, volume, and media keys are handled by macOS itself before a regular app can see them.

As of 1.13.7, the top row is blocked completely — brightness, volume, media keys, and F1–F12. To do this, Echo temporarily switches the top row to F1–F12 mode during cleaning, and such keypresses can already be muted. When you turn off cleaning, the setting returns to how it was. If Echo crashed at that moment, the setting will be restored the next time it launches.

Modifiers — Shift, Control, Command, Caps Lock — pass through the block: on their own, they don't type anything.

## Under the hood

In 1.13, the settings window code was restructured: each section is now in a separate file. Nothing changed for the user, but it's easier to add new things this way — and they'll appear in 2.0.

The update arrives on its own, or `Echo-1.13.7.dmg` — on the [releases page](https://github.com/rpegorov/Echo/releases).
