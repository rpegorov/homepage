import { Container, Badge, List, ListItem, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'
import { useLanguage } from '../../lib/i18n'

const Work = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Keel">
      <Container>
        <Title>
          {t('workDetail.keel.title')} <Badge>2026–</Badge>
        </Title>
        <P>{t('workDetail.keel.p1')}</P>
        <P>{t('workDetail.keel.p2')}</P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('common.meta.platform')}</Meta>
            <span>{t('workDetail.keel.platform')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.stack')}</Meta>
            <span>{t('workDetail.keel.stack')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.type')}</Meta>
            <span>{t('common.meta.indiePersonal')}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('common.meta.moreInfo')}</Meta>
            <Link href="https://keel.craftzman.ru" isExternal>
              {t('workDetail.keel.moreInfoText')} <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        {/* TODO: превью Keel — добавить WorkImage, когда появится скриншот продукта */}
      </Container>
    </Layout>
  )
}

export default Work
