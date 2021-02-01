import { getAllPostsIds, getPostData } from '../../lib/posts'
import ReactMarkdown from 'react-markdown'
import Seo from '../../components/seo/seo.component'
import { Typography, Grid, Chip, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from '../../components/image/image.component'
import Avatar from '@material-ui/core/Avatar'
import { getStrapiMedia } from '../../lib/media'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import { DateTime } from 'luxon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo.component'

const IMAGE_PATH = process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'test'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: theme.custom.screen.maxWidth,
      margin: '0px auto',
      padding: theme.custom.screen.bodyPadding
    },
    divider: {
      background: theme.palette.secondary.light,
      marginTop: '20px'
    },
    authorText: {
      fontWeight: 'bold'
    },
    marginBottomSm: {
      marginBottom: theme.spacing(2)
    },
    marginBottomMd: {
      marginBottom: theme.spacing(3)
    }
  }
})

export default function Article({ postData }) {
  const classes = useStyles()
  const {
    title,
    category,
    content,
    published_at,
    teaserText,
    updated_at,
    image,
    description,
    author
  } = postData

  const publishedDate = DateTime.fromISO(published_at).toLocaleString(
    DateTime.DATETIME_FULL
  )
  const updatedDate = DateTime.fromISO(updated_at).toLocaleString(
    DateTime.DATETIME_FULL
  )

  const seo = {
    metaTitle: postData.title,
    metaDescription: postData.description,
    shareImage: postData.image,
    article: true
  }

  return (
    <Grid container className={classes.root}>
      <Grid item container>
        <Grid item xs={12} className={classes.marginBottomSm}>
          {category && (
            <Chip
              color="secondary"
              variant="outlined"
              size="small"
              component="a"
              href={`/categories/${category.name}`}
              label={category.name}
              clickable
            />
          )}
        </Grid>
        <Grid item className={classes.marginBottomMd}>
          <Typography variant="h2" className={classes.marginBottomSm}>
            {title}
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </Grid>
        <Image image={image} style={{ maxWidth: '100%' }}></Image>
      </Grid>
      <AuthorInfo
        author={postData.author}
        published={postData.updated_at}
        updated={postData.updated_at}
        divider
      />

      <Seo seo={seo} />
      <ReactMarkdown source={postData.content} escapeHtml={false} />
    </Grid>
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
