import { Button } from '@chakra-ui/react'
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
      size="sm"
      h="36px"
      minW="44px"
      px={2}
      ml={2}
      borderRadius="full"
      bg="surface"
      borderColor="border-strong"
      color="ink"
      fontFamily="mono"
      fontSize="13px"
      _hover={{ bg: 'accent-soft', color: 'accent-hover' }}
    >
      {lang.toUpperCase()}
    </Button>
  )
}

export default LanguageToggleButton
