// Turns the Vite build in dist/ into ONE self-contained HTML file you can double-click.
// (Browsers block module scripts loaded from file://, so dist/index.html alone shows a blank page.)
// Usage: npm run standalone   →   writes tessera-standalone.html
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
let html = readFileSync(join(dist, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.?\/?(assets\/[^"]+\.css)"[^>]*>/g, (_, file) =>
  `<style>\n${readFileSync(join(dist, file), 'utf8')}\n</style>`);
html = html.replace(/<script type="module"[^>]*src="\.?\/?(assets\/[^"]+\.js)"[^>]*><\/script>/g, (_, file) => {
  const js = readFileSync(join(dist, file), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script type="module">\n${js}\n</script>`;
});

if (/src="\.?\/?assets\//.test(html)) throw new Error('Some assets were not inlined. Check dist/index.html.');
writeFileSync(join(root, 'tessera-standalone.html'), html);
console.log('Wrote tessera-standalone.html');
