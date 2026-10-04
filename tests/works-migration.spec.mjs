// What the move of the works section to the collection must leave behind: the
// old camelCase addresses redirect, and no hand-written project data stays in
// the code or the dictionaries.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import en from '../src/i18n/en.js';
import ru from '../src/i18n/ru.js';
import { ROOT } from './helpers/dist.mjs';

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const LEGACY = {
  atomMind: 'atom-mind',
  flameApp: 'flame-app',
  tezishApp: 'tezish-app',
};

const LEGACY_RULES = Object.entries(LEGACY).flatMap(([old, slug]) => [
  [`/works/${old}`, `/works/${slug}`],
  [`/ru/works/${old}`, `/ru/works/${slug}`],
]);

function redirects() {
  return readFileSync(join(ROOT, 'public/_redirects'), 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [from, to, status, ...rest] = line.split(/\s+/);
      return { from, to, status, extra: rest };
    });
}

describe('legacy project addresses', () => {
  it.each(LEGACY_RULES)('%s redirects to %s with 301', (from, to) => {
    expect(redirects()).toContainEqual({ from, to, status: '301', extra: [] });
  });

  it('redirects every old address to a lowercase hyphenated slug in the same language', () => {
    const legacy = redirects().filter((rule) => /^(\/ru)?\/works\/[^/]*[A-Z]/.test(rule.from));
    expect(legacy).toHaveLength(Object.keys(LEGACY).length * 2);
    for (const { from, to } of legacy) {
      expect(to.startsWith('/ru/')).toBe(from.startsWith('/ru/'));
      expect(to.split('/').at(-1)).toMatch(KEBAB);
    }
  });

  it('has no duplicate sources and no redirect that points at another redirect', () => {
    const rules = redirects();
    const sources = rules.map((rule) => rule.from);
    expect(new Set(sources).size).toBe(sources.length);
    for (const { to } of rules) expect(sources).not.toContain(to);
  });

  it('keeps the old sitemap address redirect', () => {
    expect(redirects()).toContainEqual({
      from: '/sitemap.xml',
      to: '/sitemap-index.xml',
      status: '301',
      extra: [],
    });
  });
});

describe.each([
  ['en', en],
  ['ru', ru],
])('%s dictionary after the move to the works collection', (_lang, dictionary) => {
  it('holds no per-project texts', () => {
    expect(dictionary.works?.items).toBeUndefined();
    expect(dictionary.workDetail).toBeUndefined();
  });

  it.each(['platform', 'stack', 'type', 'website', 'moreInfo', 'indiePersonal'])('keeps the metadata label common.meta.%s', (key) => {
    expect(dictionary.common.meta[key]).toEqual(expect.any(String));
    expect(dictionary.common.meta[key]).not.toBe('');
  });
});

describe('hand-written project data', () => {
  it('has no project list left in the code', () => {
    expect(existsSync(join(ROOT, 'src/data/works.ts'))).toBe(false);
  });

  it('has no screenshots left outside the content collection', () => {
    expect(existsSync(join(ROOT, 'src/assets/works'))).toBe(false);
  });
});
