import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Drafta">
    <Container>
      <Title>
        Drafta <Badge>2024–</Badge>
      </Title>
      <P>
        Drafta is a Markdown note-taking application for developers, built for
        macOS. It features a CodeMirror 6-powered editor embedded in a native
        SwiftUI app, with syntax highlighting for Markdown and 50+ programming
        languages, split editor/preview mode, revision history, notebooks with
        hierarchy, a tag system with custom colors, and typography
        customization. Designed as a focused writing environment — inspired by
        Bear and Inkdrop — with iCloud Drive sync support.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Platform</Meta>
          <span>macOS</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Swift, SwiftUI, CodeMirror 6, TypeScript, esbuild</span>
        </ListItem>
        <ListItem>
          <Meta>Type</Meta>
          <span>Indie / Personal</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/drafta_title.png" alt="Drafta" />
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
