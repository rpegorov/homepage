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
        <meta name="description" content="Rostislav homepage" />
        <meta name="author" content="Rostislav Egorov" />
        <meta name="author" content="craftzman" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        <meta property="og:site_name" content="Rostislav homepage" />
        <meta name="og:title" content="Rostislav homepage" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
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
