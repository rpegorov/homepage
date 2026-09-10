import { Box } from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

const Footer = () => {
  const { t } = useLanguage()
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      {t('common.footer.copyright', { year: new Date().getFullYear() })}
    </Box>
  )
}

export default Footer
