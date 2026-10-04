// The works section as the build ships it: one astro build over an isolated copy
// of the site whose works collection holds the entries below (see
// helpers/works-site.mjs). Everything is read back from the built files.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import en from '../src/i18n/en.js';
import ru from '../src/i18n/ru.js';
import { canonicalOf, hreflangs, linksOf, mainOf, metaContent, tagsOf } from './helpers/html.mjs';
import { bodyMarker, buildWorksSite, shotAlt, shotName, thumbnailName } from './helpers/works-site.mjs';

const SITE = 'https://www.craftzman.ru';
const BUILD_TIMEOUT = 300_000;
const INDIE_LABEL = {
  en: en.common.meta.indiePersonal,
  ru: ru.common.meta.indiePersonal,
};

// Paired entries exist in both languages; the order values and titles are chosen
// so that sorting by title, or ignoring the group, gives a different list.
const PROJECTS = [
  {
    slug: 'orbit',
    title: 'Zeta',
    group: 'work',
    order: 10,
    years: '2021–2023',
    stack: 'STK-orbit Go, gRPC',
    platform: 'PLT-orbit Linux',
  },
  {
    slug: 'harbor',
    title: 'Alpha',
    group: 'work',
    order: 20,
    years: '2023',
    website: 'https://www.harbor.example.com/path',
  },
  {
    slug: 'tie-banana',
    title: 'Banana',
    group: 'work',
    order: 30,
    years: '2019',
  },
  {
    slug: 'tie-apple',
    title: 'Apple',
    group: 'work',
    order: 30,
    years: '2018',
    more: 'https://more.example.org/about',
  },
  {
    slug: 'own-low',
    title: 'Zed',
    group: 'own',
    order: 1,
    years: '2026–',
    stack: 'STK-own Swift',
    platform: 'PLT-own macOS',
    website: 'https://site.example.net/',
    more: 'https://more-only.example.net/info',
  },
  { slug: 'own-mid', title: 'Mid', group: 'own', order: 15, years: '2024–2025' },
];
const RU_ONLY = {
  slug: 'ru-only',
  title: 'Solo',
  group: 'own',
  order: 40,
  years: '2022',
};

const ENTRIES = [
  ...PROJECTS.flatMap((project) => [
    { ...project, lang: 'ru', description: `Card text of ${project.slug}` },
    {
      ...project,
      lang: 'en',
      description: `Card text of ${project.slug}`,
      machineTranslated: true,
    },
  ]),
  { ...RU_ONLY, lang: 'ru', description: 'Card text of ru-only' },
];

const PAGES = ENTRIES.map((entry) => ({
  ...entry,
  path: entry.lang === 'ru' ? `/ru/works/${entry.slug}` : `/works/${entry.slug}`,
}));
const PAIRED = PAGES.filter((page) => page.slug !== RU_ONLY.slug);

let built;
const fileOf = (path) => join(built.dist, `${path}.html`);
const readPage = (path) => readFileSync(fileOf(path), 'utf8');
const distFileOf = (urlOrPath) => join(built.dist, new URL(urlOrPath, SITE).pathname);

beforeAll(async () => {
  built = await buildWorksSite(ENTRIES);
}, BUILD_TIMEOUT);

afterAll(() => built?.cleanup());

describe('works build — every project has its pages', () => {
  it.each(PAGES.map((page) => [page.path]))('%s is built', (path) => {
    expect(existsSync(fileOf(path))).toBe(true);
  });

  it('builds a page in no language where the project does not exist', () => {
    expect(existsSync(fileOf('/works/ru-only'))).toBe(false);
  });

  it('lists the projects in the sitemap', () => {
    const sitemap = readFileSync(join(built.dist, 'sitemap-0.xml'), 'utf8');
    for (const page of PAGES) expect(sitemap).toContain(`<loc>${SITE}${page.path}</loc>`);
  });
});

describe('works build — the list page', () => {
  const listed = (lang) => {
    const html = readFileSync(join(built.dist, lang === 'ru' ? 'ru/works.html' : 'works.html'), 'utf8');
    const hrefs = linksOf(mainOf(html))
      .map((link) => /^(?:\/ru)?\/works\/([a-z0-9-]+)$/.exec(link.href ?? '')?.[1])
      .filter(Boolean);
    return [...new Set(hrefs)];
  };

  const ordered = (group) =>
    PROJECTS.filter((project) => project.group === group)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
      .map((project) => project.slug);

  it('shows work before own and follows `order` inside each group, in English', () => {
    expect(listed('en').filter((slug) => slug !== RU_ONLY.slug)).toEqual([...ordered('work'), ...ordered('own')]);
  });

  it('shows work before own and follows `order` inside each group, in Russian', () => {
    expect(listed('ru')).toEqual([...ordered('work'), ...ordered('own'), RU_ONLY.slug]);
  });
});

