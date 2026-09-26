// PLAN — site-publisher §4.3: drafta-publisher freezes its front matter render
// against contract/samples/v1/*.md; this site freezes its own zod schema
// against copies of those same samples (tests/fixtures/publisher-contract/v1/).
// Neither repository depends on the other at test time — a version bump shows
// up here only when someone updates the copied fixtures. craftzman.ru has no
// docs section, so only the blog samples apply here.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'astro/zod';
import { importContract, parseMarkdown } from './helpers/contract.mjs';
import { ROOT } from './helpers/dist.mjs';

// content.config.ts imports the virtual `astro:content`; outside the Astro build
// defineCollection is the identity, which is all the schemas need.
vi.mock('astro:content', () => ({ defineCollection: (c) => c }));

const FIXTURES = join(ROOT, 'tests/fixtures/publisher-contract/v1');

function readFixture(name) {
  return readFileSync(join(FIXTURES, name), 'utf8');
}

function dataOf(fixture) {
  return parseMarkdown(readFixture(fixture)).data;
}

async function blogSchema() {
  const mod = await importContract('src/content.config.ts', 'S2');
  const { blog } = mod.collections;
  const { schema } = blog;
  return typeof schema === 'function' ? schema({ image: () => z.string() }) : schema;
}

describe('drafta-publisher contract v1 — craftzman.ru accepts the frozen samples', () => {
  it('blog-ru.md (a Russian original) passes the blog schema', async () => {
    const result = (await blogSchema()).safeParse(dataOf('blog-ru.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data).toMatchObject({ lang: 'ru', slug: 'privet-mir', machineTranslated: false });
  });

  it('blog-en-machine.md (a machine translation) passes the blog schema', async () => {
    const result = (await blogSchema()).safeParse(dataOf('blog-en-machine.md'));
    expect(result.error?.issues ?? []).toEqual([]);
    expect(result.data.machineTranslated).toBe(true);
    expect(result.data.translation).toMatchObject({ sourceLang: 'ru', provider: 'deepseek' });
  });
});

describe('drafta-publisher contract v1 — rejections', () => {
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
});
