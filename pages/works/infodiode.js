import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Infodiode Test">
    <Container>
      <Title>
        Infodiode Test <Badge>2026–</Badge>
      </Title>
      <P>
        A two-service load testing system for validating one-way data transfer
        through a hardware data diode. The sender generates and transmits test
        data; the recipient validates integrity, measures latency, and tracks
        packet loss — with no feedback channel between them, mirroring real
        diode constraints.
      </P>
      <P>
        Supports five protocols across two groups: MQTT, TCP, and SFTP for bulk
        data transfer, and Modbus TCP / OPC UA for industrial telemetry
        (N machines × M indicators × F Hz). Each message carries a SHA-256
        checksum and timestamp for end-to-end validation without a return path.
        Built as static musl binaries targeting Astra Linux SE.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Linux (Astra Linux SE, x86_64)</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Rust, Tokio, MQTT, Modbus TCP, OPC UA, SFTP</span>
        </ListItem>
        <ListItem>
          <Meta>Type</Meta>
          <span>Indie / Personal</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/infodiode_title.png" alt="Infodiode Test" />
    </Container>
  </Layout>
)

export default Work
export { getStaticProps } from '../../components/chakra'
