---
title: "Echo 2.0.1: word correction cancellation works reliably"
description: "Echo 2.0.1 fixes undo autocorrect with ⌥⇧Space: it no longer works intermittently, isn't thrown off by Backspace and ⌥Space, and works with a reassigned hotkey."
lang: "en"
slug: "echo-2-0-1-reliable-undo"
date: "2026-09-28"
published: "2026-09-28T13:20:00+03:00"
updated: "2026-10-03"
draftaId: "5F190088-4EA8-4D87-8F08-80A2F327AC08"
tags: []
machineTranslated: true
translation:
  sourceHash: "3d168c312a49cfea4c989b5a0737f4d90de53285a69f8796cee7b8cde1edfc40"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:57:29.754Z"
---

Bug-fix release. Undoing autocorrect with ⌥⇧Space worked only intermittently: sometimes it restored the word, sometimes it didn't, and sometimes it erased extra characters. There turned out to be four causes.

## Undoing immediately after autocorrect

Autocorrect doesn't type the corrected word instantly, but over several milliseconds. If you press ⌥⇧Space at that moment, Echo hadn't yet updated its memory of the word and corrected it again instead of restoring it. Now the keypress waits for the replacement to finish and restores the word as it should.

## Backspace no longer resets the memory

Previously, Echo forgot the word as soon as you erased the space after it. Now you can erase the space, finish typing the word, and convert it with the hotkey: Echo understands that the caret is again positioned after that word.

## ⌥Space no longer breaks the next replacement

Echo monitors typing in order to know which word to correct. It mistook a press of ⌥Space, which switches the keyboard layout, for a typed space, even though there was none in the text. The next replacement erased one character too many. Now Echo doesn't count its own hotkeys as typing.

## Reassigned conversion hotkey

If you change ⌥⇧Space to a combination with ⌃ or ⌘, Echo forgot the word a moment before the hotkey fired and responded that there was nothing to correct. Now any combination works.

The update arrives automatically, or `Echo-2.0.1.dmg` — on the [releases page](https://github.com/rpegorov/Echo/releases).
