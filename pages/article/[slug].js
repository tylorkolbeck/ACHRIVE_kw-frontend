import { useState, useEffect } from 'react'
import { getAllPostsIds, getPostData } from '../../lib/posts'

import { userContext } from '../../context/UserContext'
import Seo from '../../components/seo/seo.component'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo.component'
import NewsLetterSignup from '../../components/NewsLetterSignUp/NewsLetterSignUp.component'
import BackButton from '../../components/BackButton/BackButton.component'
import CategoryChip from '../../components/Typography/CategoryChip/CategoryChip.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import Markdown from '../../components/Markdown/Markdown.component'
import Description from '../../components/Description/Description.component'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api'
import SocialMediaShare from '../../components/SocialMediaShare/SocialMediaShare.component'
import ThumbUpThumbDown from '../../components/ThumbUpThumbDown/ThumbUpThumbDown.component'
import AuthModal from '../../components/AuthModal/AuthModal.component'
import axios from 'axios'

import { useRouter } from 'next/router'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: theme.custom.screen.navBarHeight,
      maxWidth: '800px',
      margin: '0 auto'
    },
    content: {
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

export default function Article({ postData, coinList }) {
  const router = useRouter()
  const classes = useStyles()
  const { title, category, image, description } = postData
  const { userState } = userContext()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [voteCount, setVoteCount] = useState(0)
  const [voted, setVoted] = useState(false)
  const [pendingVote, setPendingVote] = useState(false)

  // listen forauth state change and if pending vote then post vote

  // Whenever userstate changes check if this user has voted
  useEffect(() => {
    checkUsersVote()
  }, [userState])

  // Get the current vote count on page load
  useEffect(() => {
    // get the current vote count
    axios
      .get(`${API_URL}/votes/count?article=${postData?.id}&vote=true`)
      .then(({ data }) => setVoteCount(data))
  }, [])

  // Listen for pending vote and login
  useEffect(() => {
    // If the user recently logged in, has a pending vote and has not voted, then perform a vote
    if (pendingVote && userState.isAuthenticated) {
      axios
        .get(
          `${API_URL}/votes?users_permissions_user=${userState?.user?.id}&article=${postData?.id}`
        )
        .then(({ data }) => {
          if (data.length > 0 && data[0].vote === false) {
            doVote()
            setPendingVote(false)
          }
        })
    }
  }, [userState, pendingVote])

  const seo = {
    metaTitle: postData.title,
    metaDescription: description,
    shareImage: image,
    article: true
  }

  function checkUsersVote() {
    if (userState.isAuthenticated) {
      axios
        .get(
          `${API_URL}/votes?users_permissions_user=${userState?.user?.id}&article=${postData?.id}`
        )
        .then(({ data }) => {
          if (data.length > 0 && data[0].vote === true) {
            setVoted(true)
          } else if (data.length > 0 && data[0].vote === false) {
            setVoted(false)
          }
        })
    }
  }

  function doVote() {
    console.log(userState)
    axios
      .post(
        `${API_URL}/votes`,
        {
          article: postData?.id,
          vote: !voted
        },
        {
          headers: {
            Authorization: `bearer ${userState.user.token}`
          }
        }
      )
      .then(({ data }) => {
        if (data.vote) {
          setVoteCount(voteCount + 1)
          setVoted(true)
        } else {
          setVoted(false)
          setVoteCount(voteCount - 1)
        }
        setAuthModalOpen(false)
      })
      .catch((error) => console.log(error))
  }

  function voteHandler() {
    if (!userState.isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    if (userState.isAuthenticated) {
      doVote()
    } else {
      setAuthModalOpen(true)
    }
  }

  function postLoginVote(userInfo) {
    // set a pending vote state so that the users vote is logged after they login
    setPendingVote(true)
    setAuthModalOpen(false)
  }

  return (
    <Grid container className={classes.root}>
      <AuthModal
        open={authModalOpen}
        setOpen={setAuthModalOpen}
        afterLogin={postLoginVote}
      />
      <Seo seo={seo} />

      <Grid item className={classes.content}>
        <BackButton />
        {category && (
          <Link href={`/category/${category.slug}`}>
            <a>
              <CategoryChip>{category.name}</CategoryChip>
            </a>
          </Link>
        )}

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
        <Grid container justify="space-between">
          <Grid item>
            <AuthorInfo
              author={postData?.author}
              published={postData?.updated_at}
              divider
            />
          </Grid>
          <Grid item style={{ marginTop: 10 }}>
            <ThumbUpThumbDown
              voteHandler={() => voteHandler()}
              voteCount={voteCount}
              voted={voted}
            />
          </Grid>
        </Grid>

        <SocialMediaShare
          url={`https://killerwhalecrypto.com${router.asPath}`}
        />

        <Grid item>
          <Description>{description}</Description>
        </Grid>

        <div className={classes.postBody}>
          <Markdown source={postData?.content} coinList={coinList} />
        </div>
        <SocialMediaShare
          url={`https://killerwhalecrypto.com${router.asPath}`}
        />
      </Grid>

      <Grid
        container
        justify="center"
        style={{
          marginTop: '100px',
          marginBottom: '20px',
          marginLeft: '10px',
          marginRight: '10px'
        }}
      >
        <NewsLetterSignup />
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
  const { coin } = await fetchAPI('/coin-list')

  return {
    props: {
      postData,
      coinList: coin
    },
    revalidate: 1
  }
}

Article.defaultProps = {
  postData: {}
}
