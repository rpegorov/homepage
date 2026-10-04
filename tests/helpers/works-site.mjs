// Builds the site from an isolated copy of the repository whose works
// collection holds only the entries a test passes in. The real src/content is
// never touched and nothing is left in the working tree.
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';
import { ROOT } from './dist.mjs';

const FIXTURES = join(ROOT, 'tests/fixtures/publisher-contract/v2');
const SKIPPED_DIRS = new Set(['node_modules', 'dist', '.astro', '.git', '.claude', '.serena', 'tests']);
const SKIPPED_CONTENT = ['src/content/blog', 'src/content/works'];
const IMAGE = { width: 640, height: 360 };

function copyFilter(src) {
  const rel = relative(ROOT, src).split(sep).join('/');
  if (rel === '') return true;
  if (SKIPPED_DIRS.has(rel.split('/')[0])) return false;
  return !SKIPPED_CONTENT.some((dir) => rel === dir || rel.startsWith(`${dir}/`));
}

function yamlValue(value) {
  return typeof value === 'string' ? JSON.stringify(value) : String(value);
}

/** The fixture's front matter with `fields` replaced; an `undefined` value removes the key. */
function frontmatterFrom(fixture, fields) {
  const lines = fixture.split('\n');
  const close = lines.indexOf('---', 1);
  const head = lines.slice(0, close);
  for (const [key, value] of Object.entries(fields)) {
    const at = head.findIndex((line) => line.startsWith(`${key}:`));
    if (value === undefined) {
      if (at !== -1) head.splice(at, 1);
    } else if (at !== -1) {
      head[at] = `${key}: ${yamlValue(value)}`;
    } else {
      head.push(`${key}: ${yamlValue(value)}`);
    }
  }
  return [...head, '---'].join('\n');
}

// Every seed gives a different colour, so no two images share bytes and Astro keeps each file under its own name.
async function solidPng(seed) {
  const background = { r: (seed * 37) % 256, g: (seed * 91 + 10) % 256, b: (seed * 151 + 50) % 256 };
  return sharp({ create: { ...IMAGE, channels: 3, background } })
    .png()
    .toBuffer();
}

export const thumbnailName = (slug) => `thumb-${slug}.png`;
export const shotName = (slug) => `shot-${slug}.png`;
export const shotAlt = (slug) => `Screenshot of ${slug}`;
export const bodyMarker = (slug) => `BODY-${slug}`;

async function writeEntry(site, entry, index) {
  const { lang, slug, body = `${bodyMarker(slug)} is the first paragraph of the page.`, ...fields } = entry;
  const fixture = readFileSync(join(FIXTURES, lang === 'ru' ? 'works-ru.md' : 'works-en-machine.md'), 'utf8');
  const frontmatter = frontmatterFrom(fixture, {
    lang,
    slug,
    thumbnail: `./${slug}/${thumbnailName(slug)}`,
    website: undefined,
    more: undefined,
    ...fields,
  });
  const dir = join(site, 'src/content/works', lang);
  mkdirSync(join(dir, slug), { recursive: true });
  writeFileSync(join(dir, `${slug}.md`), `${frontmatter}\n\n${body}\n\n![${shotAlt(slug)}](./${slug}/${shotName(slug)})\n`);
  writeFileSync(join(dir, slug, thumbnailName(slug)), await solidPng(index * 2));
  writeFileSync(join(dir, slug, shotName(slug)), await solidPng(index * 2 + 1));
}

/**
 * Runs `astro build` over a copy of the repository with `entries` as the works
 * collection and no blog posts. Each entry: `{ lang, slug, title, group, order,
 * years, ...front matter fields, body? }`.
 */
export async function buildWorksSite(entries) {
  const site = mkdtempSync(join(tmpdir(), 'works-site-'));
  try {
    cpSync(ROOT, site, { recursive: true, filter: copyFilter });
    symlinkSync(join(ROOT, 'node_modules'), join(site, 'node_modules'), 'dir');
    for (const lang of ['en', 'ru']) {
      mkdirSync(join(site, 'src/content/blog', lang), { recursive: true });
      mkdirSync(join(site, 'src/content/works', lang), { recursive: true });
    }
    for (const [index, entry] of entries.entries()) await writeEntry(site, entry, index);

    const build = spawnSync(process.execPath, [join(ROOT, 'node_modules/astro/bin/astro.mjs'), 'build'], {
      cwd: site,
      encoding: 'utf8',
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', FORCE_COLOR: '0' },
    });
    if (build.status !== 0) throw new Error(`astro build failed (exit ${build.status})\n${build.stdout}\n${build.stderr}`);
    return {
      dist: join(site, 'dist'),
      cleanup: () => rmSync(site, { recursive: true, force: true }),
    };
  } catch (error) {
    rmSync(site, { recursive: true, force: true });
    throw error;
  }
}
