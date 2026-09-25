// Markdown поста → HTML при сборке. GFM (таблицы, чек-листы, сноски),
// якоря у заголовков, подсветка кода и callouts `> [!NOTE]` как на drafta.org.
// Сырой HTML из заметки не пропускается: remark-rehype его отбрасывает.
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { remarkCallouts } from './remark-callouts.mjs'

// Картинки поста грузятся по мере прокрутки: в статьях их бывает по семь штук.
function rehypeLazyImages() {
  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'img') return
      node.properties.loading = 'lazy'
      node.properties.decoding = 'async'
    })
  }
}

export async function renderMarkdown(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeLazyImages)
    .use(rehypeHighlight, { detect: false })
    .use(rehypeStringify)
    .process(markdown)
  return String(file)
}
