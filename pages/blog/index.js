import { BlogIndex } from '../../components/blog'
import { blogIndexProps } from '../../lib/blog-pages'

export const getStaticProps = blogIndexProps('en')
export default BlogIndex
