---
title: "Echo 1.0: system monitor in the macOS menu bar"
description: "Echo — a native macOS menu bar app: CPU, memory, disk, and network in one window, plus a window manager, clipboard history, and small system utilities."
lang: "en"
slug: "echo-1-0-menu-bar-monitor"
date: "2026-06-20"
published: "2026-06-20T20:40:00+03:00"
updated: "2026-10-03"
draftaId: "F2606E91-C536-489D-9474-434BA424CCE5"
tags: []
machineTranslated: true
translation:
  sourceHash: "5e0bfde2a86f3829b68cf3c327ab3169cb14af9325874cffb0a050752b97ea50"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-02T21:51:05.919Z"
---

Echo — a native macOS menu bar app. System metrics and a few everyday utilities in a single icon.

## What's inside

**Monitoring.** Clicking the icon opens a window with three rings — CPU, memory, disk — and the current network speed. Each metric has a detailed window: a graph, the heaviest processes by CPU, the hungriest by memory, and the largest files on disk. Any file in the list can be revealed in Finder right away.

**Window manager.** Halves, quarters, maximize and center — with ⌃⌘ hotkeys plus arrows and letters. A window can be dragged to the edge or corner of the screen, and it will snap there on its own. Holding Shift cancels snapping.

**Clipboard history.** The most recently copied texts, images and files, via ⌘⇧V. Passwords and temporary entries from password managers don't end up in the history. Everything is stored in memory only.

**Utilities.**

- **Keyboard Cleaning** — locks the keyboard while you wipe it.
- **Prevent Sleep** — keeps the Mac from sleeping.
- **Disk cleanup** via the [mole](https://github.com/tw93/mole) command-line utility.

## Saves battery

While Echo's windows are closed, metrics aren't polled. During system sleep, polling stops; in power-saving mode, it slows down. All of this is configurable. The refresh interval is from 0.5 to 5 seconds.

## What it doesn't do

Echo runs only on your Mac. There are no accounts, telemetry, or network requests for its own needs: metrics and clipboard contents never leave your machine.

## How to install

Requires macOS 26.1 or newer. Download `Echo-1.0.dmg` from the [releases page](https://github.com/rpegorov/Echo/releases) and drag Echo.app into "Applications". The build isn't notarized, so on first launch — right-click Echo.app → Open → Open. The window manager needs access in System Settings → Privacy & Security → Accessibility.

The source code is open, MIT license.
