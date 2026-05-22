import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbAtomMind from '../public/images/works/atom_minde.png'
import thumbFlame from '../public/images/works/flame_title.png'
import thumbTezish from '../public/images/works/tezish_title.png'
import thumbHrCrm from '../public/images/works/crm_title.png'
import thumbFrontiers from '../public/images/works/frontiers_title.png'
import thumbEtalon from '../public/images/works/etalon_title.png'
import thumbDrafta from '../public/images/works/drafta_title.png'
import thumbInfodiode from '../public/images/works/infodiode_title.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="atomMind"
            title="AtomMind"
            thumbnail={thumbAtomMind}
          >
            The AtomMind industrial digitalization platform offers optimal
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

        <Divider my={6} />

        <Section delay={0.2}>
          <WorkGridItem id="drafta" thumbnail={thumbDrafta} title="Drafta">
            A Markdown note-taking app for developers. Focused writing
            environment with a CodeMirror 6 editor, revision history, notebooks,
            tags, and iCloud sync support.
          </WorkGridItem>
        </Section>
        <Section delay={0.2}>
          <WorkGridItem
            id="infodiode"
            thumbnail={thumbInfodiode}
            title="Infodiode Test"
          >
            A load testing system for one-way data transfer through a hardware
            data diode. Supports MQTT, TCP, Modbus TCP, OPC UA, and SFTP with
            no feedback channel.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
