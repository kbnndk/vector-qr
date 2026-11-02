# Privacy Policy / Политика конфиденциальности

**Vector QR 0.1 — 29 October 2026**

## English

Vector QR is a Figma plugin for generating QR codes. The plugin does not operate a remote QR-generation service, analytics service or user-account system.

**Data processed inside the plugin:** text, URLs, email/phone/SMS/Wi-Fi fields, color choices and SVG logos that you provide. These inputs are processed locally by the plugin UI for QR generation and export. The plugin itself does not send this input to a developer-operated server or third-party QR API. The Figma manifest sets `networkAccess.allowedDomains` to `["none"]`.

**Exports:** PNG and SVG are generated in the plugin and downloaded through your browser/Figma desktop environment. Generated data is not uploaded by a separate Vector QR service.

**Figma documents:** When you choose “Add QR to canvas”, the plugin creates nodes inside the current Figma file. Their contents, including encoded data in the QR pattern, are then subject to Figma's normal cloud syncing, sharing, retention, and access controls. Figma's processing is covered by Figma's own policies.

**Logs, telemetry, accounts:** this version does not implement analytics, telemetry, remote error logging, cookies, user accounts or a developer-operated backend.

**Retention:** the plugin has no separate remote storage or database. Data already inserted into a Figma document persists according to that document's settings and Figma's own policies. Downloaded PNG/SVG files remain wherever you save them.

**SVG security:** user-supplied SVGs are filtered locally; only supported elements and local references are intended to be accepted. Avoid uploading SVGs from untrusted sources. This is not a substitute for Figma's platform security controls.

**Support / privacy requests:** use the public repository's [Issues](https://github.com/kbnndk/vector-qr/issues) page (do not post private input strings, passwords, personal contact information or private documents). A dedicated privacy contact should be added before any broader public release if required by applicable law.

This policy describes this source-code release; re-evaluate it if you add networking, analytics, accounts or other data flows.

## Русский

Vector QR создаёт QR-коды прямо внутри Figma. Плагин не использует сторонние сервисы генерации, аналитику, аккаунты или собственный сервер.

**Обрабатываемые данные:** ссылки, текст, телефон, email, SMS, Wi‑Fi, цвета и загружаемые SVG. Генерация и экспорт выполняются локально в интерфейсе плагина; данные не отправляются на отдельный сервер разработчика. Манифест запрещает обращения к внешним доменам (`allowedDomains: ["none"]`).

**Документы Figma:** после вставки QR становится частью текущего документа. Если документ облачный, его содержимое может храниться и синхронизироваться средствами Figma, согласно правилам Figma и настройкам доступа к файлу.

**Хранение:** у Vector QR нет собственного удалённого хранилища. Экспортированные файлы хранятся там, где их сохранит пользователь; объекты в документе — согласно настройкам и правилам Figma.

**Поддержка:** [GitHub Issues](https://github.com/kbnndk/vector-qr/issues). Не публикуйте там конфиденциальные данные или QR-содержимое. При существенном изменении функциональности обработки данных политика должна быть пересмотрена.
