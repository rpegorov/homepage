/* craftzman — тема до первой отрисовки. Страница приходит с data-theme="paper";
   сохранённый выбор (кнопка в шапке) важнее системной темы, без выбора сайт
   следует системе и её смене. Отдельный файл, а не inline-скрипт: так его
   пропустит CSP script-src 'self'. */
(function () {
  'use strict';
  var KEY = 'craftzman:theme';
  var query = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply() {
    var choice = stored();
    var dark = choice ? choice === 'sumi' : Boolean(query && query.matches);
    document.documentElement.setAttribute('data-theme', dark ? 'sumi' : 'paper');
  }
  apply();
  if (query && typeof query.addEventListener === 'function') query.addEventListener('change', apply);
})();
