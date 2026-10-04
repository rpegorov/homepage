// The rules behind the works list and project pages: ordering, grouping, where a
// project lives, which language twin it has and what link it shows. Entries are
// synthetic; the Astro content store is the only thing replaced.
import { getCollection } from 'astro:content';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WORK_GROUPS, alternatesOf, byOrder, domainLabel, groupWorks, isIndie, linkOf, twinOf, workPath, worksOf } from '../src/lib/works.ts';

vi.mock('astro:content', () => ({ getCollection: vi.fn() }));

function work(overrides = {}) {
  const { slug = 'sample', lang = 'ru', ...data } = overrides;
  return {
    id: `${lang}/${slug}`,
    collection: 'works',
    data: {
      title: 'Sample',
      description: 'd',
      lang,
      slug,
      group: 'work',
      order: 10,
      years: '2026–',
      ...data,
    },
  };
}

const slugs = (works) => works.map((w) => w.data.slug);

function serve(entries) {
  getCollection.mockImplementation(async (_name, filter = () => true) => entries.filter(filter));
}

beforeEach(() => {
  getCollection.mockReset();
});

describe('byOrder', () => {
  it('sorts by numeric order, not by the digits as text', () => {
    const sorted = [work({ slug: 'c', order: 100 }), work({ slug: 'a', order: 9 }), work({ slug: 'b', order: 10 })].sort(byOrder);
    expect(slugs(sorted)).toEqual(['a', 'b', 'c']);
  });

  it('puts order before title', () => {
    const sorted = [work({ slug: 'first', order: 1, title: 'Zeta' }), work({ slug: 'second', order: 2, title: 'Alpha' })].sort(byOrder);
    expect(slugs(sorted)).toEqual(['first', 'second']);
  });

  it('breaks equal orders by title', () => {
    const sorted = [work({ slug: 'b', order: 5, title: 'Banana' }), work({ slug: 'a', order: 5, title: 'Apple' })].sort(byOrder);
    expect(slugs(sorted)).toEqual(['a', 'b']);
  });
});

describe('groupWorks', () => {
  it('shows employer work before own products', () => {
    expect(WORK_GROUPS).toEqual(['work', 'own']);
  });

  it('keeps both groups present when one of them is empty', () => {
    expect(groupWorks([])).toEqual({ work: [], own: [] });
    expect(groupWorks([work({ group: 'own' })]).work).toEqual([]);
  });

  it('sorts inside each group and never mixes the groups', () => {
    const grouped = groupWorks([
      work({ slug: 'own-2', group: 'own', order: 20 }),
      work({ slug: 'job-2', group: 'work', order: 20 }),
      work({ slug: 'own-1', group: 'own', order: 1 }),
      work({ slug: 'job-1', group: 'work', order: 10 }),
    ]);
    expect(slugs(grouped.work)).toEqual(['job-1', 'job-2']);
    expect(slugs(grouped.own)).toEqual(['own-1', 'own-2']);
  });

  it('does not reorder or consume the input list', () => {
    const input = [work({ slug: 'b', order: 2 }), work({ slug: 'a', order: 1 })];
    groupWorks(input);
    expect(slugs(input)).toEqual(['b', 'a']);
  });
});

describe('worksOf and twinOf', () => {
  const entries = [
    work({ slug: 'late', lang: 'ru', order: 20 }),
    work({ slug: 'early', lang: 'ru', order: 10 }),
    work({ slug: 'early', lang: 'en', order: 10 }),
    work({ slug: 'solo', lang: 'ru', order: 30 }),
  ];

  it('lists only the requested language, in order', async () => {
    serve(entries);
    expect(slugs(await worksOf('ru'))).toEqual(['early', 'late', 'solo']);
    expect(slugs(await worksOf('en'))).toEqual(['early']);
  });

  it('finds the other-language entry with the same slug', async () => {
    serve(entries);
    expect((await twinOf(entries[1])).data.lang).toBe('en');
    expect((await twinOf(entries[2])).data.lang).toBe('ru');
  });

  it('returns nothing when the project exists in one language only', async () => {
    serve(entries);
    expect(await twinOf(entries[3])).toBeUndefined();
  });

  it('does not pair different projects, even in different languages', async () => {
    const ru = work({ slug: 'one', lang: 'ru' });
    serve([ru, work({ slug: 'two', lang: 'en' })]);
    expect(await twinOf(ru)).toBeUndefined();
  });
});

describe('workPath', () => {
  it('has no language prefix for English and /ru for Russian, without a trailing slash', () => {
    expect(workPath('en', 'atom-mind')).toBe('/works/atom-mind');
    expect(workPath('ru', 'atom-mind')).toBe('/ru/works/atom-mind');
  });
});

describe('alternatesOf', () => {
  it('links both languages when the twin exists', () => {
    const ru = work({ slug: 'keel', lang: 'ru' });
    const en = work({ slug: 'keel', lang: 'en' });
    expect(alternatesOf(ru, en)).toStrictEqual({
      ru: '/ru/works/keel',
      en: '/works/keel',
    });
    expect(alternatesOf(en, ru)).toStrictEqual({
      ru: '/ru/works/keel',
      en: '/works/keel',
    });
  });

  it('lists only its own language when there is no twin', () => {
    expect(alternatesOf(work({ slug: 'keel', lang: 'ru' }), undefined)).toStrictEqual({ ru: '/ru/works/keel' });
    expect(alternatesOf(work({ slug: 'keel', lang: 'en' }), undefined)).toStrictEqual({ en: '/works/keel' });
  });
});

describe('isIndie', () => {
  it('is true for own products and false for employer work', () => {
    expect(isIndie(work({ group: 'own' }))).toBe(true);
    expect(isIndie(work({ group: 'work' }))).toBe(false);
  });
});

describe('domainLabel', () => {
  it('drops the scheme, a leading www, the port, the path and the query', () => {
    expect(domainLabel('https://www.example.com/a/b?c=d#e')).toBe('example.com');
    expect(domainLabel('http://example.com:8080/')).toBe('example.com');
  });

  it('keeps other subdomains and a www that is not the first label', () => {
    expect(domainLabel('https://docs.example.com')).toBe('docs.example.com');
    expect(domainLabel('https://app.www.example.com')).toBe('app.www.example.com');
    expect(domainLabel('https://www2.example.com')).toBe('www2.example.com');
  });
});

describe('linkOf', () => {
  it('prefers the website over the more-info page and labels it with its own domain', () => {
    const link = linkOf(
      work({
        website: 'https://www.site.example/x',
        more: 'https://more.example/y',
      }),
    );
    expect(link).toEqual({
      kind: 'website',
      href: 'https://www.site.example/x',
      label: 'site.example',
    });
  });

  it('falls back to the more-info page', () => {
    expect(linkOf(work({ more: 'https://more.example/y' }))).toEqual({
      kind: 'more',
      href: 'https://more.example/y',
      label: 'more.example',
    });
  });

  it('has no link when neither is set', () => {
    expect(linkOf(work())).toBeUndefined();
  });
});
