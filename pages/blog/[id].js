import { client } from 'libs/client'
import styles from 'styles/Home.module.scss'

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`
        }}
      />
    </main>
  )
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' })
  const paths = data.contents.map((content) => `/blog/${content.id}`)

  // fallback: false で getStaticPaths で返されないパスを404で返す
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'blog', contentId: id })

  return {
    props: {
      blog: data
    }
  }
}
