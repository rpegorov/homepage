import { motion } from 'framer-motion'
import Head from 'next/head'
import { GridItemStyle } from '../grid-item'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

// title и description страницы перекрывают общие из layouts/main.js:
// у тегов те же key, next/head оставляет последний.
const Layout = ({ children, title, description }) => {
  const t = title ? `${title} — Rostislav Egorov (craftzman)` : null
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <>
        <Head>
          {t && <title key="title">{t}</title>}
          {t && <meta property="og:title" content={t} key="og:title" />}
          {t && <meta name="twitter:title" content={t} key="twitter:title" />}
          {description && (
            <meta name="description" content={description} key="description" />
          )}
          {description && (
            <meta
              property="og:description"
              content={description}
              key="og:description"
            />
          )}
          {description && (
            <meta
              name="twitter:description"
              content={description}
              key="twitter:description"
            />
          )}
        </Head>
        {children}

        <GridItemStyle />
      </>
    </motion.article>
  )
}

export default Layout
