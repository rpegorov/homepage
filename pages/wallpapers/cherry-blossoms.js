import {
  Container,
  Heading,
  AspectRatio,
  Box,
  useColorModeValue
} from '@chakra-ui/react'
import { Title, LegalLinks } from '../../components/wallpaper'
import { BuyButton } from '../../components/payhip'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import WallpaperThumbnailList from '../../components/wallpaper-thumbnail-list'
import { useLanguage } from '../../lib/i18n'

const Wallpaper = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Cherry blossom view and coding">
      <Container>
        <Title>{t('wallpaperDetail.cherryBlossoms.title')}</Title>
        <P>{t('wallpaperDetail.cherryBlossoms.p1')}</P>

        <Box
          align="center"
          my={4}
          p={4}
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        >
          <Box mb={4}>
            <em>{t('wallpaperDetail.common.buyNote')}</em>
          </Box>
          <BuyButton productId="65jPS" price={19} />
        </Box>

        <AspectRatio maxW="640px" ratio={1.7} my={4}>
          <iframe
            src="https://www.youtube.com/embed/UNGi144eVbI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </AspectRatio>

        <P>{t('wallpaperDetail.common.formatsInfo')}</P>

        <Heading as="h2" fontSize={20} my={4}>
          {t('wallpaperDetail.cherryBlossoms.landscapeHeading')}
        </Heading>
        <WallpaperThumbnailList
          numOfImages={14}
          urlForImage={i =>
            `/images/wallpapers/cherry-blossoms/ls-${String(i).padStart(
              2,
              '0'
            )}.jpg`
          }
          alt={t('wallpaperDetail.common.altLandscape')}
        />

        <Heading as="h2" fontSize={20} my={4}>
          {t('wallpaperDetail.cherryBlossoms.fromVideoHeading')}
        </Heading>
        <WallpaperThumbnailList
          numOfImages={14}
          urlForImage={i =>
            `/images/wallpapers/cherry-blossoms/v-${String(i).padStart(
              2,
              '0'
            )}.jpg`
          }
          alt={t('wallpaperDetail.common.altFromVideo')}
        />

        <Heading as="h2" fontSize={20} my={4}>
          {t('wallpaperDetail.cherryBlossoms.portraitHeading')}
        </Heading>
        <WallpaperThumbnailList
          numOfImages={7}
          urlForImage={i =>
            `/images/wallpapers/cherry-blossoms/pl-${String(i).padStart(
              2,
              '0'
            )}.jpg`
          }
          alt={t('wallpaperDetail.common.altPortrait')}
        />

        <LegalLinks />
      </Container>
    </Layout>
  )
}

export default Wallpaper
