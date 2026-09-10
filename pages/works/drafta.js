import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Drafta">
      <Container>
        <Title>
          {t('workDetail.drafta.title')} <Badge>2024–</Badge>
        </Title>
        <P>{t('workDetail.drafta.p1')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.drafta.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.drafta.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.type')}</Meta>
            <span>{t('common.meta.indiePersonal')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.website')}</Meta>
            <Link href="https://drafta.org" isExternal>
              {t('workDetail.drafta.websiteText')} <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/drafta_title.png"
          alt={t('workDetail.drafta.alt')}
        />
      </Container>
    </Layout>
  )
}

export default Work
