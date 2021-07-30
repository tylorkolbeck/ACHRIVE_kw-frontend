import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import styles from './ThumbUpThumbDown.module.css'
import Grid from '@material-ui/core/Grid'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL

export default function ThumbUpThumbDown({ voteHandler, voted, voteCount }) {
  return (
    <div className={styles.container} onClick={voteHandler}>
      {/* <AuthModal /> */}
      <Grid container justify="center" alignContent="center">
        <Grid item>
          <ThumbUpIcon
            className={styles.icon}
            style={{
              color: voted ? 'rgb(82, 196, 237)' : 'rgb(112, 112, 112)'
            }}
          />
        </Grid>

        <Grid item className={styles.count}>
          {voteCount}
        </Grid>
      </Grid>
    </div>
  )
}
