# Architecture

## Multi-Browser Strategy

LinkSaver is structured as a multi-browser project with browser-specific implementations in separate directories:

```
browsers/
├── firefox/    Manifest V2, uses browser.* APIs (Promise-based)
├── chrome/     Future: Manifest V3, uses chrome.* APIs (callback or Promise)
├── brave/      Future: Chromium-based, likely shares most code with Chrome
└── safari/     Future: Xcode-based Safari Web Extension project
```

### Why Separate Directories (Not a Shared Build)

For this first iteration, each browser gets its own self-contained extension directory. This keeps things simple and avoids build tooling overhead. The trade-off is some code duplication when more browsers are added.

When Chrome or Brave support is added, the `shared/` directory can hold common logic that gets copied or bundled into each browser's extension during a build step.

### Future: Shared Logic

The core bookmark-saving logic is browser-agnostic in concept:

1. Find or create a parent folder
2. Generate a date-stamped folder name
3. Query open tabs
4. Create bookmarks for each tab

The browser-specific parts are:

- API namespace (`browser.*` vs `chrome.*`)
- Manifest format (V2 vs V3)
- Special folder IDs (Firefox uses string IDs like `"unfiled_____"`, Chrome uses numeric IDs)
- Packaging format (`.xpi` vs `.crx` vs Safari project)

A reasonable migration path:

1. Extract the date-naming and folder-management logic into `shared/`
2. Create a thin browser adapter layer per browser
3. Add a simple build script that bundles shared + adapter into each browser directory

## Firefox-Specific Decisions

### Manifest V2

Firefox has explicitly committed to long-term Manifest V2 support, unlike Chrome which is deprecating it. MV2 is simpler (persistent background scripts, straightforward `browserAction` API) and well-documented. There is no urgency to migrate to MV3 for Firefox.

### No Popup UI

LinkSaver is a single-action extension: click the button, tabs get saved. A popup adds UI complexity without adding value for this use case. The `browserAction.onClicked` listener fires directly when the button is clicked (only possible when no `default_popup` is set in the manifest).

### Sequential Bookmark Creation

Bookmarks are created one at a time in a `for` loop with `await`. This guarantees tab order is preserved. Creating bookmarks in parallel with `Promise.all()` can cause index shuffling due to race conditions in the bookmarks API.

### Other Bookmarks as Parent

The LinkSaver folder is created under "Other Bookmarks" (`parentId: "unfiled_____"`). This is the least intrusive location — it doesn't clutter the Bookmarks Menu or Bookmarks Toolbar.

## Chrome Migration Notes (Future)

Key differences to address when adding Chrome support:

| Aspect | Firefox (current) | Chrome |
|--------|-------------------|--------|
| Manifest | V2 | V3 required |
| API namespace | `browser.*` (Promise) | `chrome.*` (Promise in MV3) |
| Toolbar button | `browser_action` / `browserAction` | `action` / `chrome.action` |
| Background | Persistent script | Service worker |
| Special folder IDs | String (`"unfiled_____"`) | Numeric (`"1"` for Bookmarks Bar, `"2"` for Other) |
| Package format | `.xpi` | `.crx` / Chrome Web Store |
