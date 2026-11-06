// Precompressed copies of the production build's text files (npm run build:app, from
// vite.config.mjs): beside each script, stylesheet, page and data file it writes `<name>.br` (Brotli,
// best quality) and `<name>.gz` (gzip, level 9), so a host that serves precompressed files
// (deployment/nginx.conf: brotli_static, gzip_static) sends them without compressing per request.
// Fonts and photos are compressed already and are left alone, as are files under MIN_SIZE and copies
// that would not be smaller.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {promisify} from 'node:util';

const brotli = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

export const COMPRESSIBLE = /\.(html|js|mjs|css|json|svg|xml|txt|webmanifest)$/;
export const MIN_SIZE = 1024;

// Writes the copies for every compressible file under `outDir`; returns the files it compressed.
export async function precompress(outDir) {
  const names = fs
    .readdirSync(outDir, {recursive: true})
    .map(String)
    .filter(name => COMPRESSIBLE.test(name))
    .filter(name => fs.statSync(path.join(outDir, name)).size >= MIN_SIZE);
  await Promise.all(
    names.map(async name => {
      const file = path.join(outDir, name);
      const source = fs.readFileSync(file);
      const [br, gz] = await Promise.all([
        brotli(source, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: source.length
          }
        }),
        gzip(source, {level: zlib.constants.Z_BEST_COMPRESSION})
      ]);
      if (br.length < source.length) fs.writeFileSync(file + '.br', br);
      if (gz.length < source.length) fs.writeFileSync(file + '.gz', gz);
    })
  );
  return names;
}
