import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbAtomMinde from '../public/images/works/atom_minde.png'
import thumbFlame from '../public/images/works/flame_title.png'
import thumbTezish from '../public/images/works/tezish_title.png'
import thumbHrCrm from '../public/images/works/crm_title.png'
import thumbFrontiers from '../public/images/works/frontiers_title.png'
import thumbEtalon from '../public/images/works/etalon_title.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="atomMinde"
            title="AtomMinde"
            thumbnail={thumbAtomMinde}
          >
            The Atommind industrial digitalization platform offers optimal
            parameters and operating modes of equipment to reduce the proportion
            of finished products that do not meet established standards, as well
            as visualizes the production process and notifies users of parameter
            deviations.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="flameApp" title="FlameApp" thumbnail={thumbFlame}>
            A mobile dating app. A quick search for a partner of interest using
            artificial intelligence to verify identity and filter fake photos.
          </WorkGridItem>
        </Section>

        <Section delay={0.1}>
          <WorkGridItem
            id="tezishApp"
            title="Tezish App"
            thumbnail={thumbTezish}
          >
            A mobile application for quick job search for low-skilled employees.
            Search for employees.
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem id="hr-crm" thumbnail={thumbHrCrm} title="HrCrm">
            The system for personnel management of the enterprise.
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem
            id="frontiers"
            thumbnail={thumbFrontiers}
            title="Frontiers"
          >
            A system for law enforcement agencies of the city of Moscow.
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem id="etalon" thumbnail={thumbEtalon} title="Etalon">
            Website business card of the evaluation organization.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSgetStaticPropsideProps } from '../components/chakra'
