/* Словари сайта: src/i18n/en.js и ru.js с одинаковой формой ключей.
   t(lang, 'home.bio.heading') — строка, массив или объект по пути;
   {{name}} в строке подставляется из params. */
import en from './en.js';
import ru from './ru.js';
import type { Lang } from '../lib/lang';

const dictionaries: Record<Lang, unknown> = { en, ru };

function getByPath(dict: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>(
    (acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined),
    dict,
  );
}

export function t<T = string>(lang: Lang, key: string, params?: Record<string, string | number>): T {
  const value = getByPath(dictionaries[lang], key) ?? getByPath(en, key);
  if (value === undefined) throw new Error(`i18n: no "${key}" for ${lang}`);
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (m, name) => (name in params ? String(params[name]) : m)) as T;
  }
  return value as T;
}
