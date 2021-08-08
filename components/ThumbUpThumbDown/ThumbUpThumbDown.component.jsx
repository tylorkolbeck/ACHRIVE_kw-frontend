import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import styles from './ThumbUpThumbDown.module.css'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.type === 'light' ? '#eee' : 'rgb(126, 126, 126)',
    display: 'inline-block',
    borderRadius: 4,
    padding: '3px 8px',
    display: 'flex'
  },
  icon: {
    marginBottom: -10,
    color:
      theme.palette.type === 'light'
        ? 'rgb(112, 112, 112) !important'
        : 'rgb(246, 246, 246) !important'
  },

  voted: {
    color: 'rgb(82, 196, 237) !important'
  }
}))

export default function ThumbUpThumbDown({ voteHandler, voted, voteCount }) {
  const classes = useStyles()

  return (
    <div className={styles.container} onClick={voteHandler}>
      {/* <AuthModal /> */}
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.container}
      >
        <Grid item>
          <ThumbUpIcon
            className={[classes.icon, voted ? classes.voted : classes.notVoted]}
            // style={{
            //   color: voted
            //     ? 'rgb(82, 196, 237) !important'
            //     : 'rgb(112, 112, 112) !important'
            // }}
          />
        </Grid>

        <Grid item className={styles.count}>
          {voteCount}
        </Grid>
      </Grid>
    </div>
  )
}
