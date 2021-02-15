import { getAllPostsIds, getPostData } from '../../lib/posts'

import Seo from '../../components/seo/seo.component'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from '../../components/image/image.component'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo.component'
import NewsLetterSignup from '../../components/NewsLetterSignUp/NewsLetterSignUp.component'
import BackButton from '../../components/BackButton/BackButton.component'
import CategoryChip from '../../components/Typography/CategoryChip/CategoryChip.component'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import Markdown from '../../components/Markdown/Markdown.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: theme.custom.screen.navBarHeight
    },
    content: {
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
    articleTitle: {
      marginBottom: theme.spacing(2),
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: '3rem'
      }
    },
    marginBottomMd: {
      marginBottom: theme.spacing(3)
    },
    postBody: {
      marginBottom: theme.spacing(5),
      '& img': {
        display: 'block',
        margin: '20px auto'
      },
      fontSize: '20px',
      color: theme.palette.type === 'light' ? 'rgba(0,0,0,.8)' : 'white'
    },
    imageWrapper: {
      borderRadius: '4px',
      '& img': {
        maxWidth: '100%',
        width: '100%'
      }
    }
  }
})

export default function Article({ postData }) {
  const classes = useStyles()
  const { title, category, image, description } = postData

  const seo = {
    metaTitle: postData.title,
    metaDescription: description,
    shareImage: image,
    article: true
  }

  return (
    <Grid container className={classes.root}>
      <Seo seo={seo} />

      <Grid item className={classes.content}>
        <BackButton />
        <div>
          <CategoryChip>{category?.name}</CategoryChip>
        </div>
        <Grid item container>
          <Grid item className={classes.marginBottomMd}>
            <SectionHeader>{title}</SectionHeader>
            <BodyText>{description}</BodyText>
          </Grid>
          <Grid item className={classes.imageWrapper}>
            <Image image={image} style={{ maxWidth: '100%' }}></Image>
          </Grid>
        </Grid>
        <AuthorInfo
          author={postData?.author}
          published={postData?.updated_at}
          divider
        />
        <div className={classes.postBody}>
          <Markdown source={postData?.content} />
        </div>
        <Grid container>
          <NewsLetterSignup />
        </Grid>
      </Grid>
    </Grid>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostsIds()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    },
    revalidate: 10
  }
}

Article.defaultProps = {
  postData: {}
}
