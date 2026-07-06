import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Echo">
    <Container>
      <Title>
        Echo <Badge>2025–</Badge>
      </Title>
      <P>
        Echo is a native macOS menu-bar system monitor. It displays live CPU,
        RAM, disk and network readings in a compact popover with ring gauges,
        and lets you drill into per-metric detail windows that show historical
        charts and top-10 process/file lists. Beyond monitoring, Echo bundles a
        tiling window manager with global hotkeys and drag-to-snap, a clipboard
        history panel (text, images, files — stored in memory only), and quick
        utilities such as Keyboard Cleaning, Prevent Sleep and disk cleanup.
        The app is energy-aware: monitoring pauses when no window is open,
        during system sleep, and throttles automatically in Low Power Mode.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Platform</Meta>
          <span>macOS 26.1+</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Swift 6, SwiftUI, Swift Concurrency (actors)</span>
        </ListItem>
        <ListItem>
          <Meta>Type</Meta>
          <span>Indie / Personal</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/echo_title.png" alt="Echo — menu bar popover" />
      <WorkImage src="/images/works/echo3.png" alt="Echo — CPU detail with live chart and top processes" />
      <WorkImage src="/images/works/echo4.png" alt="Echo — Network detail with throughput and averages" />
      <WorkImage src="/images/works/echo2.png" alt="Echo — Preferences" />
    </Container>
  </Layout>
)

export default Work
