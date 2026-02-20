# LinkSaver for Firefox

Firefox extension that bookmarks all open tabs into a date-stamped folder with a single click.

## Fast-Track Installation

### Method 1: Temporary Add-on (fastest, no tools needed)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Browse to this directory and select `manifest.json`
4. The LinkSaver icon appears in your toolbar — click it to save all open tabs

> **Note:** Temporary add-ons are removed when Firefox restarts. Use this for quick testing.

### Method 2: web-ext (recommended for development)

```bash
# Install web-ext globally (one-time)
npm install -g web-ext

# Run Firefox with the extension loaded and auto-reload on changes
cd browsers/firefox
web-ext run
```

This opens a fresh Firefox profile with LinkSaver loaded. The extension auto-reloads when you edit files.

### Method 3: Build a distributable .xpi

```bash
cd browsers/firefox
web-ext build
```

The `.xpi` file is created in `web-ext-artifacts/`. You can install it in Firefox via `about:addons` > gear icon > "Install Add-on From File...".

## How It Works

### Folder Structure

All bookmarks are organized under a **LinkSaver** parent folder in Other Bookmarks:

```
Other Bookmarks/
  LinkSaver/
    2026-02-20.1/     ← first save on Feb 20
      GitHub           → https://github.com
      MDN              → https://developer.mozilla.org
    2026-02-20.2/     ← second save on Feb 20
      Reddit           → https://reddit.com
    2026-02-21.1/     ← first save on Feb 21
      ...
```

### Naming Scheme

- Format: `YYYY-MM-DD.N`
- The date is the current local date
- The counter `N` starts at 1 and increments for each save on the same day
- The counter resets to 1 on a new day

### What Gets Saved

- All tabs in the **current window** are saved
- Each bookmark uses the tab's page title (falling back to the URL if no title)
- Tab order is preserved

### Feedback

After saving, a badge on the toolbar icon briefly shows the number of tabs saved. It disappears after 3 seconds. If an error occurs, the badge shows "ERR" in red.

## Permissions

This extension requires two permissions:

| Permission | Why |
|------------|-----|
| `bookmarks` | Create bookmark folders and bookmarks |
| `tabs` | Read tab URLs and titles in the current window |

No data leaves your browser. LinkSaver works entirely offline using Firefox's built-in bookmark APIs.

## Technical Details

- **Manifest Version:** V2 (Firefox has committed to long-term MV2 support)
- **Minimum Firefox Version:** 58.0
- **Architecture:** Single background script, no popup UI
- **Extension ID:** `linksaver@linksaver.dev`

## Files

```
browsers/firefox/
├── manifest.json     Extension manifest (permissions, icons, metadata)
├── background.js     All extension logic (single file, ~90 lines)
├── icons/
│   ├── icon.svg      Source icon (SVG)
│   ├── icon-16.png   Toolbar icon
│   ├── icon-32.png   Toolbar icon (high-DPI)
│   ├── icon-48.png   Extension manager icon
│   └── icon-96.png   Extension manager icon (high-DPI)
└── README.md         This file
```
