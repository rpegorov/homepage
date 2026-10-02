---
title: "Echo 1.9: snippets and translation without taking your hands off the keyboard"
description: "In Echo 1.9–1.12, snippets and in-place translation of selected text appeared, and the menu bar icon learned to show live metrics."
lang: "en"
slug: "echo-1-9-snippets-translation"
date: "2026-08-11"
published: "2026-08-11T15:15:00+03:00"
updated: "2026-10-03"
draftaId: "B9CD5F5C-257E-4315-B830-258A36F8A51C"
tags: []
machineTranslated: true
translation:
  sourceHash: "f4ff7ff5fb93e8cd4302f6c15e84a87171af3b4823cb13c2234cab0d4522a42c"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:53:03.642Z"
---

Versions 1.9 through 1.12 were released on the same day. Everything that appeared in them is here.

## Snippets

You type an abbreviation and a space — Echo replaces it with the specified text. For example, `sig` turns into an email signature. Case and keyboard layout don't matter: `ЫШП`, typed in the Russian layout, will also work. Abbreviations can consist of symbols, for example `@@` or `;addr`.

If a word simultaneously looks like a snippet and like a typo in the keyboard layout, the snippet wins: you set it yourself.

## Translating selected text

Select text in any app and press ⌃⌥T — the translation will replace the selection. It uses the macOS system translator. Echo grabs the selection via copying, but then returns whatever was in the clipboard back to it.

## Menu bar icon

Three options to choose from:

- the regular icon;
- live metrics — CPU load, memory, and network right in the menu bar;
- your own image.

The menu bar metrics have their own refresh interval, separate from the Echo window. The window itself no longer jitters when data refreshes, and the labels under the rings no longer shift.

## Small thing

Clipboard history opens next to the cursor, not in the center of the screen.

The update arrives on its own, or `Echo-1.12.dmg` — on the [releases page](https://github.com/rpegorov/Echo/releases).
