// Собирает public/sitemap.xml и RSS блога (public/rss.xml, public/ru/rss.xml).
// Запускается перед сборкой (npm run build) и вручную: npm run feeds.
//
// sitemap: главная, проекты и каждый проект — на обоих языках (английский в
// корне, русский под /ru) с hreflang; блог и посты — только на тех языках,
// где пост есть (перевод может ещё не выйти).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from './site.config.mjs'
import { LANGS, getPosts } from './lib/posts.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const url = (p, lang) => {
  if (lang === 'ru') return `${SITE_URL}${p === '/' ? '/ru' : `/ru${p}`}`
  return `${SITE_URL}${p}`
}

const escape = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// ── sitemap ────────────────────────────────────────────────────────────────

const works = fs
  .readdirSync(path.join(root, 'pages/works'))
  .filter(f => f.endsWith('.js'))
  .map(f => `/works/${f.replace(/\.js$/, '')}`)
  .sort()

const postsByLang = Object.fromEntries(LANGS.map(l => [l, getPosts(l, root)]))
const slugs = [
  ...new Set(LANGS.flatMap(l => postsByLang[l].map(p => p.slug)))
].sort()

const pages = [
  { path: '/', langs: LANGS, changefreq: 'monthly', priority: '1.0' },
  { path: '/works', langs: LANGS, changefreq: 'monthly', priority: '0.9' },
  { path: '/blog', langs: LANGS, changefreq: 'weekly', priority: '0.9' },
  ...works.map(p => ({
    path: p,
    langs: LANGS,
    changefreq: 'yearly',
    priority: '0.7'
  })),
  ...slugs.map(slug => {
    const langs = LANGS.filter(l => postsByLang[l].some(p => p.slug === slug))
    const updated = langs
      .map(l => postsByLang[l].find(p => p.slug === slug).updated)
      .sort()
      .pop()
    return {
      path: `/blog/${slug}`,
      langs,
      lastmod: updated,
      changefreq: 'monthly',
      priority: '0.8'
    }
  })
]

const entry = (page, lang) => {
  const links = page.langs
    .map(
      l =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(
          page.path,
          l
        )}"/>`
    )
    .join('\n')
  const xDefault = page.langs.includes('en') ? 'en' : page.langs[0]
  return `  <url>
    <loc>${url(page.path, lang)}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(
      page.path,
      xDefault
    )}"/>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap(p => p.langs.map(l => entry(p, l))).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap)

// ── RSS ────────────────────────────────────────────────────────────────────

const FEED = {
  en: {
    title: 'craftzman — Blog',
    description:
      'Notes by Rostislav Egorov (craftzman): architecture, Rust and Go, industrial telemetry, AI agents, indie products.',
    file: 'public/rss.xml'
  },
  ru: {
    title: 'craftzman — Блог',
    description:
      'Заметки Ростислава Егорова (craftzman): архитектура, Rust и Go, промышленная телеметрия, ИИ-агенты, свои продукты.',
    file: 'public/ru/rss.xml'
  }
}

const rfc822 = day => new Date(`${day}T00:00:00Z`).toUTCString()

for (const lang of LANGS) {
  const feed = FEED[lang]
  const self = url('/rss.xml', lang)
  const items = postsByLang[lang]
    .map(post => {
      const link = url(`/blog/${post.slug}`, lang)
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
${post.tags.map(tag => `      <category>${escape(tag)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(feed.title)}</title>
    <link>${url('/blog', lang)}</link>
    <description>${escape(feed.description)}</description>
    <language>${lang}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
  const file = path.join(root, feed.file)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, xml)
}

console.log(
  `sitemap.xml: ${pages.reduce((n, p) => n + p.langs.length, 0)} URLs; ` +
    `rss: ${LANGS.map(l => `${l} ${postsByLang[l].length}`).join(', ')} posts`
)
