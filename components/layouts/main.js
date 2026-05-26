import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelLoader from '../voxel-loader'

const LazyVoxelDog = dynamic(() => import('../voxel'), {
  ssr: false,
  loading: () => <VoxelLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Персональный сайт Ростислава Егорова (craftzman) — backend-разработчик, фотограф, путешественник. Портфолио проектов, обои, статьи и контакты."
        />
        <meta
          name="keywords"
          content="Ростислав Егоров, Rostislav Egorov, craftzman, w1shmaster, backend разработчик, Java разработчик, портфолио, личный сайт, homepage, фотограф, кемпинг, ROSTCAMP, веб-разработка, программист, IT-портфолио, обои, wallpapers"
        />
        <meta name="author" content="Rostislav Egorov" />
        <meta name="author" content="craftzman" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="language" content="Russian" />
        <meta httpEquiv="content-language" content="ru" />
        <link rel="canonical" href="https://www.craftzman.ru/" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        <meta property="og:site_name" content="Rostislav homepage" />
        <meta property="og:title" content="Rostislav Egorov — Homepage" />
        <meta
          property="og:description"
          content="Персональный сайт Ростислава Егорова (craftzman) — backend-разработчик, фотограф, путешественник. Портфолио проектов, обои, статьи и контакты."
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
          content="Персональный сайт Ростислава Егорова (craftzman) — backend-разработчик, фотограф, путешественник."
        />
        <meta
          name="twitter:image"
          content="https://www.craftzman.ru/lostProgrammer.png"
        />
        <title>Rostislav Egorov - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelDog />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
