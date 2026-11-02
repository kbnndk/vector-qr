# Third-party notices

QR generator includes third-party QR encoding code. The original notices and licenses must be preserved in redistributed copies.

## QRCode for JavaScript — Kazuhiko Arase

- Copyright © 2009 Kazuhiko Arase.
- License: **MIT**.
- Original project: https://github.com/kazuhikoarase/qrcode-generator
- License: [`LICENSES/MIT-Kazuhiko-Arase.txt`](LICENSES/MIT-Kazuhiko-Arase.txt)
- The embedded vendor code is contained in `ui.html`, beginning at the section identified as the QR encoding vendor bundle. It contains the original attribution.

## qrcode-terminal — adapted QRCode vendor implementation

- Project: https://github.com/gtanner/qrcode-terminal
- License for the qrcode-terminal project's code and modifications: **Apache License 2.0**. Its included QRCode for JavaScript code retains the MIT license above.
- License: [`LICENSES/Apache-2.0.txt`](LICENSES/Apache-2.0.txt)
- Attribution: the embedded implementation identifies `qrcode-terminal/vendor/QRCode` as its source; that repository notes modifications to make the original QRCode code work in Node.js and refactoring.

These notices are provided to recognize both the original implementation and the vendor distribution from which portions were adapted. The project's MIT license does not override third-party licenses.

## Inter

The UI specifies `Inter` in a system-font stack but **does not bundle or redistribute font files**. If a future release distributes Inter fonts, include the required license notice from https://github.com/rsms/inter (SIL Open Font License 1.1).

## Trademark notice

**QR Code is a registered trademark of DENSO WAVE INCORPORATED.**

QR generator is an independent project, not affiliated with or endorsed by DENSO WAVE or Figma.

Official information: https://www.qrcode.com/en/faq.html
