import { localizePath, stripLang } from './i18n'

export const SITE_URL = 'https://www.craftzman.ru'
export const OG_IMAGE = `${SITE_URL}/lostProgrammer.png`

// Абсолютный адрес страницы на нужном языке: ('/ru/works?x', 'en') ->
// 'https://www.craftzman.ru/works'. Корень — без завершающего слэша у /ru.
export function absoluteUrl(path, lang) {
  const localized = localizePath(stripLang(path), lang)
  return localized === '/' ? `${SITE_URL}/` : `${SITE_URL}${localized}`
}
