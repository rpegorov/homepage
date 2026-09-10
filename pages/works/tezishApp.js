import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="TezishApp">
      <Container>
        <Title>
          {t('workDetail.tezishApp.title')} <Badge>2023-2023</Badge>
        </Title>
        <P>{t('workDetail.tezishApp.p1')}</P>
        <P>{t('workDetail.tezishApp.p2')}</P>
        <P>{t('workDetail.tezishApp.p3')}</P>
        <P>{t('workDetail.tezishApp.p4')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.tezishApp.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.website')}</Meta>
            <Link href="https://www.tezish.me">
              {t('workDetail.tezishApp.websiteText')}{' '}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.tezishApp.platform')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/tezish1.jpg"
          alt={t('workDetail.tezishApp.alt1')}
        />
        <WorkImage
          src="/images/works/tezish2.png"
          alt={t('workDetail.tezishApp.alt2')}
        />
      </Container>
    </Layout>
  )
}

export default Work
