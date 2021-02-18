import { getAllPostsIds, getPostData } from '../../lib/posts'

import Seo from '../../components/seo/seo.component'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
      paddingTop: theme.custom.screen.navBarHeight,
      maxWidth: '680px',
      margin: '0 auto'
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
      margin: '20px auto',
      '& img': {
        display: 'block',
        margin: '20px auto'
      },
      color: theme.palette.type === 'light' ? 'rgba(0,0,0,.8)' : 'white'
    },
    imageWrapper: {
      width: '100%',
      position: 'relative'
    },
    fixedRatio: {
      paddingTop: '56.25%' /* 16:9 ratio */,
      backgroundSize: 'cover',
      '-moz-background-size': 'cover' /* Firefox 3.6 */,
      backgroundPosition: 'center' /* Internet Explorer 7/8 */
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
          </Grid>
          <Grid item className={classes.imageWrapper}>
            <div
              className={classes.fixedRatio}
              style={{ backgroundImage: `url(${image?.url})` }}
            ></div>
          </Grid>
        </Grid>
        <AuthorInfo
          author={postData?.author}
          published={postData?.updated_at}
          divider
        />
        <Grid item style={{ marginTop: '20px' }}>
          <BodyText fontSize="22px" color="grey">
            {description}
          </BodyText>
        </Grid>

        <div className={classes.postBody}>
          <Markdown source={postData?.content} />
        </div>
        <Grid container justify="center" style={{ marginTop: '100px' }}>
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
    revalidate: 1
  }
}

Article.defaultProps = {
  postData: {}
}
