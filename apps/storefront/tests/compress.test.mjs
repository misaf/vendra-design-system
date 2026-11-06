// The build's precompressed copies (build/compress.mjs) and the reference server that serves them
// (deployment/nginx.conf): text files of MIN_SIZE or more get a .br and a .gz copy that decompress to
// the same bytes; small files, fonts and photos get none; and the server caches exactly Vite's
// content-hashed folder forever.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
import {precompress, MIN_SIZE} from '../build/compress.mjs';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = fs.mkdtempSync(path.join(templates, '../../node_modules/.vite/compress-test-'));
try {
  const text = 'export const words = ' + JSON.stringify('flower '.repeat(MIN_SIZE)) + ';\n';
  const files = {
    'assets/hashed/page-home-Ab12Cd34.js': text,
    'apps/storefront/app/en/index.html': '<!doctype html>' + '<p>Vendra</p>'.repeat(MIN_SIZE),
    'apps/storefront/app/small.js': 'export {};\n',
    'assets/hashed/jost-Ab12Cd34.woff2': text,
    'assets/products/rose.webp': text
  };
  for (const [name, source] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(outDir, name)), {recursive: true});
    fs.writeFileSync(path.join(outDir, name), source);
  }
  const compressed = (await precompress(outDir)).map(name => name.replaceAll(path.sep, '/')).sort();
  assert.deepEqual(compressed, [
    'apps/storefront/app/en/index.html',
    'assets/hashed/page-home-Ab12Cd34.js'
  ]);
  for (const name of compressed) {
    const file = path.join(outDir, name);
    const source = fs.readFileSync(file);
    const br = fs.readFileSync(file + '.br');
    const gz = fs.readFileSync(file + '.gz');
    assert.ok(br.length < source.length && gz.length < source.length, name + ' is smaller');
    assert.deepEqual(zlib.brotliDecompressSync(br), source, name + '.br round-trips');
    assert.deepEqual(zlib.gunzipSync(gz), source, name + '.gz round-trips');
  }
  for (const name of [
    'apps/storefront/app/small.js',
    'assets/hashed/jost-Ab12Cd34.woff2',
    'assets/products/rose.webp'
  ])
    for (const suffix of ['.br', '.gz'])
      assert.ok(
        !fs.existsSync(path.join(outDir, name + suffix)),
        name + suffix + ' is not written'
      );
} finally {
  fs.rmSync(outDir, {recursive: true, force: true});
}

// Vite writes its hashed files (and the page chunks) to assets/hashed/, which the server caches forever.
const config = fs.readFileSync(path.join(templates, 'build/vite.config.mjs'), 'utf8');
assert.match(config, /assetsDir: 'assets\/hashed'/);
assert.match(config, /return 'assets\/hashed\/' \+/);
assert.match(config, /await precompress\(outDir\);/);
const nginx = fs.readFileSync(path.join(templates, 'deployment/nginx.conf'), 'utf8');
const block = location => {
  const start = nginx.indexOf('location ' + location + ' {');
  assert.ok(start >= 0, 'nginx.conf has location ' + location);
  return nginx.slice(start, nginx.indexOf('}', start));
};
assert.match(nginx, /^\s*brotli_static on;/m);
assert.match(nginx, /^\s*gzip_static on;/m);
assert.match(block('^~ /assets/hashed/'), /Cache-Control "public, max-age=31536000, immutable"/);
assert.match(block('^~ /assets/hashed/'), /Access-Control-Allow-Origin/);
assert.match(block('^~ /assets/fonts/'), /Access-Control-Allow-Origin/);
assert.doesNotMatch(block('^~ /assets/fonts/'), /immutable/);
assert.doesNotMatch(block('~ ^/(assets|apps/storefront/_vendor)/'), /immutable/);
for (const location of [
  '= /apps/storefront/app/sw.js',
  '^~ /tokens/tenants/',
  '/apps/storefront/app/',
  '= /404.html',
  '/'
])
  assert.match(block(location), /Cache-Control "no-cache"/, location + ' is revalidated');
// The not-found page is served with status 404, which add_header skips without `always`.
assert.match(block('= /404.html'), /Cache-Control "no-cache" always;/);
// Only the hashed folder is immutable.
assert.equal(nginx.match(/immutable"/g).length, 1);
console.log('Passed the precompressed build files and the reference cache headers.');
