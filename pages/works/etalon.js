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
  <Layout title="Etalon">
    <Container>
      <Title>
        Website business card of the evaluation organization.
        <Badge>2023</Badge>
      </Title>
      <P>
        Implemented a website for a partner company that evaluates cars after
        road accidents. He designed the pages and designed a new logo for the
        organization. Filled it with content.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>AstroJs</span>
        </ListItem>
        <Meta>Website</Meta>
        <Link href="https://www.etalon11.ru">
          https://www.etalon11.ru/ <ExternalLinkIcon mx="2px" />
        </Link>
      </List>

      <WorkImage src="/images/works/etalon1.png" alt="Etalon" />
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
