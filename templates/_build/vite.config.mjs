import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const templates = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(templates, '..');
const run = promisify(execFile);
const storefront = '/templates/app/';

// Rebuild generated CSS, shared logic and the component bundle when their sources change.
function storefrontPreview() {
  let timer;
  let running = false;
  let pending = false;
  return {
    name: 'vendra-storefront-preview',
    apply: 'serve',
    async configureServer(server) {
      await run(process.execPath, [path.join(templates, '_build/build.cjs')]);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname !== '/') return next();
        res.writeHead(302, {Location: storefront + (url.search || '?lang=en')});
        res.end();
      });
      const refresh = async () => {
        if (running) {
          pending = true;
          return;
        }
        running = true;
        try {
          await run(process.execPath, [path.join(templates, '_build/build.cjs')]);
          server.ws.send({type: 'full-reload', path: '*'});
          server.config.logger.info('Rebuilt components, storefront templates and Tailwind.');
        } catch (error) {
          const message = error.stderr || error.message;
          server.config.logger.error(message);
          server.ws.send({
            type: 'error',
            err: {message, stack: '', plugin: 'vendra-storefront-preview'}
          });
        } finally {
          running = false;
          if (pending) {
            pending = false;
            await refresh();
          }
        }
      };
      const changed = file => {
        const relative = path.relative(root, file).replaceAll(path.sep, '/');
        const isSource =
          relative.startsWith('templates/_shared/') ||
          /^components\/.+\.jsx?$/.test(relative) ||
          /^tokens\/tenants\/[^/]+\.json$/.test(relative) ||
          /^templates\/storefront-[^/]+\/styles\.css$/.test(relative);
        const isAsset =
          /^(tokens|assets)\//.test(relative) ||
          relative === 'styles.css' ||
          /^components\/.+\.css$/.test(relative) ||
          relative.startsWith('templates/_runtime/');
        if (!isSource && !isAsset) return;
        // Generated CSS writes follow a source rebuild; they need no extra rebuild.
        if (!isSource) {
          if (!running) server.ws.send({type: 'full-reload', path: '*'});
          return;
        }
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
    }
  };
}

// The production build copies what pages load by URL at run time: product images and placeholders,
// the Leaflet map files, the tenant themes and the service worker, at the same paths under the build.
function storefrontAssets() {
  let outDir;
  return {
    name: 'vendra-storefront-assets',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      for (const folder of ['assets', 'templates/_vendor/leaflet'])
        fs.cpSync(path.join(root, folder), path.join(outDir, folder), {recursive: true});
      // The service worker sits beside the app's page, so it can serve the whole app.
      fs.copyFileSync(path.join(templates, 'app/sw.js'), path.join(outDir, 'templates/app/sw.js'));
      const tenants = path.join(root, 'tokens/tenants');
      fs.mkdirSync(path.join(outDir, 'tokens/tenants'), {recursive: true});
      for (const name of fs.readdirSync(tenants).filter(name => name.endsWith('.css')))
        fs.copyFileSync(path.join(tenants, name), path.join(outDir, 'tokens/tenants', name));
      // Pages serves the artifact root; keep its entry point useful as well as direct app links.
      fs.writeFileSync(
        path.join(outDir, 'index.html'),
        `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vendra demo</title>
<script>
const target = new URL('templates/app/', location.href);
target.search = location.search || '?lang=en';
target.hash = location.hash;
location.replace(target.href);
</script>
<a href="templates/app/?lang=en">Open the Vendra demo</a>
</html>
`
      );
    }
  };
}

export default defineConfig({
  root,
  publicDir: false,
  appType: 'mpa',
  cacheDir: path.join(root, 'node_modules/.vite'),
  plugins: [storefrontPreview(), storefrontAssets()],
  // npm run build:app → templates/_app-build/templates/app/index.html, served by npm run preview at
  // the same path as in development.
  build: {
    outDir: path.join(templates, '_app-build'),
    emptyOutDir: true,
    // Evergreen browsers and Safari 16+: the minifier keeps -webkit-backdrop-filter for Safari and the
    // standard property for the rest (sources list the prefixed one first).
    cssTarget: ['chrome120', 'edge120', 'firefox120', 'safari16'],
    rollupOptions: {
      input: path.join(templates, 'app/index.html'),
      // Each page's chunk is named after its folder (storefront-shop/Page.jsx → page-shop).
      output: {
        chunkFileNames: chunk => {
          const page = /storefront-([\w-]+)\/Page\.jsx$/.exec(chunk.facadeModuleId || '');
          return 'assets/' + (page ? 'page-' + page[1] : '[name]') + '-[hash].js';
        }
      }
    }
  },
  preview: {host: '127.0.0.1', port: 4173, strictPort: true},
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    fs: {allow: [root]},
    // Pages load on demand; transform them at start so a first visit does not wait on them.
    warmup: {clientFiles: ['./templates/app/main.jsx', './templates/storefront-*/Page.jsx']},
    watch: {ignored: ['**/.git/**', '**/node_modules/**']}
  },
  // The storefront app (templates/app) and the components import these; they are pre-bundled
  // because React ships CommonJS.
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'react-aria-components',
      '@internationalized/date'
    ]
  }
});
