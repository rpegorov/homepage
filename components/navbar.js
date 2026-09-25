import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import LanguageToggleButton from './language-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'
import { useLanguage } from '../lib/i18n'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href || path.startsWith(`${href}/`)
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      px={4}
      py={3}
      fontSize="15px"
      fontWeight={600}
      lineHeight={1}
      borderRadius="8px"
      color={active ? 'accent' : 'ink'}
      boxShadow={
        active ? 'inset 0 -2px 0 var(--chakra-colors-accent)' : undefined
      }
      _hover={{
        bg: 'accent-soft',
        color: 'accent-hover',
        textDecoration: 'none'
      }}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))
// forwardRef скрывает имя компонента от React DevTools и от eslint-plugin-react;
// задаётся явно.
MenuLink.displayName = 'MenuLink'

const Navbar = props => {
  const { path } = props
  const { t, localize } = useLanguage()

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      h="56px"
      bg={useColorModeValue('#fbf7f080', '#1b191680')}
      borderBottom="1px solid"
      borderColor="border"
      boxShadow="shadow-glass"
      css={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        h="56px"
        px={4}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href={localize('/works')} path={path}>
            {t('common.nav.works')}
          </LinkItem>
          <LinkItem href={localize('/blog')} path={path}>
            {t('common.nav.blog')}
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/rpegorov"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            {t('common.nav.source')}
          </LinkItem>
        </Stack>

        <Flex flex={1} align="center" justify="flex-end">
          <ThemeToggleButton />
          <LanguageToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label={t('common.nav.optionsAria')}
              />
              <MenuList>
                <MenuItem as={MenuLink} href={localize('/')}>
                  {t('common.nav.about')}
                </MenuItem>
                <MenuItem as={MenuLink} href={localize('/works')}>
                  {t('common.nav.works')}
                </MenuItem>
                <MenuItem as={MenuLink} href={localize('/blog')}>
                  {t('common.nav.blog')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://github.com/craftzdog/craftzdog-homepage"
                >
                  {t('common.nav.viewSource')}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
