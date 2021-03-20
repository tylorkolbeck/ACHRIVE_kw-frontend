import React from 'react'
import Nav from '../nav/nav.component'
import Footer from '../Footer/Footer.component'
import BackToTop from '../ScrollToTopButton/ScrollToTopButton.component'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    position: 'relative'
  },
  socialLinkContainer: {
    background: theme.custom.color.teal,
    boxShadow: '2px 2px 2px rgba(0,0,0,.3)',
    display: 'flex',
    position: 'fixed',
    top: '50vh',
    right: '0',
    flexDirection: 'column',
    borderRadius: '4px 0px 0px 4px',
    padding: '8px',

    '& img': {
      height: '24px',
      marginBottom: '10px',

      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.2)'
      }
    },
    '& a:last-child img': {
      marginBottom: '0px'
    }
  }
}))

const Layout = ({ children, toggleDarkMode }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Nav toggleDarkMode={toggleDarkMode} />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <BackToTop />

      <div>
        <Footer />
      </div>

      {/* {socialLinks && (
        <div className={classes.socialLinkContainer}>
          {socialLinks?.socialLinks.map((link) => {
            return (
              <a href={link.link} target="_blank" key={link.link}>
                <img src={link.icon.url} />
              </a>
            )
          })}
        </div>
      )} */}
    </div>
  )
}

export default Layout
