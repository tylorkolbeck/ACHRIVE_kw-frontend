import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Grid } from '@material-ui/core'
import { appLinks } from '../../lib/app.links'
import BodyText from '../Typography/BodyText/BodyText.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      background: theme.palette.grey[900],
      color: 'white',
      padding: theme.spacing(3)
    },
    link: {
      marginRight: theme.spacing(2),
      color: 'white'
    }
  }
})

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container alignItems="space-between">
        <Grid item sm={6}>
          <Grid container style={{ marginBottom: '20px' }}>
            <Grid item xs={12}>
              <BodyText
                variant="caption"
                color="white"
                className={classes.caption}
              >
                View our{' '}
                <a href="/privacypolicy" style={{ color: 'rgb(82, 196, 237)' }}>
                  Privacy Policy
                </a>{' '}
              </BodyText>
            </Grid>
            <Grid item xs={12}>
              <BodyText
                variant="caption"
                color="white"
                className={classes.caption}
              >
                View our{' '}
                <a
                  href="/risk-disclosure"
                  style={{ color: 'rgb(82, 196, 237)' }}
                >
                  Risk Disclosure
                </a>{' '}
              </BodyText>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sm={6}
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {appLinks.map((link) => (
            <Link href={link.url} key={link.label}>
              <a className={classes.link} key={link.label}>
                {link?.label.toUpperCase()}
              </a>
            </Link>
          ))}
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item>Copyright Killer Whale 2021</Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  )
}
