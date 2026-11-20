// Preview the static artifact with the same directory URLs and 404 fallback as GitHub Pages.
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {createServer} from 'node:http';
import {extname, resolve, sep} from 'node:path';
import {parseArgs} from 'node:util';

const {values} = parseArgs({
  options: {
    port: {type: 'string', default: '3000'},
    hostname: {type: 'string', default: '127.0.0.1'}
  }
});
const root = resolve(import.meta.dirname, '../../.generated/export');
const base = process.env.VF_BASE_PATH || '';
const mime = {
  '.avif': 'image/avif',
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml'
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, {Allow: 'GET, HEAD'}).end();
      return;
    }
    if (!url.pathname.startsWith(base + '/')) {
      res.writeHead(404).end();
      return;
    }
    const pathname = decodeURIComponent(url.pathname.slice(base.length));
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(400).end();
      return;
    }
    const entry = await stat(file).catch(() => null);
    if (entry?.isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        res.writeHead(308, {Location: url.pathname + '/' + url.search}).end();
        return;
      }
      file = resolve(file, 'index.html');
    }
    const exists = entry && (await stat(file).catch(() => null))?.isFile();
    if (!exists) file = resolve(root, '404.html');
    const headers = {'Content-Type': mime[extname(file)] || 'application/octet-stream'};
    const encodings = (req.headers['accept-encoding'] || '').split(',').map(value => value.trim());
    // The service worker update test edits its source in place.
    if (!file.endsWith('/sw.js')) {
      for (const [encoding, suffix] of [
        ['br', '.br'],
        ['gzip', '.gz']
      ]) {
        if (!encodings.includes(encoding)) continue;
        if (!(await stat(file + suffix).catch(() => null))?.isFile()) continue;
        headers['Content-Encoding'] = encoding;
        headers.Vary = 'Accept-Encoding';
        file += suffix;
        break;
      }
    }
    res.writeHead(exists ? 200 : 404, headers);
    if (req.method === 'HEAD') res.end();
    else
      createReadStream(file)
        .on('error', error => res.destroy(error))
        .pipe(res);
  } catch {
    res.writeHead(400).end();
  }
});

await stat(resolve(root, '404.html'));
server.listen(Number(values.port), values.hostname, () => {
  console.log('Next.js export at http://' + values.hostname + ':' + values.port + base + '/');
});
