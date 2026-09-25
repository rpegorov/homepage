import { BlogPost } from '../../../components/blog'
import { blogPostPaths, blogPostProps } from '../../../lib/blog-pages'

export const getStaticPaths = blogPostPaths('ru')
export const getStaticProps = blogPostProps('ru')
export default BlogPost
