/* Проекты: список на /works и страницы /works/<slug>. Тексты — в словарях
   (works.items.<key> — карточка, workDetail.<key> — страница), здесь —
   структура: год, абзацы, строки метаданных, картинки из src/assets/works. */
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/works/*', { eager: true });

function image(file: string): ImageMetadata {
  const found = images[`../assets/works/${file}`];
  if (!found) throw new Error(`works: no image src/assets/works/${file}`);
  return found.default;
}

export type MetaRow =
  | { label: 'platform' | 'stack'; field: string }
  | { label: 'type'; indie: true }
  | { label: 'website' | 'moreInfo'; href: string; field: string };

export interface Work {
  /** Адрес: /works/<slug>. */
  slug: string;
  /** Ключ в словарях: works.items.<key>, workDetail.<key>. */
  key: string;
  years: string;
  /** Ключи абзацев в workDetail.<key>, по порядку. */
  paragraphs: string[];
  meta: MetaRow[];
  thumbnail: ImageMetadata;
  shots: Array<{ src: ImageMetadata; alt: string }>;
  /** 1 — работа по найму, 2 — свои продукты. */
  group: 1 | 2;
}

const platform: MetaRow = { label: 'platform', field: 'platform' };
const stack: MetaRow = { label: 'stack', field: 'stack' };
const indie: MetaRow = { label: 'type', indie: true };

export const WORKS: Work[] = [
  {
    slug: 'atomMind',
    key: 'atomMind',
    years: '2024–',
    paragraphs: ['role', 'p1'],
    meta: [
      { label: 'website', href: 'https://www.tvel.ru/activity/non-nuclear-business/digital-products/platform-atom-mind/', field: 'websiteText' },
      platform,
      stack,
    ],
    thumbnail: image('atom_minde.png'),
    shots: [
      { src: image('atom_minde1.jpg'), alt: 'alt1' },
      { src: image('atom_minde2.jpg'), alt: 'alt2' },
    ],
    group: 1,
  },
  {
    slug: 'flameApp',
    key: 'flameApp',
    years: '2023–2024',
    paragraphs: ['p1', 'p2', 'p3', 'p4'],
    meta: [stack, platform],
    thumbnail: image('flame_title.jpg'),
    shots: [
      { src: image('flame_phone.jpg'), alt: 'alt1' },
      { src: image('flame01.jpg'), alt: 'alt2' },
    ],
    group: 1,
  },
  {
    slug: 'tezishApp',
    key: 'tezishApp',
    years: '2023',
    paragraphs: ['p1', 'p2', 'p3', 'p4'],
    meta: [stack, { label: 'website', href: 'https://www.tezish.me', field: 'websiteText' }, platform],
    thumbnail: image('tezish_title.jpg'),
    shots: [
      { src: image('tezish1.jpg'), alt: 'alt1' },
      { src: image('tezish2.png'), alt: 'alt2' },
    ],
    group: 1,
  },
  {
    slug: 'hr-crm',
    key: 'hrCrm',
    years: '2021–2023',
    paragraphs: ['p1', 'p2', 'p3', 'p4'],
    meta: [stack],
    thumbnail: image('crm_title.jpg'),
    shots: [{ src: image('crm_title.jpg'), alt: 'alt' }],
    group: 1,
  },
  {
    slug: 'frontiers',
    key: 'frontiers',
    years: '2018–2021',
    paragraphs: ['p1', 'p2', 'p3'],
    meta: [stack],
    thumbnail: image('frontiers_title.jpg'),
    shots: [{ src: image('frontiers_title.jpg'), alt: 'alt' }],
    group: 1,
  },
  {
    slug: 'etalon',
    key: 'etalon',
    years: '2023',
    paragraphs: ['p1'],
    meta: [stack, { label: 'website', href: 'https://www.etalon11.ru', field: 'websiteText' }],
    thumbnail: image('etalon_title.jpg'),
    shots: [{ src: image('etalon1.jpg'), alt: 'alt' }],
    group: 1,
  },
  {
    slug: 'drafta',
    key: 'drafta',
    years: '2024–',
    paragraphs: ['p1'],
    meta: [platform, stack, indie, { label: 'website', href: 'https://drafta.org', field: 'websiteText' }],
    thumbnail: image('drafta_preview.webp'),
    shots: [
      { src: image('drafta_editor.webp'), alt: 'altEditor' },
      { src: image('drafta_preview.webp'), alt: 'altPreview' },
    ],
    group: 2,
  },
  {
    slug: 'infodiode',
    key: 'infodiode',
    years: '2026–',
    paragraphs: ['p1', 'p2'],
    meta: [platform, stack, indie, { label: 'moreInfo', href: 'https://istok.craftzman.ru', field: 'moreInfoText' }],
    thumbnail: image('infodiode_title.png'),
    shots: [{ src: image('infodiode_title.png'), alt: 'alt' }],
    group: 2,
  },
  {
    slug: 'keel',
    key: 'keel',
    years: '2026–',
    paragraphs: ['p1', 'p2'],
    meta: [platform, stack, indie, { label: 'moreInfo', href: 'https://keel.craftzman.ru', field: 'moreInfoText' }],
    // TODO: заменить плитку на скриншот Keel, когда он будет готов.
    thumbnail: image('keel_title.png'),
    shots: [],
    group: 2,
  },
  {
    slug: 'ruslo',
    key: 'ruslo',
    years: '2026–',
    paragraphs: ['p1', 'p2'],
    meta: [platform, stack, indie, { label: 'moreInfo', href: 'https://ruslo.craftzman.ru', field: 'moreInfoText' }],
    // TODO: заменить плитку на скриншот «Русла», когда он будет готов.
    thumbnail: image('ruslo_title.png'),
    shots: [],
    group: 2,
  },
  {
    slug: 'echo',
    key: 'echo',
    years: '2025–',
    paragraphs: ['p1'],
    meta: [platform, stack, indie],
    thumbnail: image('echo_title.png'),
    shots: [
      { src: image('echo_title.png'), alt: 'alt1' },
      { src: image('echo3.png'), alt: 'alt2' },
      { src: image('echo4.png'), alt: 'alt3' },
      { src: image('echo2.png'), alt: 'alt4' },
    ],
    group: 2,
  },
  {
    slug: 'helm',
    key: 'helm',
    years: '2026–',
    paragraphs: ['p1'],
    meta: [platform, stack, indie],
    thumbnail: image('helm 00.png'),
    shots: [
      { src: image('helm 00.png'), alt: 'alt1' },
      { src: image('helm 1.png'), alt: 'alt2' },
      { src: image('helm 2.png'), alt: 'alt3' },
      { src: image('helm 4.png'), alt: 'alt4' },
      { src: image('helm 5.png'), alt: 'alt5' },
      { src: image('helm 6.png'), alt: 'alt6' },
    ],
    group: 2,
  },
];
