/* Поведение на каждой странице (Base.astro): тема, язык, мобильное меню.
   Текст страниц не переписывается: перевод — отдельные файлы под /ru. */
import { isRuPath, localePath, stripLang } from '../lib/lang';

const THEME_KEY = 'craftzman:theme';
const LANG_KEY = 'craftzman:lang';

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* приватный режим: выбор просто не запомнится */ }
}

// Тема: кнопка переключает paper ↔ sumi и запоминает выбор (public/theme-init.js читает его).
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'sumi' ? 'paper' : 'sumi';
    document.documentElement.setAttribute('data-theme', next);
    write(THEME_KEY, next);
  });
});

// Язык: явный выбор в переключателе запоминается.
document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[data-lang]');
  const value = link?.getAttribute('data-lang');
  if (value) write(LANG_KEY, value);
});

// Русский браузер без сделанного выбора с английской страницы уходит на её
// русскую версию, если она есть (у поста без перевода её нет — нет hreflang="ru").
// Поисковые роботы приходят без выбора и с английской локалью.
(function redirectToRussian() {
  if (isRuPath(location.pathname) || read(LANG_KEY)) return;
  const preferred = String((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
  if (!preferred.startsWith('ru')) return;
  if (!document.querySelector('link[rel="alternate"][hreflang="ru"]')) return;
  location.replace(localePath(stripLang(location.pathname), 'ru') + location.search + location.hash);
})();

// Мобильное меню: одна кнопка раскрывает пункты навигации.
const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
const links = document.querySelector<HTMLElement>('.nav__links');
if (toggle && links) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('nav__links--open', open);
  });
}
