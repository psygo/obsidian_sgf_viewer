# Obsidian Sample Plugin

- This plugin uses [WGo.js](https://github.com/waltheri/wgo.js#board) as a SGF viewer.

How it works:

1. A SGF file is linked with custom syntax: `!![game1.sgf]`.
2. Under the hood, this is replaced by its respective WGo.js `<div>`.
3. The plugin will use `<script>` tags to bring WGo.js into showing an embedded viewer with the game.
