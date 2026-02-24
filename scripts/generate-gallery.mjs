#!/usr/bin/env node
/**
 * Gallery JSON generator
 *
 * Scans static/img/gallery/ for images and writes src/data/gallery.json.
 *
 * Usage:
 *   node scripts/generate-gallery.mjs
 *   npm run gallery:build
 *
 * To add more images: drop files into static/img/gallery/ and re-run.
 */

import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const GALLERY_DIR = join(ROOT, 'static', 'img', 'gallery');
const OUTPUT = join(ROOT, 'src', 'data', 'gallery.json');

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const TAG_MAP = {
  exterior: 'Exterior',
  'house-a': 'House A',
  'house-b': 'House B',
  amenity: 'Amenities',
};

function humanize(filename) {
  const name = basename(filename, extname(filename));
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function deriveTags(filename) {
  const name = basename(filename, extname(filename)).toLowerCase();
  for (const [prefix, tag] of Object.entries(TAG_MAP)) {
    if (name.startsWith(prefix + '_') || name.startsWith(prefix + '-')) {
      return [tag];
    }
  }
  return ['Other'];
}

function scanDir(dir, base = dir) {
  const entries = [];
  for (const item of readdirSync(dir)) {
    if (item.startsWith('.')) continue;
    const full = join(dir, item);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      entries.push(...scanDir(full, base));
    } else {
      const ext = extname(item).toLowerCase();
      if (SUPPORTED.has(ext)) {
        const rel = full.slice(base.length).replace(/\\/g, '/');
        entries.push({
          src: `/img/gallery${rel}`,
          alt: humanize(item),
          tags: deriveTags(item),
          caption: humanize(item),
        });
      }
    }
  }
  return entries;
}

// Scan and sort alphabetically by src for stable ordering
const images = scanDir(GALLERY_DIR).sort((a, b) => a.src.localeCompare(b.src));

// Deduplicate by src
const seen = new Set();
const unique = images.filter((img) => {
  if (seen.has(img.src)) return false;
  seen.add(img.src);
  return true;
});

// Ensure output directory exists
mkdirSync(join(ROOT, 'src', 'data'), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(unique, null, 2) + '\n');

console.log(`Gallery: wrote ${unique.length} images to src/data/gallery.json`);
