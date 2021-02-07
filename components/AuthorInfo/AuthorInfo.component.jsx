import React from 'react'
import { Grid, Divider, Typography, Avatar } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import { makeStyles } from '@material-ui/core/styles'
import { getStrapiMedia } from '../../lib/media'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    background: theme.palette.secondary.light,
    marginTop: '20px'
  }
}))

export default function AuthorInfo({ author, published, divider }) {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {divider && <Divider className={classes.divider} color="secondary" />}
        </Grid>
        <Grid item>
          <Avatar alt={author?.name} src={getStrapiMedia(author?.picture)} />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle2" className={classes.authorText}>
                {author?.name}
              </Typography>
            </Grid>
            <Grid item>
              <TwitterIcon fontSize="small" color="secondary" />
              <TelegramIcon fontSize="small" color="secondary" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">
          {published &&
            DateTime.fromISO(published).toLocaleString(
              DateTime.DATETIME_FULL
            )}{' '}
          {/* {updated && (
            <>
              <span className={classes.wingDing}>&#8226;</span> Updated{' '}
              {DateTime.fromISO(updated).toLocaleString(DateTime.DATETIME_FULL)}
            </>
          )} */}
        </Typography>
      </Grid>
    </Grid>
  )
}

AuthorInfo.defaultProps = {
  author: {},
  published: '',
  updated: '',
  divder: null
}
