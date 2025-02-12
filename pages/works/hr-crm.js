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
        The system for personnel management of the enterprise.
        <Badge>2021-2023</Badge>
      </Title>
      <P>Role in the project: Senior Backend developer.</P>
      <P>
        About the project: decision support system for the Ministry of Internal
        Affairs.
      </P>
      <P>
        Responsibilities: Assessment of the time complexity of tasks. Task
        decomposition. Introduction of new functionality. Integration with
        external services. Refactoring existing code. Application architecture
        design and refactoring. Preparation of technical documentation.
      </P>
      <P>
        Implemented integration with Telegram, WhatsApp. I did a corporate email
        search with automatic uploading of applicants' resumes and entering the
        data into the enterprise Database. Implemented end-to-end chat in
        messengers from the main system.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            PHP 7.4, Express.JS, PHP Admin Panel, Bitrix-orm, MySQL, PostgreSQL
          </span>
        </ListItem>
      </List>
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
