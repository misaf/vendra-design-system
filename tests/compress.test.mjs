// Verify the generated Brotli and gzip files against their source bytes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import {precompress, MIN_SIZE} from '../tools/build/compress.mjs';

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-compress-test-'));
try {
  const text = 'export const words = ' + JSON.stringify('flower '.repeat(MIN_SIZE)) + ';\n';
  const files = {
    '_next/static/chunks/page-home-Ab12Cd34.js': text,
    'en/index.html': '<!doctype html>' + '<p>Vendra</p>'.repeat(MIN_SIZE),
    'small.js': 'export {};\n',
    '_next/static/chunks/jost-Ab12Cd34.woff2': text,
    'assets/products/rose.webp': text
  };
  for (const [name, source] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(outDir, name)), {recursive: true});
    fs.writeFileSync(path.join(outDir, name), source);
  }
  const compressed = (await precompress(outDir)).map(name => name.replaceAll(path.sep, '/')).sort();
  assert.deepEqual(compressed, ['_next/static/chunks/page-home-Ab12Cd34.js', 'en/index.html']);
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
    'small.js',
    '_next/static/chunks/jost-Ab12Cd34.woff2',
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
