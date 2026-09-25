/* Правила блога для списка, страницы поста и RSS: какие посты показывает язык,
   в каком порядке, где живёт каждый и есть ли у него перевод. Перенесено из
   drafta-homepage (src/components/blog/posts.ts), адреса — без слэша в конце. */
import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Lang } from './lang';

export type Post = CollectionEntry<'blog'>;

const INTL_LOCALE: Record<Lang, string> = { en: 'en-GB', ru: 'ru-RU' };

/** Новые сверху; посты одного дня — по заголовку. */
export function byNewest(a: Post, b: Post): number {
  return b.data.date.localeCompare(a.data.date) || a.data.title.localeCompare(b.data.title);
}

export async function postsOf(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (entry) => entry.data.lang === lang);
  return posts.sort(byNewest);
}

export function postPath(lang: Lang, slug: string): string {
  return localePath(`/blog/${slug}`, lang);
}

/** Тот же пост на другом языке, если он опубликован. */
export async function twinOf(post: Post): Promise<Post | undefined> {
  const other: Lang = post.data.lang === 'ru' ? 'en' : 'ru';
  const [twin] = await getCollection('blog', (entry) => entry.data.lang === other && entry.data.slug === post.data.slug);
  return twin;
}

/** hreflang: язык поста всегда, перевод — только если он есть. */
export function alternatesOf(post: Post, twin: Post | undefined): Partial<Record<Lang, string>> {
  const alternates: Partial<Record<Lang, string>> = { [post.data.lang]: postPath(post.data.lang, post.data.slug) };
  if (twin) alternates[twin.data.lang] = postPath(twin.data.lang, twin.data.slug);
  return alternates;
}

/** Дата front matter ("YYYY-MM-DD") как полночь UTC. */
export function toDate(isoDay: string): Date {
  return new Date(`${isoDay}T00:00:00Z`);
}

/** "25 September 2026" / "25 сентября 2026 г." — по UTC, день не сдвигается. */
export function formatDay(isoDay: string, lang: Lang): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(toDate(isoDay));
}
