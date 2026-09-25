// Посты блога для страниц Next.js (getStaticProps / getStaticPaths).
// Чтение и проверка — в scripts/lib/posts.mjs, общем с генератором sitemap/RSS.
export {
  getPost,
  getPosts,
  languagesOf,
  summary,
  validatePost
} from '../scripts/lib/posts.mjs'
