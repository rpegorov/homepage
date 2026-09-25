// getStaticProps / getStaticPaths для страниц блога на обоих языках:
// pages/blog/* и pages/ru/blog/* отличаются только языком.
import { getPost, getPosts, languagesOf, summary } from './blog'
import { renderMarkdown } from './markdown'

export function blogIndexProps(lang) {
  return async () => ({
    props: { posts: getPosts(lang).map(summary) }
  })
}

export function blogPostPaths(lang) {
  return async () => ({
    paths: getPosts(lang).map(post => ({ params: { slug: post.slug } })),
    fallback: false
  })
}

export function blogPostProps(lang) {
  return async ({ params }) => {
    const post = getPost(lang, params.slug)
    if (!post) return { notFound: true }
    const { body, ...rest } = post
    return {
      props: {
        post: rest,
        html: await renderMarkdown(body),
        // На каких языках есть этот пост: hreflang и переключатель языка.
        languages: languagesOf(post.slug),
        languageFallback: '/blog'
      }
    }
  }
}
