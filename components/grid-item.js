import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useLanguage } from '../lib/i18n'

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

// Карточка проекта по брендбуку: surface, граница border, radius-lg 20px,
// padding 24px; hover — shadow-md и border-strong.
const cardStyle = {
  bg: 'surface',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '20px',
  p: 5,
  h: '100%',
  transition: 'box-shadow 200ms ease, border-color 200ms ease',
  _hover: { boxShadow: 'shadow-md', borderColor: 'border-strong' }
}

export const WorkGridItem = ({
  children,
  category = 'works',
  id,
  title,
  thumbnail
}) => {
  const { localize } = useLanguage()
  const href = localize(`/${category}/${id}`)
  return (
    <Box w="100%" {...cardStyle}>
      <LinkBox as={NextLink} href={href} scroll={false} cursor="pointer">
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
        />
        <LinkOverlay as="div" href={href}>
          <Text mt={4} fontSize="20px" lineHeight={1.3} fontWeight={600}>
            {title}
          </Text>
        </LinkOverlay>
        <Text mt={1} fontSize="15px" lineHeight={1.55} color="ink-soft">
          {children}
        </Text>
      </LinkBox>
    </Box>
  )
}

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
        width: 100%;
        height: auto;
      }
    `}
  />
)
