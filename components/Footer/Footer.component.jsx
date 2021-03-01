import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Grid } from '@material-ui/core'
import { appLinks } from '../../lib/app.links'
import { useGetAffiliates, useGetSocialLinks } from '../../hooks/useRequest'
import AffiliateLink from '../../components/AffiliateLink/AffiliateLink.component'

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
  const { links, error } = useGetAffiliates('/affiliate-links')
  const { socialLinks, socialError } = useGetSocialLinks('/social-links')

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container justify="space-between" style={{ margin: '20px auto' }}>
        <Grid
          item
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
        <Grid
          item
          style={{
            display: 'flex',
            background: 'white',
            padding: '10px'
          }}
        >
          {socialLinks &&
            socialLinks?.socialLinks.map((link) => {
              return (
                <div>
                  <a href={link.link} target="_blank">
                    <img
                      style={{ width: '24px', marginRight: '10px' }}
                      src={link.icon.url}
                    />
                  </a>
                </div>
              )
            })}
        </Grid>
      </Grid>
      <Grid container style={{ margin: '20px auto' }}>
        <Grid item>
          <Grid item>
            {/* <Typography variant="h6">Our Affiliates</Typography> */}
          </Grid>
          <Grid item>
            {error && <p>Error getting links</p>}
            {!links && <p>Loading links...</p>}
            {links?.Links && (
              <Grid item>
                {links.Links.map((l) => (
                  <AffiliateLink
                    key={l?.id}
                    url={l?.link?.url}
                    label={l?.link?.label}
                    imageUrl={l?.link?.linkImage[0].url}
                  />
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="baseline"
        style={{
          textAlign: 'center',
          fontSize: '12px',
          textDecoration: 'italic'
        }}
      >
        <Grid item>
          View KillerWhale's{' '}
          <a
            href="/privacypolicy"
            target="_blank"
            style={{ color: 'rgb(82, 196, 237)' }}
          >
            Privacy Policy
          </a>{' '}
        </Grid>
        <Grid item>
          <a
            href="/risk-disclosure"
            target="_blank"
            style={{ color: 'rgb(82, 196, 237)' }}
          >
            Risk Disclosure
          </a>{' '}
        </Grid>
        <Grid item xs={12}>
          Copyright Killer Whale 2021
        </Grid>
      </Grid>
    </div>
  )
}
