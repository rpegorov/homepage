import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
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

// Server/static-export render always resolves to 'en' (no window/navigator),
// which is also the shipped default for anyone with JS disabled. In the
// browser it resolves the visitor's saved choice, else their browser locale.
function resolveInitialLanguage() {
  if (typeof window === 'undefined') return 'en'
  return readStoredLanguage() || detectBrowserLanguage()
}

const LanguageContext = createContext(null)

// В браузере эффект перед отрисовкой, на сервере — обычный: useLayoutEffect в
// серверном рендере предупреждает, а выполниться всё равно не может.
const useBeforePaintEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

// Первый рендер в браузере ОБЯЗАН совпасть с разметкой статического экспорта, а
// она собрана по-английски: в Node нет ни localStorage, ни navigator. Поэтому
// язык посетителя применяется не в инициализаторе состояния, а эффектом.
// Разрешить его прямо при первом рендере — значит отдать разметку, отличную от
// серверной: в разработке это предупреждение, а в продакшене React считает
// расхождение ошибкой гидратации, выбрасывает готовое дерево и перерисовывает
// страницу целиком (ошибки #418/#423/#425 в консоли).
//
// useLayoutEffect выполняется после коммита гидратации, но ДО отрисовки кадра,
// поэтому в обычном случае английский текст не успевает мелькнуть.
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en')

  useBeforePaintEffect(() => {
    const resolved = resolveInitialLanguage()
    if (resolved !== 'en') setLangState(resolved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLanguage = useCallback(next => {
    if (!SUPPORTED_LANGUAGES.includes(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch (e) {
      // Best-effort persistence only — an in-memory switch still works for
      // the rest of the session even if storage is blocked.
    }
  }, [])

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
    () => ({ lang, setLanguage, t }),
    [lang, setLanguage, t]
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