describe('works build — the cards', () => {
  it.each(['en', 'ru'])('shows each %s project with its thumbnail and card text', (lang) => {
    const html = readFileSync(join(built.dist, lang === 'ru' ? 'ru/works.html' : 'works.html'), 'utf8');
    const cards = linksOf(mainOf(html)).filter((link) => /^(?:\/ru)?\/works\/[a-z0-9-]+$/.test(link.href ?? ''));
    const expected = PAGES.filter((page) => page.lang === lang);
    expect(cards.map((card) => card.href)).toEqual(expect.arrayContaining(expected.map((page) => page.path)));
    for (const page of expected) {
      const card = cards.find((link) => link.href === page.path);
      const thumb = tagsOf(card.html, 'img').find((img) =>
        new URL(img.src, SITE).pathname.startsWith(`/_astro/${thumbnailName(page.slug).replace('.png', '')}.`),
      );
      expect(thumb, `${page.path} has no thumbnail`).toBeDefined();
      expect(existsSync(distFileOf(thumb.src))).toBe(true);
      expect(card.text).toContain(page.description);
    }
  });
});

describe('works build — a project page', () => {
  const metaOf = (page) => {
    const main = mainOf(readPage(page.path));
    return { main, body: main.indexOf(bodyMarker(page.slug)) };
  };

  it.each(PAIRED.map((page) => [page.path, page]))('%s puts the metadata before the body text', (_path, page) => {
    const { main, body } = metaOf(page);
    expect(body).toBeGreaterThan(-1);
    const before = [page.years, page.stack, page.platform].filter(Boolean);
    for (const text of before) {
      const at = main.indexOf(text);
      expect(at, `"${text}" is missing`).toBeGreaterThan(-1);
      expect(at, `"${text}" comes after the body`).toBeLessThan(body);
    }
  });

  it.each(PAIRED.map((page) => [page.path, page]))('%s names the project in its single h1', (_path, page) => {
    const h1 = tagsOf(readPage(page.path), 'h1');
    expect(h1).toHaveLength(1);
    expect(readPage(page.path)).toMatch(new RegExp(`<h1\\b[^>]*>\\s*${page.title}\\s*</h1>`));
  });

  it.each(PAIRED.map((page) => [page.path, page]))('%s carries the indie row only for own products', (_path, page) => {
    const { main, body } = metaOf(page);
    const at = main.indexOf(INDIE_LABEL[page.lang]);
    if (page.group === 'own') {
      expect(at).toBeGreaterThan(-1);
      expect(at).toBeLessThan(body);
    } else {
      expect(at).toBe(-1);
    }
  });

  it.each(PAIRED.map((page) => [page.path, page]))('%s shows the website over the more-info page, before the body', (_path, page) => {
    const { main, body } = metaOf(page);
    const external = linksOf(main).filter((link) => link.href?.startsWith('http'));
    const expected = page.website ?? page.more;
    if (!expected) {
      expect(external).toEqual([]);
      return;
    }
    expect(external.map((link) => link.href)).toEqual([expected]);
    expect(external[0].text).toContain(new URL(expected).hostname.replace(/^www\./, ''));
    expect(external[0].text).not.toMatch(/www\./);
    expect(main.indexOf(`href="${expected}"`)).toBeLessThan(body);
  });

  it.each(PAIRED.map((page) => [page.path, page]))('%s renders the screenshot from the note body', (_path, page) => {
    const { main } = metaOf(page);
    const shot = tagsOf(main, 'img').find((img) => img.alt === shotAlt(page.slug));
    expect(shot, 'the body image is missing').toBeDefined();
    expect(new URL(shot.src, SITE).pathname).toMatch(new RegExp(`^/_astro/${shotName(page.slug).replace('.png', '')}\\.`));
    expect(existsSync(distFileOf(shot.src))).toBe(true);
  });

  it.each(PAGES.map((page) => [page.path, page]))('%s previews with its own thumbnail', (_path, page) => {
    const image = metaContent(readPage(page.path), 'og:image');
    expect(image).toMatch(new RegExp(`^${SITE}/_astro/${thumbnailName(page.slug).replace('.png', '')}\\.`));
    expect(existsSync(distFileOf(image))).toBe(true);
  });

  it.each(PAGES.map((page) => [page.path, page]))('%s uses the card text as its description', (_path, page) => {
    const html = readPage(page.path);
    expect(metaContent(html, 'description')).toBe(page.description);
    expect(metaContent(html, 'og:description')).toBe(page.description);
  });
});

describe('works build — language links', () => {
  it.each(PAIRED.map((page) => [page.path, page]))('%s links both languages and the English page as default', (_path, page) => {
    const html = readPage(page.path);
    const en = `${SITE}/works/${page.slug}`;
    expect(hreflangs(html)).toEqual({
      en,
      ru: `${SITE}/ru/works/${page.slug}`,
      'x-default': en,
    });
    expect(canonicalOf(html)).toBe(`${SITE}${page.path}`);
  });

  it('links a Russian-only project to itself alone', () => {
    const html = readPage('/ru/works/ru-only');
    const own = `${SITE}/ru/works/ru-only`;
    expect(hreflangs(html)).toEqual({ ru: own, 'x-default': own });
  });

  it('never points hreflang at a page that was not built', () => {
    for (const page of PAGES) {
      for (const href of Object.values(hreflangs(readPage(page.path)))) {
        expect(existsSync(fileOf(new URL(href).pathname)), `${page.path} → ${href}`).toBe(true);
      }
    }
  });
});

describe('works build — static files', () => {
  it('ships the legacy address redirects at the root of the output', () => {
    const shipped = readFileSync(join(built.dist, '_redirects'), 'utf8');
    for (const slug of ['atomMind', 'flameApp', 'tezishApp']) {
      expect(shipped).toContain(`/works/${slug} `);
      expect(shipped).toContain(`/ru/works/${slug} `);
    }
  });
});
