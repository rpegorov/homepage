import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import { useLanguage } from '../lib/i18n'

import thumbAtomMind from '../public/images/works/atom_minde.png'
import thumbFlame from '../public/images/works/flame_title.jpg'
import thumbTezish from '../public/images/works/tezish_title.jpg'
import thumbHrCrm from '../public/images/works/crm_title.jpg'
import thumbFrontiers from '../public/images/works/frontiers_title.jpg'
import thumbEtalon from '../public/images/works/etalon_title.jpg'
import thumbDrafta from '../public/images/works/drafta_title.png'
import thumbInfodiode from '../public/images/works/infodiode_title.png'
import thumbEcho from '../public/images/works/echo_title.png'
import thumbHelm from '../public/images/works/helm 00.png'
// TODO: превью Keel — заменить на реальный скриншот, когда он будет готов.
// Пока нейтральная плитка, а не чужой экран: скриншот другого продукта под
// именем этого вводит в заблуждение сильнее, чем пустое место.
import thumbKeel from '../public/images/works/keel_title.png'
// TODO: превью Ruslo — заменить на реальный скриншот, когда он будет готов
import thumbRuslo from '../public/images/works/ruslo_title.png'

const Works = () => {
  const { t } = useLanguage()
  const items = t('works.items')

  return (
    <Layout title="Works">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          {t('works.heading')}
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem
              id="atomMind"
              title={items.atomMind.title}
              thumbnail={thumbAtomMind}
            >
              {items.atomMind.description}
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="flameApp"
              title={items.flameApp.title}
              thumbnail={thumbFlame}
            >
              {items.flameApp.description}
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem
              id="tezishApp"
              title={items.tezishApp.title}
              thumbnail={thumbTezish}
            >
              {items.tezishApp.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.1}>
            <WorkGridItem
              id="hr-crm"
              thumbnail={thumbHrCrm}
              title={items.hrCrm.title}
            >
              {items.hrCrm.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.1}>
            <WorkGridItem
              id="frontiers"
              thumbnail={thumbFrontiers}
              title={items.frontiers.title}
            >
              {items.frontiers.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.1}>
            <WorkGridItem
              id="etalon"
              thumbnail={thumbEtalon}
              title={items.etalon.title}
            >
              {items.etalon.description}
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Divider my={6} />

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={0.2}>
            <WorkGridItem
              id="drafta"
              thumbnail={thumbDrafta}
              title={items.drafta.title}
            >
              {items.drafta.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.2}>
            <WorkGridItem
              id="infodiode"
              thumbnail={thumbInfodiode}
              title={items.infodiode.title}
            >
              {items.infodiode.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.2}>
            <WorkGridItem
              id="keel"
              thumbnail={thumbKeel}
              title={items.keel.title}
            >
              {items.keel.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.2}>
            <WorkGridItem
              id="ruslo"
              thumbnail={thumbRuslo}
              title={items.ruslo.title}
            >
              {items.ruslo.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.2}>
            <WorkGridItem
              id="echo"
              thumbnail={thumbEcho}
              title={items.echo.title}
            >
              {items.echo.description}
            </WorkGridItem>
          </Section>
          <Section delay={0.2}>
            <WorkGridItem
              id="helm"
              thumbnail={thumbHelm}
              title={items.helm.title}
            >
              {items.helm.description}
            </WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Works
