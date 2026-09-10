import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="HrCrm">
      <Container>
        <Title>
          {t('workDetail.hrCrm.title')}
          <Badge>2021-2023</Badge>
        </Title>
        <P>{t('workDetail.hrCrm.p1')}</P>
        <P>{t('workDetail.hrCrm.p2')}</P>
        <P>{t('workDetail.hrCrm.p3')}</P>
        <P>{t('workDetail.hrCrm.p4')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.hrCrm.stack')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/crm_title.jpg"
          alt={t('workDetail.hrCrm.alt')}
        />
      </Container>
    </Layout>
  )
}

export default Work
