import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { useLanguage } from '../lib/i18n'

import thumbPortfolio from '../public/images/contents/youtube-how-to-build-portfolio.jpg'
import thumbHowToUseInkdrop from '../public/images/contents/youtube-how-to-use-inkdrop.jpg'
import thumbFishWorkflow from '../public/images/contents/youtube-fish-workflow.jpg'
import thumbMyDeskSetup from '../public/images/contents/youtube-my-desk-setup.jpg'
import thumb500PaidUsers from '../public/images/contents/blog-500-paid-users.jpg'
import thumbFinancialGoal from '../public/images/contents/blog-financial-goal.jpg'
import thumbHowToPriceYourself from '../public/images/contents/blog-how-to-price-yourself.jpg'
import thumb50xFaster from '../public/images/contents/youtube-50x-faster.jpg'

const Posts = () => {
  const { t } = useLanguage()

  return (
    <Layout title="Posts">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          {t('posts.heading')}
        </Heading>

        <Section delay={0.1}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title={t('posts.items.portfolio')}
              thumbnail={thumbPortfolio}
              href="https://www.youtube.com/watch?v=bSMZgXzC9AA"
            />
            <GridItem
              title={t('posts.items.inkdrop')}
              thumbnail={thumbHowToUseInkdrop}
              href="https://www.youtube.com/watch?v=-qBavwqc_mY"
            />
            <GridItem
              title={t('posts.items.fishWorkflow')}
              thumbnail={thumbFishWorkflow}
              href="https://www.youtube.com/watch?v=KKxhf50FIPI"
            />
            <GridItem
              title={t('posts.items.deskSetup')}
              thumbnail={thumbMyDeskSetup}
              href="https://www.youtube.com/watch?v=1OFDMwDlnOE"
            />
          </SimpleGrid>
        </Section>

        <Section delay={0.3}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title={t('posts.items.paidUsers')}
              thumbnail={thumb500PaidUsers}
              href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820"
            />
            <GridItem
              title={t('posts.items.financialGoal')}
              thumbnail={thumbFinancialGoal}
              href="https://blog.inkdrop.app/i-stopped-setting-a-financial-goal-for-my-saas-a92c3db65506"
            />
          </SimpleGrid>
        </Section>

        <Section delay={0.5}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title={t('posts.items.priceYourself')}
              thumbnail={thumbHowToPriceYourself}
              href="https://blog.inkdrop.app/how-to-price-yourself-as-a-freelance-developer-3453dfd59d91"
            />
            <GridItem
              title={t('posts.items.reactNativeFaster')}
              thumbnail={thumb50xFaster}
              href="https://www.youtube.com/watch?v=vj723NlrIQc"
            />
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Posts
