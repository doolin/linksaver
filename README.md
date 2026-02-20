# LinkSaver

A browser extension that saves all open tabs as bookmarks in a date-stamped folder with one click.

## How It Works

Click the toolbar button and LinkSaver creates a bookmark folder named with today's date and an auto-incrementing counter:

```
LinkSaver/
  2026-02-20.1/
    Tab 1 title → https://example.com/page1
    Tab 2 title → https://example.com/page2
  2026-02-20.2/
    Tab 1 title → https://example.com/other
  2026-02-21.1/
    ...
```

Each click creates a new numbered folder for that day. All folders live under a parent **LinkSaver** folder in Other Bookmarks.

## Supported Browsers

| Browser | Status | Directory |
|---------|--------|-----------|
| Firefox | **Available** | [`browsers/firefox/`](browsers/firefox/) |
| Chrome  | Planned | [`browsers/chrome/`](browsers/chrome/) |
| Brave   | Planned | [`browsers/brave/`](browsers/brave/) |
| Safari  | Planned | [`browsers/safari/`](browsers/safari/) |

## Quick Start (Firefox)

1. Open `about:debugging#/runtime/this-firefox` in Firefox
2. Click **"Load Temporary Add-on..."**
3. Select `browsers/firefox/manifest.json`

That's it. The LinkSaver icon appears in your toolbar. Click it to save all open tabs.

See [`browsers/firefox/README.md`](browsers/firefox/README.md) for full development and installation instructions.

## Repository Structure

```
linksaver/
├── browsers/
│   ├── firefox/          Firefox extension (Manifest V2)
│   ├── chrome/           Future Chrome extension
│   ├── brave/            Future Brave extension
│   └── safari/           Future Safari extension
├── shared/               Future shared logic across browsers
├── docs/
│   └── architecture.md   Multi-browser design decisions
├── README.md             This file
└── LICENSE               MIT License
```

See [`docs/architecture.md`](docs/architecture.md) for design decisions and the multi-browser strategy.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Test in Firefox using the temporary add-on workflow
5. Submit a pull request

## License

MIT License. See [LICENSE](LICENSE) for details.
