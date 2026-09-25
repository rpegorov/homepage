// Собирает public/sitemap.xml из страниц в pages/: главная, список проектов и
// каждый проект — в английской (корень) и русской (/ru) версиях, с hreflang.
// Запускается перед сборкой (npm run build) и вручную: npm run sitemap.
const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://www.craftzman.ru'
const root = path.join(__dirname, '..')

const works = fs
  .readdirSync(path.join(root, 'pages/works'))
  .filter(f => f.endsWith('.js'))
  .map(f => `/works/${f.replace(/\.js$/, '')}`)
  .sort()

const pages = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/works', changefreq: 'monthly', priority: '0.9' },
  ...works.map(p => ({ path: p, changefreq: 'yearly', priority: '0.7' }))
]

const url = (p, lang) => {
  if (lang === 'ru') return `${SITE_URL}${p === '/' ? '/ru' : `/ru${p}`}`
  return `${SITE_URL}${p}`
}

const entry = (page, lang) => `  <url>
    <loc>${url(page.path, lang)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url(page.path, 'en')}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${url(page.path, 'ru')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(
      page.path,
      'en'
    )}"/>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap(p => [entry(p, 'en'), entry(p, 'ru')]).join('\n')}
</urlset>
`

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${pages.length * 2} URLs`)
