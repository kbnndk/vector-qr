import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(base, file), 'utf8');
const manifest = JSON.parse(read('manifest.json'));
const code = read('code.js');
const ui = read('ui.html');

assert.equal(manifest.main, 'code.js');
assert.equal(manifest.ui, 'ui.html');
assert.deepEqual(manifest.networkAccess?.allowedDomains, ['none']);
assert.equal(manifest.editorType?.includes('figma'), true);

new vm.Script(code, { filename: 'code.js' });
const scripts = [...ui.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
assert.ok(scripts.length > 0, 'UI must contain the offline generator');
for (const [i, match] of scripts.entries()) {
  new vm.Script(match[1], { filename: "ui.html:script:" + (i + 1) });
}
assert.match(ui, /Экспорт PNG/);
assert.match(ui, /Экспорт SVG/);
assert.match(ui, /noBackgroundToggle/);
assert.match(code, /figma\.createNodeFromSvg/);
assert.match(code, /figma\.createRectangle/);
assert.doesNotMatch(ui, /https:\/\/example\.com/i);
assert.doesNotMatch(ui, /<script[^>]+src=/i);
assert.doesNotMatch(ui, /<link[^>]+href=/i);
for (const filename of ['LICENSE', 'LICENSE-QR.txt', 'LICENSES/Apache-2.0.txt', 'PRIVACY.md', 'THIRD_PARTY_NOTICES.md']) {
  assert.ok(read(filename).trim().length > 100, "missing/empty " + filename);
}
console.log("PASS: manifest, " + scripts.length + " UI scripts, Figma controller, offline assets, release docs");
