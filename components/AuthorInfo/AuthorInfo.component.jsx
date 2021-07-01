import React from 'react'
import { Grid, Divider, Typography, Avatar } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import { makeStyles } from '@material-ui/core/styles'
import { getStrapiMedia } from '../../lib/media'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  authorCard: {
    // borderLeft: `2px solid ${theme.palette.secondary.main}`,
    // paddingLeft: '10px',
    margin: '10px 0px'
  }
}))

export default function AuthorInfo({ author, published, divider }) {
  const classes = useStyles()

  return (
    <Grid item xs={12} className={classes.authorCard}>
      <Grid container spacing={2}>
        <Grid item container>
          <Grid item style={{ marginRight: '10px' }}>
            <Avatar alt={author?.name} src={getStrapiMedia(author?.picture)} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ fontWeight: 'bold' }}
                  className={classes.authorText}
                >
                  {author?.name}
                </Typography>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    {published &&
                      DateTime.fromISO(published).toLocaleString(
                        DateTime.DATETIME_FULL
                      )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid></Grid>
        </Grid>
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
