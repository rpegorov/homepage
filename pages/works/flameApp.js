import {
  Box,
  Container,
  Badge,
  Link,
  List,
  ListItem,
  UnorderedList,
  Heading,
  Center
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="FlameApp">
    <Container>
      <Title>
        A mobile dating app. <Badge>2023</Badge>
      </Title>
      <P>Role in the project: Team Leader, Backend developer.</P>
      <P>About the project: a mobile dating app, similar to Tinder.</P>
      <P>Team: 4 developers</P>
      <P>
        Responsibilities: Redesigned the application architecture. Organized the
        work of the Agile team. Setting tasks. Code review. Conducting a Daily.
        Checking the quality of completed tasks. Training of new employees.
        Preparation of technical documentation. I set the code style.
        Preparation of project documentation. Implemented the back part of the
        admin panel. Changed the structure of the back part of the application.
        Divided the monolith into microservices. Implemented back and front
        interaction methods. Set up the development server. Deployed the back
        and front parts on the server. I wrote configs for deploying
        applications — nginx, dockercompose. Set up continuous integration of
        changes via GitHub Actions (pipeline)
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            Express.js, Nest.js, Vue, Vite, PrismaORM, Kafka, Rabbit MQ
          </span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/flame_phone.png" alt="FlameApp" />
      <WorkImage src="/images/works/flame01.png" alt="FlameApp" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
