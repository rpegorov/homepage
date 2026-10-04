# craftzman.ru

Персональный сайт Ростислава Егорова (craftzman): проекты, биография, блог.
Английская версия в корне, русская под `/ru`.

## Стек

- [Astro](https://astro.build/) — статическая сборка в `dist/`, Cloudflare отдаёт
  её как статические файлы (`wrangler.jsonc`).
- Токены бренда — `src/styles/tokens.css` (брендбук craftzman, общий с drafta.org).
- [three.js](https://threejs.org/) — 3D-сцена на главной, грузится только там.

## Команды

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # dist/
npm run check     # типы
npm test          # публикация из Drafta
```

## TLS certificate (nginx / Docker)

The nginx setup in `docker-compose.yml` and `docker-compose.nginx.yml` mounts
`.certs/craftzman.ru.crt` (full chain) and `.certs/craftzman.ru.key` (private key)
into the container. Both files are git-ignored and must be placed on the server
by hand, outside version control (for example with `scp`, mode `600` for the key).
Issue the certificate with the key generated on the server, or via the certbot
service in `docker-compose.nginx.yml`; do not commit either file. `.env` is local
as well and is not tracked.

## Блог

Посты публикуются из Drafta по тегу `#projects/craftzman/blog` — см. [docs/blog.md](docs/blog.md).

## Структура

```
src/
  pages/          маршруты; русские версии — в pages/ru/
  components/     страницы и части (home/, works/, blog/)
  layouts/Base.astro   <head>, шапка, подвал
  content/blog/   посты (пишет publisher из Drafta)
  data/works.ts   проекты: структура; тексты — в i18n/
  i18n/           словари en/ru
  assets/         картинки, которые Astro оптимизирует
scripts/          экспортёр и publisher Drafta → блог
```
