import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react'
import { useRouter } from 'next/router'
import en from './en'
import ru from './ru'

export const STORAGE_KEY = 'craftzman:lang'
export const SUPPORTED_LANGUAGES = ['en', 'ru']

const dictionaries = { en, ru }

function getByPath(dict, path) {
  return path.split('.').reduce((acc, key) => {
    return acc && typeof acc === 'object' ? acc[key] : undefined
  }, dict)
}

function interpolate(str, params) {
  if (typeof str !== 'string' || !params) return str
  return str.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name])
      : match
  )
}

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'en'
  const raw =
    navigator.language || (navigator.languages && navigator.languages[0]) || ''
  return raw.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LANGUAGES.includes(stored)) return stored
  } catch (e) {
    // localStorage may be unavailable (private mode, disabled cookies) — fall
    // back to browser-language detection below.
  }
  return null
}

function storeLanguage(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch (e) {
    // Best-effort persistence only.
  }
}

// Язык задаётся адресом: английская версия живёт в корне (/works/keel),
// русская — под префиксом /ru (/ru/works/keel). У каждой версии свой
// статический HTML, поэтому поисковики видят оба языка без JavaScript, а
// первый рендер в браузере совпадает с разметкой экспорта.
export function langFromPath(path = '/') {
  return path === '/ru' || path.startsWith('/ru/') || path.startsWith('/ru?')
    ? 'ru'
    : 'en'
}

// Путь без языкового префикса, query и hash: '/ru/works?x#y' -> '/works'.
export function stripLang(path = '/') {
  const clean = path.split(/[?#]/)[0] || '/'
  if (clean === '/ru') return '/'
  if (clean.startsWith('/ru/')) return clean.slice(3)
  return clean
}

// Тот же путь в нужном языке: ('/works', 'ru') -> '/ru/works'.
export function localizePath(path, lang) {
  const base = stripLang(path)
  if (lang !== 'ru') return base
  return base === '/' ? '/ru' : `/ru${base}`
}

const LanguageContext = createContext(null)

// languages — на каких языках есть текущая страница (по умолчанию на обоих);
// fallbackPath — куда вести на языке, где её нет. Страница задаёт их через
// pageProps (см. pages/_app.js): так пост блога без перевода не отправляет
// переключатель и авто-переход на несуществующий адрес.
export function LanguageProvider({
  children,
  languages = SUPPORTED_LANGUAGES,
  fallbackPath = '/'
}) {
  const router = useRouter()
  // pathname известен и при статическом экспорте, и в браузере, поэтому язык
  // одинаков в разметке и при гидратации.
  const lang = langFromPath(router.pathname)

  // Посетитель, который пришёл на английский адрес, но раньше выбрал русский
  // (или у него русский браузер и выбора ещё не было), переводится на русскую
  // версию той же страницы. Поисковые роботы заходят без сохранённого выбора
  // и с английской локалью, их это не касается.
  useEffect(() => {
    if (lang !== 'en' || !router.isReady) return
    const preferred = readStoredLanguage() || detectBrowserLanguage()
    if (preferred === 'ru' && languages.includes('ru')) {
      router.replace(localizePath(router.asPath, 'ru'), undefined, {
        scroll: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, router.isReady])

  // При загрузке lang ставит _document; при переходах внутри сайта — здесь.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLanguage = useCallback(
    next => {
      if (!SUPPORTED_LANGUAGES.includes(next)) return
      storeLanguage(next)
      if (next !== lang) {
        const target = languages.includes(next) ? router.asPath : fallbackPath
        router.push(localizePath(target, next), undefined, { scroll: false })
      }
    },
    [lang, router, languages, fallbackPath]
  )

  const localize = useCallback(path => localizePath(path, lang), [lang])

  const t = useCallback(
    (key, params) => {
      const value = getByPath(dictionaries[lang], key)
      if (value !== undefined) return interpolate(value, params)

      const fallback = getByPath(en, key)
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[i18n] Missing "${key}" for language "${lang}"`)
      }
      return interpolate(fallback !== undefined ? fallback : key, params)
    },
    [lang]
  )

  const value = useMemo(
    () => ({ lang, setLanguage, t, localize, languages }),
    [lang, setLanguage, t, localize, languages]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
