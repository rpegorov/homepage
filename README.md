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
