import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Etalon">
      <Container>
        <Title>
          {t('workDetail.etalon.title')}
          <Badge>2023</Badge>
        </Title>
        <P>{t('workDetail.etalon.p1')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.etalon.stack')}</span>
          </ListItem>
          <Meta>{t('common.meta.website')}</Meta>
          <Link href="https://www.etalon11.ru">
            {t('workDetail.etalon.websiteText')} <ExternalLinkIcon mx="2px" />
          </Link>
        </List>

        <WorkImage
          src="/images/works/etalon1.jpg"
          alt={t('workDetail.etalon.alt')}
        />
      </Container>
    </Layout>
  )
}

export default Work
