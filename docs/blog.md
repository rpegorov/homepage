# Блог: публикация из Drafta

Посты блога craftzman.ru пишутся в Drafta. Заметка публикуется сама, когда
выполнены все четыре условия:

1. **Статус Completed.**
2. **Тег `#projects/craftzman/blog`** — в тексте заметки или в её тегах.
   Остальные заметки проекта (документация и прочее) живут под
   `#projects/craftzman` и не публикуются. Тег drafta.org `#site/blog` сюда
   не публикует; статья для обоих сайтов носит оба тега.
3. **Блок ` ```site `** со `slug` и `description`:

   ````markdown
   ```site
   slug: rust-v-promyshlennosti      # адрес: /ru/blog/rust-v-promyshlennosti
   lang: ru                          # en | ru, по умолчанию en
   description: Почему «Исток» написан на Rust
   date: 2026-10-01                  # по умолчанию — дата создания заметки
   cover: cover.png                  # картинка для превью ссылок, из вложений заметки
   publish: false                    # снять пост с сайта, не меняя статус
   ```
   ````

   Блок общий с drafta.org: если заметка идёт на оба сайта, `slug` и
   `description` одинаковые.
4. **Заметка не в корзине и не шаблон.** Зашифрованные заметки не публикуются.

Снять пост: убрать тег, сменить статус или поставить `publish: false` —
при следующем запуске страница удалится с сайта.

## Что происходит при публикации

- Первая строка `# Заголовок`, блок `site` и теги публикации в конце строк
  вырезаются. Теги поста — все остальные, кроме дерева `projects/craftzman`
  и `site/*`.
- Пост пишется в `src/content/blog/<lang>/<slug>.md`, картинки `attachment://…`
  копируются рядом, в `<slug>/`; Astro сжимает их при сборке и отдаёт набор
  размеров.
- `[[Заголовок заметки]]` становится ссылкой на опубликованный пост того же языка.
- Русский пост получает машинный перевод на английский (`/blog/<slug>`) с
  плашкой «Translated automatically». Английский пост, написанный вручную
  с тем же `slug`, заменяет машинный перевод.
- Коммит уходит в `main`, Cloudflare пересобирает сайт. Sitemap, RSS
  (`/rss.xml`, `/ru/rss.xml`) и картинки превью (`/og/<lang>/<slug>.png`)
  Astro собирает сам.

## Установка на Mac

Publisher — launchd-агент, который следит за библиотекой Drafta и публикует
изменения (запуск при правке заметок, при входе и раз в 30 минут).

```bash
git clone git@github.com:rpegorov/homepage.git && cd homepage
npm ci
npm run publisher:install              # ключ AI берётся из Drafta
npm run publisher:install -- --own-ai-key   # или отдельный ключ для publisher'а
```

- Он живёт рядом с publisher'ом drafta.org и не мешает ему: свои метка
  (`ru.craftzman.site-publisher`), клон (`~/Library/Application Support/Drafta/craftzman-site-publisher`)
  и лог (`~/Library/Logs/craftzman-site-publisher.log`).
- Ключ AI: сначала свой (`--own-ai-key`), потом ключ publisher'а drafta.org,
  потом ключ из настроек Drafta. Без ключа посты публикуются без перевода.
- Удалить: `npm run publisher:uninstall`.

Вручную, без агента:

```bash
npm run import:drafta                  # что будет опубликовано (ничего не меняет)
npm run import:drafta -- --commit      # записать и закоммитить
```

## Код

Экспортёр, переводчик и publisher перенесены из drafta-homepage
(ветка `site-publisher-test`). Всё, чем craftzman.ru отличается от drafta.org, —
в `scripts/site.config.mjs`. Сайт читает посты как коллекцию Astro
(`src/content.config.ts`); `tests/frontmatter-contract.spec.mjs` проверяет, что
вывод экспортёра проходит её схему. Тесты: `npm test`.
