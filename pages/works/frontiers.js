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
        The decision support system for the Ministry of Internal Affairs.
        <Badge>2018-2021</Badge>
      </Title>
      <P>Role in the project: Backend developer.</P>
      <P>
        About the project: The decision support system for the Ministry of
        Internal Affairs.
      </P>
      <P>
        Responsibilities: Assessment of the time complexity of tasks. Task
        decomposition. Introduction of new functionality. Integration with
        external services. Refactoring existing code. Application architecture
        design and refactoring. Preparation of technical documentation.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            Java 8 - 11, Spring Boot, Spring Data, Spring Cloude, Spring Config,
            Spring Securuty, PostgreSQL, Feing client, Liquibase, JUnit 5,
            Hybernate
          </span>
        </ListItem>
      </List>
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
