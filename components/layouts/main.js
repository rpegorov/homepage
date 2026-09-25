import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Ростислав Егоров (craftzman) — архитектор и техлид. Строю системы, которые держат нагрузку: промышленная телеметрия, CRM, инфраструктура для ИИ-агентов."
        />
        <meta
          name="keywords"
          content="Ростислав Егоров, Rostislav Egorov, craftzman, w1shmaster, backend разработчик, Java разработчик, портфолио, личный сайт, homepage, фотограф, кемпинг, ROSTCAMP, веб-разработка, программист, IT-портфолио, обои, wallpapers"
        />
        <meta name="author" content="craftzman (Rostislav Egorov)" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="language" content="Russian" />
        <meta httpEquiv="content-language" content="ru" />
        <link rel="canonical" href="https://www.craftzman.ru/" />
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

        <meta property="og:site_name" content="Rostislav homepage" />
        <meta property="og:title" content="Rostislav Egorov — Homepage" />
        <meta
          property="og:description"
          content="Ростислав Егоров (craftzman) — архитектор и техлид. Строю системы, которые держат нагрузку: промышленная телеметрия, CRM, инфраструктура для ИИ-агентов."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:url" content="https://www.craftzman.ru/" />
        <meta
          property="og:image"
          content="https://www.craftzman.ru/lostProgrammer.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rostislav Egorov — Homepage" />
        <meta
          name="twitter:description"
          content="Ростислав Егоров (craftzman) — строю системы, которые держат нагрузку."
        />
        <meta
          name="twitter:image"
          content="https://www.craftzman.ru/lostProgrammer.png"
        />
        <title>Rostislav Egorov - Homepage</title>
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
