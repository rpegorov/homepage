import NextLink from 'next/link'
import { Box, Container, Heading, SimpleGrid, Link } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { WorkGridItem } from '../../components/grid-item'
import { useLanguage } from '../../lib/i18n'

import thumbCherryBlossoms from '../../public/images/wallpapers/cherry-blossoms/ls-13.jpg'
import thumbMachiya from '../../public/images/wallpapers/machiya/ls-03.jpg'

const Wallpapers = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Wallpaper Packs">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          {t('wallpapersIndex.heading')}
        </Heading>

        <Box my={4}>
          {t('wallpapersIndex.introBefore')}
          <Link as={NextLink} href="https://www.youtube.com/devaslife">
            {t('wallpapersIndex.introLinkText')}
          </Link>
          {t('wallpapersIndex.introAfter')}
        </Box>

        <Section>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <WorkGridItem
              category="wallpapers"
              id="machiya"
              title={t('wallpapersIndex.machiya.title')}
              thumbnail={thumbMachiya}
            >
              {t('wallpapersIndex.machiya.description')}
            </WorkGridItem>
            <WorkGridItem
              category="wallpapers"
              id="cherry-blossoms"
              title={t('wallpapersIndex.cherryBlossoms.title')}
              thumbnail={thumbCherryBlossoms}
            >
              {t('wallpapersIndex.cherryBlossoms.description')}
            </WorkGridItem>
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Wallpapers
