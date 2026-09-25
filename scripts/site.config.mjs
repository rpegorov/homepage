// Всё, чем публикация из Drafta на craftzman.ru отличается от drafta.org.
// Код экспортёра, переводчика и publisher'а перенесён из drafta-homepage
// (ветка site-publisher-test) и берёт отсюда адрес сайта, тег, пути и имена,
// поэтому обе площадки могут читать одну библиотеку Drafta и не мешать друг другу.

export const SITE_URL = 'https://www.craftzman.ru';

// Заметка уходит в блог по полному пути тега. Заметки проекта craftzman живут
// под `#projects/craftzman` (документация и прочее), статьи блога — под
// `#projects/craftzman/blog`. drafta.org публикует `#site/blog`: статья для
// обоих сайтов носит оба тега.
export const SECTION_TAGS = Object.freeze({ blog: 'projects/craftzman/blog' });

// Служебные теги не становятся тегами поста: всё дерево проекта и теги
// публикации drafta.org. Теги публикации ещё и вырезаются из конца строк текста.
export const PUBLISH_TAG_ROOTS = Object.freeze(['projects/craftzman', 'site']);
export const PUBLISH_TAGS = Object.freeze(['projects/craftzman/blog', 'site/blog', 'site/docs']);

// Русские оригиналы получают машинный английский перевод, английские — нет.
export const TRANSLATION_DIRECTIONS = Object.freeze({ ru: 'en' });

// Markdown постов: коллекция `blog` Astro (src/content.config.ts).
export const SECTION_DIRS = Object.freeze({
  blog: { en: 'src/content/blog/en', ru: 'src/content/blog/ru' },
});

/** URL-путь страницы: английская версия в корне, русская под /ru, без слэша в конце. */
export function sitePathOf(section, lang, slug) {
  return `${lang === 'ru' ? '/ru' : ''}/${section}/${slug}`;
}

/**
 * Папка вложений поста и ссылка на неё из текста. Вложения лежат рядом с
 * Markdown (`<slug>/`), ссылка относительная — Astro оптимизирует картинки при
 * сборке, а удаление поста удаляет и папку.
 */
export function assetLocation(section, lang, slug) {
  return {
    assetDir: `${SECTION_DIRS[section][lang]}/${slug}`,
    assetUrl: `./${slug}`,
  };
}

// launchd-агент и его файлы: свои, чтобы жить рядом с publisher'ом drafta.org.
export const PUBLISHER = Object.freeze({
  label: 'ru.craftzman.site-publisher',
  // ~/Library/Application Support/Drafta/<dir>
  dir: 'craftzman-site-publisher',
  log: 'craftzman-site-publisher.log',
  // Отдельный ключ AI (`install --own-ai-key`); если его нет, берётся ключ
  // publisher'а drafta.org, затем ключ самого приложения Drafta.
  ownKeyService: 'ru.craftzman.site-publisher',
  fallbackKeyServices: ['org.drafta.site-publisher'],
  notifyTitle: 'craftzman.ru',
});
