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
      padding: theme.spacing(3),
      paddingBottom: '100px'
    },
    link: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
    socialIconContainer: {
      '& img': {
        background: 'white',
        borderRadius: '4px',
        padding: '3px',
        margin: '8px',
        width: '24px',
        height: '24px'
      }
    },
    affiliateLinkContainer: {
      '& img': {
        background: 'rgba(255,255,255,0.25)',
        borderRadius: '4px',
        padding: '6px',
        margin: '8px',
        height: '30px'
      }
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
        <Grid item>
          {appLinks.map((link) => (
            <Link href={link.url} key={`nav_${link.label}`} key={link.label}>
              <a className={classes.link} key={link.label}>
                {link?.label.toUpperCase()}
              </a>
            </Link>
          ))}
        </Grid>
        <Grid item className={classes.socialIconContainer}>
          <h4>Follow Us</h4>

          {socialLinks &&
            socialLinks?.socialLinks?.map((link) => {
              return (
                <a href={link.link} key={`social_${link.link}`} target="_blank">
                  <img src={link.icon.url} />
                </a>
              )
            })}
        </Grid>
      </Grid>

      <Grid item className={classes.affiliateLinkContainer}>
        {error && <p>Error getting links</p>}
        {!links && <p>Loading links...</p>}
        {links?.Links && (
          <>
            {links.Links.map((l) => (
              <AffiliateLink
                key={`aff${l.id}`}
                url={l?.link?.url}
                label={l?.link?.label}
                imageUrl={l?.link?.linkImage[0].url}
              />
            ))}
          </>
        )}
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="baseline"
        style={{
          textAlign: 'center',
          fontSize: '12px',
          textDecoration: 'italic',
          marginTop: '50px'
        }}
      >
        <Grid item>
          View KillerWhale's{' '}
          <a
            href="/privacypolicy"
            target="_blank"
            style={{ color: 'rgb(82, 196, 237)', marginRight: '10px' }}
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
