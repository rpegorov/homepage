/* Языковые правила сайта, общие для сборки и браузера. Английская версия в
   корне, русская под /ru; адреса без завершающего слэша. Чистые функции. */

export type Lang = 'en' | 'ru';
export const LANGS: Lang[] = ['en', 'ru'];

export function isRuPath(pathname: string): boolean {
  return /^\/ru(\/|$)/.test(pathname);
}

export function langOfPath(pathname: string): Lang {
  return isRuPath(pathname) ? 'ru' : 'en';
}

/** '/ru/works/keel' → '/works/keel', '/ru' → '/'. */
export function stripLang(pathname: string): string {
  if (!isRuPath(pathname)) return pathname || '/';
  const rest = pathname.slice(3);
  return rest === '' ? '/' : rest;
}

/** Английский путь в нужном языке: ('/works', 'ru') → '/ru/works', ('/', 'ru') → '/ru'. */
export function localePath(enPath: string, lang: Lang): string {
  if (lang !== 'ru') return enPath;
  return enPath === '/' ? '/ru' : `/ru${enPath}`;
}

/** Обе версии страницы по любой из них. */
export function localePaths(pathname: string): Record<Lang, string> {
  const en = stripLang(pathname);
  return { en, ru: localePath(en, 'ru') };
}
