import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  AspectRatio
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="AtomMind">
    <Container>
      <Title>
        AtomMinde <Badge>2024-</Badge>
      </Title>
      <P>
        The Atommind industrial digitalization platform offers optimal
        parameters and operating modes of equipment to reduce the proportion of
        finished products that do not meet established standards, as well as
        visualizes the production process and notifies users of parameter
        deviations.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://www.tvel.ru/activity/non-nuclear-business/digital-products/platform-atom-mind/">
            https://www.tvel.ru/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Windows/Linux</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Java, Golang, Angular</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/atom_minde1.png" alt="AtomMinde" />
      <WorkImage src="/images/works/atom_minde2.png" alt="AtomMinde" />
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
