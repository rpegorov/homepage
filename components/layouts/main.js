import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { useLanguage } from '../../lib/i18n'
import { absoluteUrl, OG_IMAGE } from '../../lib/seo'

const Main = ({ children, router }) => {
  const { t, lang } = useLanguage()
  const path = router.asPath
  const canonical = absoluteUrl(path, lang)
  // У страницы 404 нет адреса, на который стоит ссылаться поисковикам.
  const indexable = router.pathname !== '/404'
  const title = t('seo.homeTitle')
  const description = t('seo.homeDescription')

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title key="title">{title}</title>
        <meta name="description" content={description} key="description" />
        <meta
          name="keywords"
          content="Ростислав Егоров, Rostislav Egorov, craftzman, w1shmaster, архитектор, техлид, backend разработчик, Rust, Go, Java, IIoT, промышленная телеметрия, Русло, Keel, Drafta, портфолио, ROSTCAMP"
        />
        <meta name="author" content="craftzman (Rostislav Egorov)" />
        <meta name="robots" content="index, follow" key="robots" />
        {indexable && <link rel="canonical" href={canonical} key="canonical" />}
        {indexable && (
          <link rel="alternate" hrefLang="en" href={absoluteUrl(path, 'en')} />
        )}
        {indexable && (
          <link rel="alternate" hrefLang="ru" href={absoluteUrl(path, 'ru')} />
        )}
        {indexable && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={absoluteUrl(path, 'en')}
          />
        )}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
        <meta
          name="theme-color"
          content="#fbf7f0"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1b1916"
          media="(prefers-color-scheme: dark)"
        />

        <meta property="og:site_name" content={t('seo.siteName')} />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={t('seo.locale')} />
        <meta
          property="og:locale:alternate"
          content={lang === 'ru' ? 'en_US' : 'ru_RU'}
        />
        <meta property="og:url" content={canonical} key="og:url" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt="72px">
        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
