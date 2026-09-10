import { Container, Badge, List, ListItem } from '@chakra-ui/react'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Helm">
      <Container>
        <Title>
          {t('workDetail.helm.title')} <Badge>2026–</Badge>
        </Title>
        <P>{t('workDetail.helm.p1')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.helm.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.helm.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.type')}</Meta>
            <span>{t('common.meta.indiePersonal')}</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/helm 00.png"
          alt={t('workDetail.helm.alt1')}
        />
        <WorkImage
          src="/images/works/helm 1.png"
          alt={t('workDetail.helm.alt2')}
        />
        <WorkImage
          src="/images/works/helm 2.png"
          alt={t('workDetail.helm.alt3')}
        />
        <WorkImage
          src="/images/works/helm 4.png"
          alt={t('workDetail.helm.alt4')}
        />
        <WorkImage
          src="/images/works/helm 5.png"
          alt={t('workDetail.helm.alt5')}
        />
        <WorkImage
          src="/images/works/helm 6.png"
          alt={t('workDetail.helm.alt6')}
        />
      </Container>
    </Layout>
  )
}

export default Work
