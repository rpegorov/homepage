import NextLink from 'next/link'
import Head from 'next/head'
import {
  Box,
  Container,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import Layout from './layouts/article'
import Section from './section'
import { useLanguage } from '../lib/i18n'
import { SITE_URL } from '../lib/seo'

function formatDate(date, lang) {
  // Дата из front matter — день по UTC (YYYY-MM-DD): формат без сдвига поясов.
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(
    lang === 'ru' ? 'ru-RU' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
  )
}

const Tags = ({ tags }) =>
  tags.length > 0 ? (
    <Text as="span" fontFamily="mono" fontSize="13px" color="muted">
      {tags.map(tag => `#${tag}`).join(' ')}
    </Text>
  ) : null

const PostMeta = ({ post }) => {
  const { lang } = useLanguage()
  return (
    <Stack
      direction="row"
      spacing={3}
      wrap="wrap"
      fontFamily="mono"
      fontSize="13px"
      color="muted"
    >
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <Tags tags={post.tags} />
    </Stack>
  )
}

export const BlogIndex = ({ posts }) => {
  const { t, localize } = useLanguage()
  return (
    <Layout title={t('blog.title')} description={t('blog.description')}>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`craftzman — ${t('blog.title')}`}
          href={localize('/rss.xml')}
        />
      </Head>
      <Container>
        <Heading as="h1" variant="page-title" fontSize={{ base: '40px' }}>
          {t('blog.title')}
        </Heading>
        <Text color="ink-soft" mb={8}>
          {t('blog.description')}
        </Text>

        {posts.length === 0 && <Text color="muted">{t('blog.empty')}</Text>}

        <Stack spacing={0}>
          {posts.map((post, i) => (
            <Section key={post.slug} delay={0.05 * i}>
              <LinkBox
                as="article"
                bg="surface"
                border="1px solid"
                borderColor="border"
                borderRadius="20px"
                p={5}
                transition="box-shadow 200ms ease, border-color 200ms ease"
                _hover={{
                  boxShadow: 'shadow-md',
                  borderColor: 'border-strong'
                }}
              >
                <PostMeta post={post} />
                <Heading as="h2" fontSize="24px" mt={2} mb={2}>
                  <LinkOverlay
                    as={NextLink}
                    href={localize(`/blog/${post.slug}`)}
                    scroll={false}
                  >
                    {post.title}
                  </LinkOverlay>
                </Heading>
                <Text color="ink-soft" fontSize="15px" lineHeight={1.55}>
                  {post.description}
                </Text>
              </LinkBox>
            </Section>
          ))}
        </Stack>

        <Text mt={8} fontFamily="mono" fontSize="13px">
          <Link href={localize('/rss.xml')}>{t('blog.rss')}</Link>
        </Text>
      </Container>
    </Layout>
  )
}

export const BlogPost = ({ post, html, languages }) => {
  const { t, localize, lang } = useLanguage()
  const other = lang === 'ru' ? 'en' : 'ru'
  const hasOther = languages.includes(other)
  const originalHref =
    post.sourceLang === 'ru' ? `/ru/blog/${post.slug}` : `/blog/${post.slug}`
  const otherHref =
    other === 'ru' ? `/ru/blog/${post.slug}` : `/blog/${post.slug}`

  return (
    <Layout title={post.title} description={post.description}>
      <Head>
        <meta property="og:type" content="article" key="og:type" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.updated} />
        {post.cover && (
          <meta
            property="og:image"
            content={`${SITE_URL}${post.cover}`}
            key="og:image"
          />
        )}
        <script
          type="application/ld+json"
          key="post-jsonld"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.updated,
              inLanguage: lang,
              author: {
                '@type': 'Person',
                name: 'Rostislav Egorov',
                url: SITE_URL
              },
              ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {})
            })
          }}
        />
      </Head>
      <Container>
        <Box mb={4} fontSize="15px">
          <Link as={NextLink} href={localize('/blog')} scroll={false}>
            ← {t('blog.title')}
          </Link>
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: '32px', md: '40px' }}
          lineHeight={1.1}
        >
          {post.title}
        </Heading>
        <Box mt={3} mb={6}>
          <PostMeta post={post} />
          {post.updated !== post.date && (
            <Text fontFamily="mono" fontSize="13px" color="muted" mt={1}>
              {t('blog.updated', { date: formatDate(post.updated, lang) })}
            </Text>
          )}
        </Box>

        {post.machineTranslated && (
          <Box
            bg="bg-soft"
            border="1px solid"
            borderColor="border"
            borderRadius="12px"
            px={4}
            py={3}
            mb={6}
            fontSize="15px"
            color="ink-soft"
          >
            {t('blog.machineTranslated')}{' '}
            <Link as={NextLink} href={originalHref}>
              {t('blog.readOriginal')}
            </Link>
          </Box>
        )}

        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt=""
            style={{ width: '100%', borderRadius: 12, marginBottom: 24 }}
          />
        )}

        <Box className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

        {hasOther && !post.machineTranslated && (
          <Text mt={8} fontSize="15px">
            <Link as={NextLink} href={otherHref}>
              {t('blog.otherLanguage')}
            </Link>
          </Text>
        )}

        <Text mt={8} fontSize="15px">
          <Link as={NextLink} href={localize('/blog')} scroll={false}>
            ← {t('blog.back')}
          </Link>
        </Text>
      </Container>
    </Layout>
  )
}
