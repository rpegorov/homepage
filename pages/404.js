import NextLink from 'next/link'
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
  const { t } = useLanguage()
  return (
    <Container>
      <Heading as="h1">{t('notFound.title')}</Heading>
      <Text>{t('notFound.body')}</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href="/" colorScheme="teal">
          {t('notFound.button')}
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
