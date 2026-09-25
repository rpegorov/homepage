/* RSS блога одного языка: /rss.xml и /ru/rss.xml. */
import rss from '@astrojs/rss';
import { t } from '../i18n';
import { localePath, type Lang } from './lang';
import { postPath, postsOf, toDate } from './posts';

export async function feed(lang: Lang, site: URL | undefined): Promise<Response> {
  if (!site) throw new Error('rss: `site` is not set in astro.config.mjs');
  const posts = await postsOf(lang);
  return rss({
    title: `craftzman — ${t(lang, 'blog.title')}`,
    description: t(lang, 'blog.description'),
    site: new URL(localePath('/blog', lang), site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: toDate(post.data.date),
      link: new URL(postPath(lang, post.data.slug), site).href,
      categories: post.data.tags,
    })),
    customData: `<language>${lang}</language>`,
  });
}
