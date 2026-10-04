/* Works rules for the list page and the project pages: which entries a language
   shows, how they are grouped and ordered, where each lives and which language
   twin it has. Addresses carry no trailing slash. */
import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Lang } from './lang';

export type Work = CollectionEntry<'works'>;
export type WorkGroup = Work['data']['group'];

/** Display order of the groups on the list page. */
export const WORK_GROUPS: readonly WorkGroup[] = ['work', 'own'];

export type GroupedWorks = Record<WorkGroup, Work[]>;

export interface WorkLink {
  kind: 'website' | 'more';
  href: string;
  /** Hostname without "www.", shown as the link text. */
  label: string;
}

/** Ascending `order`; equal orders fall back to the title. */
export function byOrder(a: Work, b: Work): number {
  return a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
}

export async function worksOf(lang: Lang): Promise<Work[]> {
  const works = await getCollection('works', (entry) => entry.data.lang === lang);
  return works.sort(byOrder);
}

export function groupWorks(works: readonly Work[]): GroupedWorks {
  const grouped: GroupedWorks = { work: [], own: [] };
  for (const work of [...works].sort(byOrder)) grouped[work.data.group].push(work);
  return grouped;
}

export async function groupedWorksOf(lang: Lang): Promise<GroupedWorks> {
  return groupWorks(await worksOf(lang));
}

export function workPath(lang: Lang, slug: string): string {
  return localePath(`/works/${slug}`, lang);
}

/** The same project in the other language, if it is published. */
export async function twinOf(work: Work): Promise<Work | undefined> {
  const other: Lang = work.data.lang === 'ru' ? 'en' : 'ru';
  const [twin] = await getCollection('works', (entry) => entry.data.lang === other && entry.data.slug === work.data.slug);
  return twin;
}

/** hreflang: the work's own language always, the twin only when it exists. */
export function alternatesOf(work: Work, twin: Work | undefined): Partial<Record<Lang, string>> {
  const alternates: Partial<Record<Lang, string>> = {
    [work.data.lang]: workPath(work.data.lang, work.data.slug),
  };
  if (twin) alternates[twin.data.lang] = workPath(twin.data.lang, twin.data.slug);
  return alternates;
}

/** Own products carry the "indie project" metadata row; employer work does not. */
export function isIndie(work: Work): boolean {
  return work.data.group === 'own';
}

const WWW_PREFIX = /^www\./;

export function domainLabel(url: string): string {
  return new URL(url).hostname.replace(WWW_PREFIX, '');
}

/** The outgoing link of a project: `website` wins over `more`; none when neither is set. */
export function linkOf(work: Work): WorkLink | undefined {
  const { website, more } = work.data;
  if (website) return { kind: 'website', href: website, label: domainLabel(website) };
  if (more) return { kind: 'more', href: more, label: domainLabel(more) };
  return undefined;
}
