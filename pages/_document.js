import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

export default class Document extends NextDocument {
  render() {
    // Русская версия сайта — страницы под /ru (см. lib/i18n).
    const page = this.props.__NEXT_DATA__?.page || '/'
    const lang = page === '/ru' || page.startsWith('/ru/') ? 'ru' : 'en'
    return (
      <Html lang={lang}>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
