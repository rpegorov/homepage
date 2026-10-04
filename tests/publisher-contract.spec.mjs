// This site freezes its zod schemas against copies of the publisher's contract samples
// (tests/fixtures/publisher-contract/v2/); a version bump shows up here only when
// the copied fixtures are updated. craftzman.ru has no docs section.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { collectionSchema, parseMarkdown } from './helpers/contract.mjs';
import { ROOT } from './helpers/dist.mjs';

// content.config.ts imports the virtual `astro:content`; outside the Astro build
// defineCollection is the identity, which is all the schemas need.
vi.mock('astro:content', () => ({ defineCollection: (c) => c }));

const CONTRACTS = join(ROOT, 'tests/fixtures/publisher-contract');
const SITE_CONFIG = join(ROOT, 'publish.config.json');

function readFixture(name, version = 'v2') {
  return readFileSync(join(CONTRACTS, version, name), 'utf8');
}

function dataOf(fixture) {
  return parseMarkdown(readFixture(fixture)).data;
}

const blogSchema = () => collectionSchema('blog');
const worksSchema = () => collectionSchema('works');

describe('drafta-publisher contract v2 — the site config', () => {
  it('declares contract 2 with blog and works sections laid out for the collections', () => {
    const config = JSON.parse(readFileSync(SITE_CONFIG, 'utf8'));
    expect(config.contract).toBe(2);
    expect(config.sections.blog.kind).toBe('blog');
    expect(config.sections.works).toEqual({
      kind: 'works',
      dirs: { en: 'src/content/works/en', ru: 'src/content/works/ru' },
      urls: { en: '/works/{slug}', ru: '/ru/works/{slug}' },
    });
  });

  it('keeps the blog samples byte-identical to v1', () => {
    for (const name of ['blog-ru.md', 'blog-en-machine.md']) {
      expect(readFixture(name, 'v2')).toBe(readFixture(name, 'v1'));
    }
  });
});

describe('drafta-publisher contract v2 — craftzman.ru accepts the frozen samples', () => {
  it('blog-ru.md (a Russian original) passes the blog schema', async () => {
    const result = (await blogSchema()).safeParse(dataOf('blog-ru.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data).toMatchObject({
      lang: 'ru',
      slug: 'privet-mir',
      machineTranslated: false,
    });
  });

  it('blog-en-machine.md (a machine translation) passes the blog schema', async () => {
    const result = (await blogSchema()).safeParse(dataOf('blog-en-machine.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data.machineTranslated).toBe(true);
    expect(result.data.translation).toMatchObject({
      sourceLang: 'ru',
      provider: 'deepseek',
    });
  });

  it('works-ru.md (a Russian original) passes the works schema', async () => {
    const result = (await worksSchema()).safeParse(dataOf('works-ru.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data).toMatchObject({
      lang: 'ru',
      slug: 'privet-proekt',
      group: 'own',
      order: 10,
      years: '2026–',
      website: 'https://example.com',
      machineTranslated: false,
    });
  });

  it('works-en-machine.md (a machine translation) passes the works schema', async () => {
    const result = (await worksSchema()).safeParse(dataOf('works-en-machine.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data.machineTranslated).toBe(true);
    expect(result.data.translation).toMatchObject({
      sourceLang: 'ru',
      provider: 'deepseek',
    });
  });
});

describe('drafta-publisher contract v2 — rejections', () => {
  it('blog front matter without draftaId does not pass the schema', async () => {
    const schema = await blogSchema();
    const { draftaId, ...withoutId } = dataOf('blog-ru.md');
    expect(draftaId).toBeTruthy();
    expect(schema.safeParse(withoutId).success).toBe(false);
  });

  it("lang: 'de' is rejected", async () => {
    const schema = await blogSchema();
    const data = dataOf('blog-ru.md');
    expect(schema.safeParse({ ...data, lang: 'de' }).success).toBe(false);
  });

  it.each(['group', 'order', 'years', 'thumbnail', 'draftaId'])('works front matter without %s is rejected', async (key) => {
    const schema = await worksSchema();
    const { [key]: removed, ...rest } = dataOf('works-ru.md');
    expect(removed).toBeDefined();
    expect(schema.safeParse(rest).success).toBe(false);
  });

  it.each([
    ['group', 'client'],
    ['order', 1.5],
    ['website', 'example.com'],
    ['more', 'not a url'],
    ['website', 'javascript:alert(1)'],
    ['more', 'ftp://example.com/file'],
  ])('works %s: %j is rejected', async (key, value) => {
    const schema = await worksSchema();
    expect(schema.safeParse({ ...dataOf('works-ru.md'), [key]: value }).success).toBe(false);
  });
});
