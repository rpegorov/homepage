// craftzman.ru — полностью статический сайт на Astro, отдаётся Cloudflare как
// статические файлы Workers (wrangler.jsonc → dist/).
//
// Адреса без завершающего слэша, как на прежнем сайте (/works/keel,
// /ru/blog/mcp-server): build.format 'file' кладёт страницу в works/keel.html,
// а Cloudflare отдаёт её по /works/keel. Английская версия в корне, русская
// под /ru.
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { remarkCallouts } from './src/lib/remark-callouts.mjs';

export default defineConfig({
  site: 'https://www.craftzman.ru',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  image: {
    // Картинки постов (скриншоты по 2400 px) отдаются набором размеров:
    // браузер берёт тот, что подходит колонке текста 736 px и плотности экрана.
    layout: 'constrained',
    responsiveStyles: true,
    // Самый крупный вариант — две ширины колонки (Retina); больше колонке не нужно.
    breakpoints: [480, 640, 750, 828, 1080, 1280, 1472],
  },
  markdown: {
    // unified/remark вместо процессора по умолчанию: нужны свои remark-плагины
    // (callouts `> [!NOTE]`, как на drafta.org).
    processor: unified({
      remarkPlugins: [remarkCallouts],
    }),
    // Цвета подсветки кода — CSS-переменные, их задаёт src/styles/site.css из
    // токенов syn-* брендбука, так что код сам следует теме paper/sumi.
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru' },
      },
    }),
  ],
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
