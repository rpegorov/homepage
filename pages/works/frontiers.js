import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Frontiers">
      <Container>
        <Title>
          {t('workDetail.frontiers.title')}
          <Badge>2018-2021</Badge>
        </Title>
        <P>{t('workDetail.frontiers.p1')}</P>
        <P>{t('workDetail.frontiers.p2')}</P>
        <P>{t('workDetail.frontiers.p3')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.frontiers.stack')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/frontiers_title.jpg"
          alt={t('workDetail.frontiers.alt')}
        />
      </Container>
    </Layout>
  )
}

export default Work
