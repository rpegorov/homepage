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
  <Layout title="TezishApp">
    <Container>
      <Title>
        A mobile application for quick job search. <Badge>2023-2023</Badge>
      </Title>
      <P>Role in the project: Team Leader, Backend developer.</P>
      <P>
        About the project: A mobile application for quick job search for
        low-skilled employees. Search for employees.
      </P>
      <P>Team: 3 developers.</P>
      <P>
        Responsibilities: For the first part of the time, I served as Team Lead,
        selected developers and designers. Conducted an interview. Organized the
        work of the Agile team. Task decomposition, sprint planning, and control
        over deadlines and task quality. Preparation of technical specifications
        for third-party contractors, monitoring the execution of tasks. After
        the appearance of the project manager, I started developing.
        Implementation of new functionality in php: - implementation of
        automatic deletion of the user account - implementation of the favorites
        by vacancies section - implementation of the possibility of adding
        vacancies from the mobile application - implementation of receiving and
        viewing job reviews from the applicant Dividing the back part of the
        application into separate services based on Nest.JS . Other
        responsibilities: - GitLab deployment and configuration - job moderation
        - maintaining technical support for users
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>PHP 8.1, Doctrine, Express.JS, Nest.JS, TypOrm</span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://www.tezish.me">
            https://www.tezish.me/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>iOS, Android</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/tezish1.png" alt="TezishApp" />
      <WorkImage src="/images/works/tezish2.png" alt="TezishApp" />
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
