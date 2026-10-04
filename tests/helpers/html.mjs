// Minimal readers for the HTML Astro emits: enough to pick tags and attributes
// out of a built page without a DOM dependency.

/** Attributes of every `<name ...>` tag in `html`, in document order. */
export function tagsOf(html, name) {
  const tags = [];
  for (const [, source] of html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'g'))) {
    const attrs = {};
    for (const [, key, quoted, bare] of source.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|([^\s"'>]+))/g)) attrs[key] = quoted ?? bare;
    tags.push(attrs);
  }
  return tags;
}

export function metaContent(html, key) {
  return tagsOf(html, 'meta').find((tag) => tag.property === key || tag.name === key)?.content;
}

/** hreflang → href for the page's `<link rel="alternate" hreflang>` tags. */
export function hreflangs(html) {
  const entries = tagsOf(html, 'link')
    .filter((tag) => tag.rel === 'alternate' && tag.hreflang)
    .map((tag) => [tag.hreflang, tag.href]);
  return Object.fromEntries(entries);
}

export function canonicalOf(html) {
  return tagsOf(html, 'link').find((tag) => tag.rel === 'canonical')?.href;
}

/** The page markup from `<main` on: header and `<head>` text cannot match inside it. */
export function mainOf(html) {
  const start = html.indexOf('<main');
  const end = html.indexOf('</main>');
  if (start === -1 || end === -1) throw new Error('no <main> element in the page');
  return html.slice(start, end);
}

export function textOf(fragment) {
  return fragment
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** `{ href, text, html }` of every anchor in `fragment`, in document order. */
export function linksOf(fragment) {
  return [...fragment.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, source, inner]) => ({
    href: /href\s*=\s*"([^"]*)"/.exec(source)?.[1],
    text: textOf(inner),
    html: inner,
  }));
}
