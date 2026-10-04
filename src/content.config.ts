// Коллекция блога. Посты пишет scripts/import-from-drafta.mjs из заметок Drafta
// с тегом #projects/craftzman/blog: src/content/blog/<lang>/<slug>.md, вложения
// рядом, в <slug>/ (Astro оптимизирует их при сборке).
//
// Схема повторяет контракт front matter из scripts/lib/frontmatter.mjs
// (renderBlogFrontmatter); tests/frontmatter-contract.spec.mjs держит их в
// согласии. Схема взята из drafta-homepage.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

const translation = z.object({
  sourceHash: z.string(),
  sourceLang: z.enum(['en', 'ru']),
  provider: z.string(),
  model: z.string(),
  at: z.string(),
});

const blog = defineCollection({
  // id — путь файла ("ru/mcp-server"): без generateId загрузчик взял бы slug
  // из front matter и склеил бы русскую и английскую версии в одну запись.
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: z.enum(['en', 'ru']),
      slug: z.string(),
      date: z.string().regex(DATE_ONLY, 'date must be YYYY-MM-DD'),
      updated: z.string().regex(DATE_ONLY, 'updated must be YYYY-MM-DD'),
      draftaId: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      machineTranslated: z.boolean().default(false),
      translation: translation.optional(),
    }),
});

// Written by drafta-publisher (kind works) as src/content/works/<lang>/<slug>.md
// with attachments in <slug>/; tests/publisher-contract.spec.mjs freezes the
// schema against the publisher's samples.
const works = defineCollection({
  // The id is the file path for the same reason as in blog.
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/works',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: z.enum(['en', 'ru']),
      slug: z.string(),
      updated: z.string().regex(DATE_ONLY, 'updated must be YYYY-MM-DD'),
      draftaId: z.string(),
      group: z.enum(['work', 'own']),
      order: z.number().int(),
      years: z.string(),
      stack: z.string().optional(),
      platform: z.string().optional(),
      website: z.url().optional(),
      more: z.url().optional(),
      thumbnail: image(),
      machineTranslated: z.boolean().default(false),
      translation: translation.optional(),
    }),
});

export const collections = { blog, works };
