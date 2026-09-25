import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout
      title={t('works.items.infodiode.title')}
      description={t('works.items.infodiode.description')}
    >
      <Container>
        <Title>
          {t('workDetail.infodiode.title')} <Badge>2026–</Badge>
        </Title>
        <P>{t('workDetail.infodiode.p1')}</P>
        <P>{t('workDetail.infodiode.p2')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.infodiode.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.infodiode.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.type')}</Meta>
            <span>{t('common.meta.indiePersonal')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.moreInfo')}</Meta>
            <Link href="https://istok.craftzman.ru" isExternal>
              {t('workDetail.infodiode.moreInfoText')}{' '}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <WorkImage
          src="/images/works/infodiode_title.png"
          alt={t('workDetail.infodiode.alt')}
        />
      </Container>
    </Layout>
  )
}

export default Work
