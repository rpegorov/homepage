import { BlogPost } from '../../components/blog'
import { blogPostPaths, blogPostProps } from '../../lib/blog-pages'

export const getStaticPaths = blogPostPaths('en')
export const getStaticProps = blogPostProps('en')
export default BlogPost
