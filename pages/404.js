import NextLink from 'next/link'
import Head from 'next/head'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

const NotFound = () => {
  const { t, localize } = useLanguage()
  return (
    <Container>
      <Head>
        <meta name="robots" content="noindex, follow" key="robots" />
        <title key="title">{t('notFound.title')}</title>
      </Head>
      <Heading as="h1">{t('notFound.title')}</Heading>
      <Text>{t('notFound.body')}</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href={localize('/')} colorScheme="teal">
          {t('notFound.button')}
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
