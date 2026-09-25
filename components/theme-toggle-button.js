import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useLanguage } from '../lib/i18n'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const { t } = useLanguage()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label={t('common.themeToggle.ariaLabel')}
          variant="outline"
          size="sm"
          w="36px"
          h="36px"
          borderRadius="full"
          bg="surface"
          borderColor="border-strong"
          color="ink"
          _hover={{ bg: 'accent-soft', color: 'accent-hover' }}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
