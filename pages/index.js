import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import {
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoVk,
  IoLogoYoutube,
  IoLogoLinkedin
} from 'react-icons/io5'
import { FaTelegram } from 'react-icons/fa'
import thumbYouTube from '../public/images/links/chanel-banner.jpeg'
import Image from 'next/image'

const Home = () => (
  <Layout>
    <Container>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Rostislav Egorov
          </Heading>
          <p>Digital Craftsman ( Photographer / Developer / Camper )</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/rostislav.png"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          A backend developer with a passion for creating digital products and
          services, solving complex problems, and finding innovative solutions.
          I have experience in all aspects of product development, from planning
          and design to implementation and troubleshooting. I am skilled at
          working with code to solve real-world problems and ensure the success
          of our products.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1991</BioYear>
          Born in Kamianske, USSR.
        </BioSection>
        <BioSection>
          <BioYear>2015</BioYear>I graduated from Saint Petersburg State
          Forestry University (Russian: Санкт-Петербургский государственный
          лесотехнический университет им. С. М. Кирова (СПбГЛТУ) engineer by
          profession.
        </BioSection>
        <BioSection>
          <BioYear>2015</BioYear>I opened a property valuation firm, worked as a
          judicial expert, and provided expert assessment services in courts of
          general jurisdiction and arbitration courts. I established his own
          judicial practice and began providing case support services in both
          general jurisdiction and arbitration cases.
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear> Completed Java developer courses.
        </BioSection>
        <BioSection>
          <BioYear>2020</BioYear>I graduated from the Moscow Financial and
          Industrial University university and received a master&apos;s degree
          in law.
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Art, Music,{' '}
          <Link href="https://www.instagram.com/w1sh.master/" target="_blank">
            Photography
          </Link>
          , Machine Learning,{' '}
          <Link href="https://rutube.ru/channel/53860712/" target="_blank">
            Camping Vlog
          </Link>
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/rpegorov" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @rpegorov
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://vk.com/w1shmaster" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoVk />}
              >
                @w1shmaster
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.youtube.com/@ROSTCAMP" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoYoutube />}
              >
                @ROSTCAMP
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.instagram.com/w1sh.master/" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @w1sh.master
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.linkedin.com/in/rostislav-egorov-2721b8220/"
              target="_blank"
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                @Rostislav Egorov
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.t.me/w1shmaster" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<FaTelegram />}
              >
                @w1shmaster
              </Button>
            </Link>
          </ListItem>
        </List>

        <SimpleGrid columns={[1]} gap={6}>
          <GridItem
            href="https://www.youtube.com/@ROSTCAMP"
            title="ROSTCAMP"
            thumbnail={thumbYouTube}
            leftIcon={<IoLogoYoutube />}
          >
            My YouTube channel that I recently started and I&apos;m going to
            make videos about traveling and camping.
          </GridItem>
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
