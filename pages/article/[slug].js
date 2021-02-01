import ArticleLayout from '../../components/ArticleLayout/article.layout'
import { getAllPostsIds, getPostData } from '../../lib/posts'
import ReactMarkdown from 'react-markdown'
import Seo from '../../components/seo/seo.component'
import { Typography } from '@material-ui/core'

export default function Article({ postData }) {
  const seo = {
    metaTitle: postData.title,
    metaDescription: postData.description,
    shareImage: postData.image,
    article: true
  }

  return (
    <ArticleLayout>
      <Seo seo={seo} />
      <Typography variant="h2">{postData.title}</Typography>
      <br />
      <br />
      <ReactMarkdown source={postData.content} escapeHtml={false} />
    </ArticleLayout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostsIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}
