# QR generator 0.1

**Offline-first vector QR code generator for Figma.** Generate QR codes, place editable vector layers on your canvas, or export transparent PNG and SVG files.

> **Status:** v0.1 development build. The source is public, but the plugin is **not yet published to Figma Community**. Figma Desktop testing and Community review are separate steps.

## Features

- QR content types: URL, text, Wi-Fi, SMS, phone and email.
- Colors for QR modules and background; optional **transparent background**.
- Optional SVG logo in the QR color, or a central rectangular cutout (mutually exclusive modes).
- **PNG (1000 × 1000)** export, with alpha transparency when “No background” is on.
- Scalable **SVG** export.
- Editable QR vector and removable **separate background rectangle** when inserted into Figma.
- Russian / English interface. The UI scales to fit the plugin window without a scrollbar.
- **No separate QR backend, CDN or analytics**. See [Privacy Policy](PRIVACY.md).

## Install as a Figma development plugin

1. Download this repository (`Code` → `Download ZIP`) or clone it.
2. Keep `manifest.json`, `code.js` and `ui.html` in the same local folder.
3. Open **Figma Desktop** → **Plugins** → **Development** → **Import plugin from manifest**.
4. Select `manifest.json` from the folder.
5. Launch **QR generator 0.1** from the Development plugins menu.

Figma does not install or automatically update development plugins directly from a GitHub URL. After pulling changes, restart the plugin in Figma. Publishing to Figma Community is a separate process.

## Project files

| File | Purpose |
|---|---|
| `manifest.json` | Figma configuration, including disabled network access |
| `code.js` | Figma controller; inserts QR vectors and an optional separate background |
| `ui.html` | User interface and bundled offline QR generator |
| `README_RU.md` | Russian usage instructions |
| `PRIVACY.md` | Privacy policy (English and Russian) |
| `THIRD_PARTY_NOTICES.md` | Third-party licenses, credits and trademark notice |
| `LICENSE` | MIT license for original project contributions; excludes third-party components |
| `LICENSES/` | Full third-party license texts |

## Development checks

Requires Node.js 20+ for development checks only; users do not need Node.js to install the plugin.

```bash
node scripts/validate.mjs
```

The built-in workflow runs this check for pushes and pull requests. It is a static check, **not a substitute** for testing within Figma Desktop.

## Licensing

Original contributions to this project are made available under the [MIT License](LICENSE), subject to the contributor having the necessary rights. Embedded QR encoding code has its **own third-party license obligations**: see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Do not remove license headers or notices when redistributing.

**QR Code is a registered trademark of DENSO WAVE INCORPORATED.** This project is not affiliated with or endorsed by DENSO WAVE or Figma.

## Support and contributions

Use [GitHub Issues](https://github.com/kbnndk/vector-qr/issues) for bug reports. See [CONTRIBUTING.md](CONTRIBUTING.md). **Never post private URLs, QR payloads, Wi-Fi passwords or private Figma documents in public issues.**

Русская инструкция: [README_RU.md](README_RU.md).
