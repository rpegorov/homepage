import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="FlameApp">
      <Container>
        <Title>
          {t('workDetail.flameApp.title')} <Badge>2023-2024</Badge>
        </Title>
        <P>{t('workDetail.flameApp.p1')}</P>
        <P>{t('workDetail.flameApp.p2')}</P>
        <P>{t('workDetail.flameApp.p3')}</P>
        <P>{t('workDetail.flameApp.p4')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.flameApp.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.flameApp.platform')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/flame_phone.jpg"
          alt={t('workDetail.flameApp.alt1')}
        />
        <WorkImage
          src="/images/works/flame01.jpg"
          alt={t('workDetail.flameApp.alt2')}
        />
      </Container>
    </Layout>
  )
}

export default Work
