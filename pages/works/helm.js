import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Helm">
    <Container>
      <Title>
        Helm <Badge>2026–</Badge>
      </Title>
      <P>
        Helm is a native macOS workspace for managing projects and their
        documentation in one place. Its document editor is the core experience,
        complemented by tasks, Gantt charts, risks, project planning, and export
        to common file formats.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Platform</Meta>
          <span>macOS</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Swift 6, SwiftUI, Swift Concurrency, TextKit 2</span>
        </ListItem>
        <ListItem>
          <Meta>Type</Meta>
          <span>Indie / Personal</span>
        </ListItem>
      </List>

      <WorkImage
        src="/images/works/helm 00.png"
        alt="Helm — project workspace"
      />
      <WorkImage src="/images/works/helm 1.png" alt="Helm — document editor" />
      <WorkImage src="/images/works/helm 2.png" alt="Helm — project planning" />
      <WorkImage src="/images/works/helm 4.png" alt="Helm — task management" />
      <WorkImage src="/images/works/helm 5.png" alt="Helm — Gantt chart" />
      <WorkImage src="/images/works/helm 6.png" alt="Helm — project overview" />
    </Container>
  </Layout>
)

export default Work
