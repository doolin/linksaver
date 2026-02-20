# LinkSaver Backlog

## Browser Ports

- [ ] **Chrome extension** — Manifest V3, `chrome.action` / `chrome.bookmarks` APIs. Also covers Brave and other Chromium browsers.
- [ ] **Safari extension** — Xcode-based Safari Web Extension wrapper.

## Features

- [ ] **Keyboard shortcut** — Configurable hotkey to save all tabs (e.g., Ctrl+Shift+S).
- [ ] **Context menu entry** — Right-click option to save all tabs.
- [ ] **Save from all windows** — Option to bookmark tabs across all open windows, not just the current one.
- [ ] **Tab filtering** — Exclude pinned tabs, blank/new-tab pages, or duplicates.
- [ ] **Confirmation popup** — Show a preview of tabs before saving, with checkboxes to include/exclude individual tabs.

## Bookmark Management

- [ ] **Browse saved groups** — Popup or sidebar UI to view previously saved tab groups.
- [ ] **Restore tab group** — Re-open all bookmarks in a saved folder as tabs.
- [ ] **Search saved groups** — Search across saved bookmark folders by date or tab title.
- [ ] **Delete saved groups** — Remove old bookmark folders from within the extension.

## Settings

- [ ] **Options page** — User-configurable settings:
  - Parent folder location (Other Bookmarks, Bookmarks Menu, Bookmarks Toolbar)
  - Custom parent folder name
  - Folder naming scheme (date format, separator)
  - Which tabs to include by default (all, current window, filter rules)

## Architecture

- [ ] **Extract shared logic** — Move date-naming and folder-management code into `shared/` when a second browser is added.
- [ ] **Build tooling** — Set up a build script to bundle shared + browser-specific code per target.
- [ ] **Automated testing** — Unit tests for the date/counter logic, integration tests with browser mocks.
