import Link from 'next/link'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { useLanguage } from '../lib/i18n'

// Lockup бренда: печать 匠 + словесный знак craftzman. Высота 24px,
// в тёмной теме — версия -dark. Текстовое имя рядом не ставится: оно в hero.
const Logo = () => {
  const { localize } = useLanguage()
  const src = useColorModeValue(
    '/brand/cz-lockup.svg',
    '/brand/cz-lockup-dark.svg'
  )
  return (
    <Link href={localize('/')} scroll={false} aria-label="craftzman">
      <Box as="span" display="inline-flex" alignItems="center" h="56px">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="craftzman" height={24} style={{ height: 24 }} />
      </Box>
    </Link>
  )
}

export default Logo
