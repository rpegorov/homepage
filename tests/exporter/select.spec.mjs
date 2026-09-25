// Правило выбора для craftzman.ru (scripts/site.config.mjs): блог — только
// `#projects/craftzman/blog`; прочие заметки проекта под `#projects/craftzman`
// не публикуются, а служебные теги не становятся тегами поста.
import { describe, expect, it } from 'vitest';
import { selectNote } from '../../scripts/lib/select.mjs';

const SITE_BLOCK = '```site\nslug: hello\nlang: ru\ndescription: Проверка\n```';

const note = (body, extra = {}) => ({
  id: '0A000000-0000-4000-8000-00000000000A',
  title: 'Hello',
  status: 'completed',
  trashed: false,
  isTemplate: false,
  extraTags: [],
  body: `# Hello\n\n${SITE_BLOCK}\n\n${body}\n`,
  ...extra,
});

describe('selection by #projects/craftzman/blog', () => {
  it('publishes a completed note tagged #projects/craftzman/blog', () => {
    expect(selectNote(note('Текст. #projects/craftzman/blog')).verdict).toBe('publish');
  });

  it('does not publish project docs and other project notes', () => {
    for (const tag of ['#projects/craftzman', '#projects/craftzman/docs', '#craftzman/blog', '#site/blog']) {
      const verdict = selectNote(note(`Текст. ${tag}`));
      expect(verdict, tag).toMatchObject({ verdict: 'skip', reason: 'no site tag' });
    }
  });

  it('keeps project and drafta.org publishing tags out of the post tags', () => {
    const verdict = selectNote(note('Текст. #projects/craftzman/blog #projects/craftzman/rust #site/blog #rust #iiot'));
    expect(verdict.verdict).toBe('publish');
    expect(verdict.tags.sort()).toEqual(['iiot', 'rust']);
  });

  it('accepts the tag from extraTags too', () => {
    expect(selectNote(note('Текст.', { extraTags: ['projects/craftzman/blog'] })).verdict).toBe('publish');
  });
});
