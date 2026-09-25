import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Токены брендбука craftzman: тема Paper (светлая) и Sumi (тёмная).
// Имена совпадают с tokens.json дизайн-системы, чтобы их было легко сверять.
const semanticTokens = {
  colors: {
    bg: { default: '#fbf7f0', _dark: '#1b1916' },
    'bg-soft': { default: '#f4ede2', _dark: '#221f1a' },
    'bg-deep': { default: '#eadfcf', _dark: '#2b2722' },
    surface: { default: '#ffffff', _dark: '#26231e' },
    band: { default: '#17140f', _dark: '#f4ede2' },
    'band-text': { default: '#f6f1e8', _dark: '#1c1a17' },
    'band-muted': { default: '#a9a093', _dark: '#6e6559' },
    border: { default: '#1c181419', _dark: '#f6f1e81f' },
    'border-strong': { default: '#1c18142e', _dark: '#f6f1e838' },
    ink: { default: '#1c1a17', _dark: '#f3ede3' },
    'ink-soft': { default: '#4a443b', _dark: '#cfc6b8' },
    muted: { default: '#6e6559', _dark: '#a79e92' },
    accent: { default: '#1b6d6a', _dark: '#7fcbc8' },
    'accent-hover': { default: '#145654', _dark: '#9bdad7' },
    'accent-soft': { default: '#1b6d6a1a', _dark: '#7fcbc824' },
    'accent-glow': { default: '#88ccca', _dark: '#88ccca' },
    'on-accent': { default: '#ffffff', _dark: '#1b1916' },
    seal: { default: '#b8402e', _dark: '#e06a55' },
    'seal-soft': { default: '#b8402e14', _dark: '#e06a5524' },
    ok: { default: '#2f7d53', _dark: '#6fbf8c' },
    'ok-soft': { default: '#2f7d5318', _dark: '#6fbf8c24' },
    'chakra-body-bg': { default: '#fbf7f0', _dark: '#1b1916' },
    'chakra-body-text': { default: '#1c1a17', _dark: '#f3ede3' },
    'chakra-border-color': { default: '#1c181419', _dark: '#f6f1e81f' }
  },
  shadows: {
    'shadow-md': {
      default: '0 2px 6px rgba(28,24,20,0.05), 0 18px 40px rgba(28,24,20,0.09)',
      _dark: '0 2px 6px rgba(0,0,0,0.30), 0 18px 40px rgba(0,0,0,0.35)'
    },
    'shadow-glass': {
      default: '0 1px 0 rgba(255,255,255,0.6) inset',
      _dark: '0 1px 0 rgba(255,255,255,0.06) inset'
    }
  }
}

const styles = {
  global: props => ({
    body: {
      bg: 'bg',
      color: 'ink',
      fontSize: '17px',
      lineHeight: 1.65
    },
    '::selection': {
      background: mode('#1b6d6a1a', '#7fcbc824')(props)
    }
  })
}

// colorScheme="teal" по всему сайту — это цвет действия `accent`.
// Палитра подогнана так, что штатные варианты Chakra попадают в токены:
// solid light = 500/600, solid dark = 200/300, ghost light = 600 на 50.
const colors = {
  teal: {
    50: '#e8f1f0',
    100: '#c6dedd',
    200: '#7fcbc8',
    300: '#9bdad7',
    400: '#4c9c99',
    500: '#1b6d6a',
    600: '#145654',
    700: '#104644',
    800: '#0c3533',
    900: '#082423'
  },
  grassTeal: '#88ccca'
}

const components = {
  Heading: {
    baseStyle: {
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    variants: {
      'page-title': {
        fontSize: { base: '40px', md: '56px' },
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        marginBottom: 4
      },
      'section-title': {
        fontSize: '24px',
        lineHeight: 1.2,
        textDecoration: 'underline',
        textUnderlineOffset: 6,
        textDecorationColor: '#88ccca',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: {
      color: 'accent',
      textUnderlineOffset: 3,
      _hover: { color: 'accent-hover' }
    }
  },
  Button: {
    baseStyle: {
      borderRadius: '12px',
      fontWeight: 600
    }
  },
  Badge: {
    baseStyle: {
      fontFamily: 'mono',
      borderRadius: '8px',
      px: 2
    }
  }
}

const fonts = {
  heading: '"Lora", Georgia, "Times New Roman", serif',
  body: '"Golos Text", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({
  config,
  styles,
  components,
  fonts,
  colors,
  semanticTokens
})
export default theme
