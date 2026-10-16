---
title: "Echo 2.2: zones for windows, layouts, and CPU and GPU temperatures"
description: "In Echo 2.2 — zones and grids for windows with auto-rules, layouts by hotkey, and CPU and GPU temperatures: a two-line graph in the popover and a line next to the network."
lang: "en"
slug: "echo-2-2-window-zones-temperatures"
date: "2026-10-15"
published: "2026-10-15T18:00:00+03:00"
updated: "2026-10-16"
draftaId: "A3086F69-1899-4EF7-8346-A092A682C1DA"
tags: []
machineTranslated: true
translation:
  sourceHash: "11648def24fee8a6c5f648545dec753a9936b70ce34bffd37d2c4c6f3cb9d27f"
  sourceLang: "ru"
  provider: "deepseek"
  model: "deepseek-chat"
  at: "2026-10-16T11:01:44.119Z"
---

In 2.2 Echo grew from a metrics monitor into a window manager: windows gained zones, grids, and layouts, and the popover gained CPU and GPU temperatures.

## Zones instead of manual stretching

Drag a window to the edge or corner of the screen — a zone is highlighted, and the window snaps into it on its own. Halves, thirds, and two-thirds, moving to an adjacent monitor; pressing the half hotkey again changes the width: ½ → ⅔ → ⅓. The default zones are on ⌃⌥⌘D/F/G/E/T and ⌃⌥⌘←/→.

Besides simple zones, there are grids: ready-made templates and your own template in the editor — the screen is divided by clicking, zones merge, borders are dragged, and each monitor has its own grid. Dragging a window while holding ⌥ shows the entire grid, while with ⌃ the window stretches across several zones at once. Each zone gets its own hotkey ⌃⌥1…9.

## Layouts and auto-rules

"Remember current" saves the window arrangement with all monitors; later it can be applied from settings, the menu bar, or via a hotkey — apps that aren't running are skipped. Auto-rules go further: a new window of the selected app automatically goes into the assigned zone — the terminal opens where the terminal belongs.

If macOS system tiling is enabled, the settings will ask you to turn it off — it conflicts with zones. The ⌃⌥ and ⌃⌥⌘ combinations overlap with VoiceOver commands: if you use VoiceOver, reassign the hotkeys.

## CPU and GPU temperatures

The popover now has a line with the current CPU and GPU degrees, and in the details there's a graph with two lines over a minute: the processor in orange, the graphics card in purple, with the current values and peaks below.

The sensors are read directly from the SMC — Apple Silicon's system controller — without root privileges or helper daemons, once per second. On Macs where the sensors are unavailable, the tab and the line are not shown.

## Small things

Legends on the graphs no longer overlap the axis labels, and the six detail tabs fit on one line.

The update arrives on its own, or `Echo-2.2.dmg` — on the [releases page](https://github.com/rpegorov/Echo/releases).
