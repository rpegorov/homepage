// Посты блога на диске: content/blog/<lang>/<slug>.md, которые пишет
// scripts/import-from-drafta.mjs. Общий код для страниц Next.js (lib/blog.js)
// и генератора sitemap/RSS (scripts/generate-feeds.mjs). Только Node.
import fs from 'node:fs'
import path from 'node:path'
import { parseFrontmatter } from './frontmatter.mjs'
import { SECTION_DIRS } from '../site.config.mjs'

const DATE = /^\d{4}-\d{2}-\d{2}$/

export const LANGS = ['en', 'ru']

function dirOf(lang, root) {
  return path.join(root, SECTION_DIRS.blog[lang])
}

// Тот же контракт, что проверяет tests/frontmatter-contract.spec.mjs: пост без
// обязательных полей не попадает на сайт, а не ломает сборку.
export function validatePost(data, lang, slug) {
  const problems = []
  for (const key of ['title', 'description', 'draftaId']) {
    if (typeof data[key] !== 'string' || !data[key]) problems.push(key)
  }
  if (data.lang !== lang) problems.push('lang')
  if (data.slug !== slug) problems.push('slug')
  if (typeof data.date !== 'string' || !DATE.test(data.date))
    problems.push('date')
  if (typeof data.updated !== 'string' || !DATE.test(data.updated))
    problems.push('updated')
  if (data.tags !== undefined && !Array.isArray(data.tags))
    problems.push('tags')
  return problems
}

function readPost(dir, lang, file) {
  const slug = file.replace(/\.md$/, '')
  const text = fs.readFileSync(path.join(dir, file), 'utf8')
  const { data, body } = parseFrontmatter(text)
  const problems = validatePost(data, lang, slug)
  if (problems.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`[blog] ${lang}/${file}: skipped, bad ${problems.join(', ')}`)
    return null
  }
  return {
    slug,
    lang,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: typeof data.cover === 'string' ? data.cover : null,
    machineTranslated: data.machineTranslated === true,
    sourceLang: data.translation?.sourceLang ?? null,
    body
  }
}

/** Все посты языка, новые сверху. */
export function getPosts(lang, root = process.cwd()) {
  const dir = dirOf(lang, root)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => readPost(dir, lang, file))
    .filter(Boolean)
    .sort((a, b) =>
      a.date === b.date
        ? a.slug.localeCompare(b.slug)
        : a.date < b.date
        ? 1
        : -1
    )
}

export function getPost(lang, slug, root) {
  return getPosts(lang, root).find(post => post.slug === slug) ?? null
}

/** Языки, на которых есть пост с этим slug: для hreflang и ссылки на оригинал. */
export function languagesOf(slug, root) {
  return LANGS.filter(lang => getPost(lang, slug, root))
}

/** Карточка поста для списка: без тела. */
export function summary(post) {
  // eslint-disable-next-line no-unused-vars
  const { body, ...rest } = post
  return rest
}
