import { Box } from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

const Footer = () => {
  const { t } = useLanguage()
  return (
    <Box align="center" color="muted" fontSize="13px" mt={8}>
      {t('common.footer.copyright', { year: new Date().getFullYear() })}
    </Box>
  )
}

export default Footer
