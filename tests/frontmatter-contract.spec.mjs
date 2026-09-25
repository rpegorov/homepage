// Шов между экспортёром и сайтом: что пишет scripts/lib/frontmatter.mjs, то
// сайт должен принять (scripts/lib/posts.mjs, validatePost), а битое — отвергнуть.
import { describe, expect, it } from 'vitest';
import { renderBlogFrontmatter } from '../scripts/lib/frontmatter.mjs';
import { validatePost } from '../scripts/lib/posts.mjs';
import { parseMarkdown } from './helpers/contract.mjs';

const BLOG_INPUT = {
  title: 'Hello world',
  description: 'The first post written in Drafta',
  lang: 'en',
  slug: 'hello-world',
  date: '2026-09-21',
  updated: '2026-09-22',
  draftaId: '0A000000-0000-4000-8000-00000000000A',
  tags: ['drafta'],
};

const rendered = (overrides = {}) => parseMarkdown(renderBlogFrontmatter({ ...BLOG_INPUT, ...overrides })).data;

describe('front matter contract', () => {
  it('the site accepts renderBlogFrontmatter output as is', () => {
    const data = rendered();
    expect(validatePost(data, 'en', 'hello-world')).toEqual([]);
    expect(data).toMatchObject({ lang: 'en', slug: 'hello-world', draftaId: BLOG_INPUT.draftaId, tags: ['drafta'] });
  });

  it('keeps the machine-translation marks the post page reads', () => {
    const data = rendered({
      machineTranslated: true,
      translation: { sourceHash: 'abc', sourceLang: 'ru', provider: 'anthropic', model: 'm', at: '2026-09-25T10:00:00Z' },
    });
    expect(validatePost(data, 'en', 'hello-world')).toEqual([]);
    expect(data.machineTranslated).toBe(true);
    expect(data.translation.sourceLang).toBe('ru');
  });
});

describe('front matter contract — rejections', () => {
  it('a post without draftaId is rejected', () => {
    const { draftaId, ...withoutId } = rendered();
    expect(draftaId).toBe(BLOG_INPUT.draftaId);
    expect(validatePost(withoutId, 'en', 'hello-world')).toContain('draftaId');
  });

  it('lang or slug that disagree with the file location are rejected', () => {
    expect(validatePost(rendered(), 'ru', 'hello-world')).toContain('lang');
    expect(validatePost(rendered(), 'en', 'other-slug')).toContain('slug');
  });

  it('a date that is not YYYY-MM-DD is rejected', () => {
    for (const date of ['2026-9-5', '25.09.2026', '2026-09-21T10:00:00Z']) {
      expect(validatePost(rendered({ date }), 'en', 'hello-world'), date).toContain('date');
    }
  });
});
