import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---- settings ----
const QUALITY = 50;
const EFFORT = 4;
const MAX_WIDTH = 1600;
const WITHOUT_ENLARGEMENT = true;
// -------------------

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg']);

const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (SOURCE_EXT.has(extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = (await walk(ROOT)).sort();
let totalBefore = 0;
let totalAfter = 0;
const failed = [];

for (const file of files) {
  try {
    const before = (await stat(file)).size;
    const out = file.slice(0, -extname(file).length) + '.avif';

    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: WITHOUT_ENLARGEMENT })
      .avif({ quality: QUALITY, effort: EFFORT })
      .toFile(out);

    const after = (await stat(out)).size;
    totalBefore += before;
    totalAfter += after;
    const saved = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `${basename(dirname(file))}/${basename(file)} -> ${basename(out)}  ${fmt(before)} -> ${fmt(after)}  (-${saved}%)`
    );
  } catch (err) {
    failed.push(`${file}: ${err.message}`);
    console.error(`FAIL ${file}: ${err.message}`);
  }
}

console.log('---');
console.log(`${files.length - failed.length}/${files.length} converted`);
console.log(`total ${fmt(totalBefore)} -> ${fmt(totalAfter)} (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
if (failed.length) {
  console.error(`${failed.length} failed:`);
  failed.forEach((f) => console.error('  ' + f));
  process.exitCode = 1;
}