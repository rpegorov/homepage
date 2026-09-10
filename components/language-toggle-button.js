import { Button, useColorModeValue } from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

const LanguageToggleButton = () => {
  const { lang, setLanguage, t } = useLanguage()
  const nextLang = lang === 'en' ? 'ru' : 'en'
  const ariaLabel =
    nextLang === 'ru'
      ? t('common.langSwitcher.switchToRussian')
      : t('common.langSwitcher.switchToEnglish')

  return (
    <Button
      aria-label={ariaLabel}
      onClick={() => setLanguage(nextLang)}
      variant="outline"
      colorScheme={useColorModeValue('purple', 'orange')}
      minW="44px"
      px={2}
      ml={2}
    >
      {lang.toUpperCase()}
    </Button>
  )
}

export default LanguageToggleButton
