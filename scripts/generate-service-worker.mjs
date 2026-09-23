import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';

const assetsDir = new URL('../dist/assets/', import.meta.url);
const assets = readdirSync(assetsDir, { recursive: true })
  .filter((file) => /\.(js|css|woff2)$/.test(file) && statSync(new URL(file, assetsDir)).isFile())
  .map((file) => `./assets/${file}`)
  .sort();
const template = readFileSync(new URL('./service-worker.template.js', import.meta.url), 'utf8');
const worker = template.replace('__ASSET_LIST__', JSON.stringify(assets));
if (worker === template) throw new Error('No se encontró la lista de recursos del service worker.');
writeFileSync(new URL('../dist/service-worker.js', import.meta.url), worker);
console.log(`Service worker: ${assets.length} recursos compilados incluidos en la caché.`);
