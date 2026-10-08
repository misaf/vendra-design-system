import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(templates, '..');
const run = promisify(execFile);
const storefront = '/templates/storefront-site/StorefrontSite.dc.html';

// The DC runtime reads HTML dynamically, so reload it after generation rather
// than relying on a framework-specific module replacement plugin.
function storefrontPreview() {
  let timer;
  let running = false;
  let pending = false;
  const snapshots = new Map();
  const rememberPages = () => {
    for (const folder of fs.readdirSync(templates).filter(name => name.startsWith('storefront-'))) {
      for (const name of fs.readdirSync(path.join(templates, folder)).filter(name => name.endsWith('.dc.html'))) {
        const file = path.join(templates, folder, name);
        snapshots.set(file, fs.readFileSync(file, 'utf8'));
      }
    }
  };
  return {
    name: 'vendra-storefront-preview',
    apply: 'serve',
    async configureServer(server) {
      await run(process.execPath, [path.join(templates, '_build/build.cjs')]);
      rememberPages();
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname !== '/') return next();
        res.writeHead(302, {Location: storefront + (url.search || '?lang=en')});
        res.end();
      });
      const refresh = async () => {
        if (running) { pending = true; return; }
        running = true;
        try {
          await run(process.execPath, [path.join(templates, '_build/build.cjs')]);
          rememberPages();
          server.ws.send({type: 'full-reload', path: '*'});
          server.config.logger.info('Rebuilt components, storefront templates and Tailwind.');
        } catch (error) {
          const message = error.stderr || error.message;
          server.config.logger.error(message);
          server.ws.send({type: 'error', err: {message, stack: '', plugin: 'vendra-storefront-preview'}});
        } finally {
          running = false;
          if (pending) { pending = false; await refresh(); }
        }
      };
      const changed = (file) => {
        const relative = path.relative(root, file).replaceAll(path.sep, '/');
        const isPage = /^templates\/storefront-[^/]+\/[^/]+\.dc\.html$/.test(relative);
        if (isPage && fs.existsSync(file) && snapshots.get(file) === fs.readFileSync(file, 'utf8')) return;
        const isSource = relative.startsWith('templates/_shared/') || /^components\/.+\.jsx?$/.test(relative) || /^tokens\/tenants\/[^/]+\.json$/.test(relative) || /^templates\/storefront-[^/]+\/(copy\.js|logic\.js|styles\.css)$/.test(relative) || isPage;
        const isAsset = /^(tokens|assets)\//.test(relative) || relative === 'styles.css' || /^components\/.+\.css$/.test(relative) || relative.startsWith('templates/_runtime/');
        if (!isSource && !isAsset) return;
        // Generated CSS writes follow a source rebuild; they need no extra rebuild.
        if (!isSource) { if (!running) server.ws.send({type: 'full-reload', path: '*'}); return; }
        clearTimeout(timer);
        timer = setTimeout(refresh, 100);
      };
      server.watcher.on('change', changed);
      server.watcher.on('add', changed);
      server.watcher.on('unlink', changed);
      server.httpServer?.once('close', () => {
        clearTimeout(timer);
        server.watcher.off('change', changed);
        server.watcher.off('add', changed);
        server.watcher.off('unlink', changed);
      });
    },
    transformIndexHtml(html) {
      if (!html.includes('<x-dc>')) return;
      // Load the namespace before support.js boots the page on a cold start. The bundle
      // needs React while it evaluates (Carousel calls React.forwardRef), so the local
      // React copies go first; support.js reuses them instead of fetching unpkg.
      return ['/templates/_vendor/react.production.min.js', '/templates/_vendor/react-dom.production.min.js', '/templates/_runtime/components.js']
        .map(src => ({tag: 'script', attrs: {src}, injectTo: 'head-prepend'}));
    }
  };
}

export default defineConfig({
  root,
  publicDir: false,
  appType: 'mpa',
  cacheDir: path.join(templates, 'node_modules/.vite'),
  plugins: [storefrontPreview()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    fs: {allow: [root]},
    watch: {ignored: ['**/.git/**', '**/node_modules/**']}
  },
  optimizeDeps: {noDiscovery: true}
});
