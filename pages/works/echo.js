import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Echo">
      <Container>
        <Title>
          {t('workDetail.echo.title')} <Badge>2025–</Badge>
        </Title>
        <P>{t('workDetail.echo.p1')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.echo.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.echo.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.type')}</Meta>
            <span>{t('common.meta.indiePersonal')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/echo_title.png"
          alt={t('workDetail.echo.alt1')}
        />
        <WorkImage
          src="/images/works/echo3.png"
          alt={t('workDetail.echo.alt2')}
        />
        <WorkImage
          src="/images/works/echo4.png"
          alt={t('workDetail.echo.alt3')}
        />
        <WorkImage
          src="/images/works/echo2.png"
          alt={t('workDetail.echo.alt4')}
        />
      </Container>
    </Layout>
  )
}

export default Work
