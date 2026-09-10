import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="AtomMind">
      <Container>
        <Title>
          {t('workDetail.atomMind.title')} <Badge>2024-</Badge>
        </Title>
        <P>{t('workDetail.atomMind.p1')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.website')}</Meta>
            <Link href="https://www.tvel.ru/activity/non-nuclear-business/digital-products/platform-atom-mind/">
              {t('workDetail.atomMind.websiteText')}{' '}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.atomMind.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.atomMind.stack')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/atom_minde1.jpg"
          alt={t('workDetail.atomMind.alt1')}
        />
        <WorkImage
          src="/images/works/atom_minde2.jpg"
          alt={t('workDetail.atomMind.alt2')}
        />
      </Container>
    </Layout>
  )
}

export default Work
