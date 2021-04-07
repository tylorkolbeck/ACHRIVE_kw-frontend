import React, { useEffect } from 'react'
import { userContext } from '../../context/UserContext'
import { logout } from '../../lib/auth'
import Link from 'next/link'
import { appLinks } from '../../lib/app.links'
import { makeStyles } from '@material-ui/core/styles'
import { CgDarkMode } from 'react-icons/cg'
import { useRouter } from 'next/router'
// import { SiDiscord } from 'react-icons/si'

import {
  List,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import BodyText from '../Typography/BodyText/BodyText.component'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuLinks: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  menuButtonLink: {
    marginRight: theme.spacing(2),
    display: 'inline-block',
    fontSize: '16px',
    '&:hover': {
      cursor: 'pointer',
      color: theme.custom.color.teal
    }
  },
  menuButtonUser: {
    marginLeft: theme.spacing(4)
  },
  title: {
    flexGrow: 1,
    position: 'relative',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  logoutLoginDrawerWrapper: {
    padding: '8px 16px',

    '& button': {
      marginLeft: '0px !important'
    }
  },
  navLogo: {
    height: ({ logoHeight }) => logoHeight,
    width: 'auto',
    maxHeight: '40px'
  },
  logoText: {
    fontSize: '24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px'
    }
  }
}))

export default function Nav({ toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [logoHeight, setLogoHeight] = React.useState(40)
  const classes = useStyles({ logoHeight })
  const router = useRouter()

  const { userState, setUserState } = userContext()

  useEffect(() => {
    if (typeof 'window' !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    ;() => {
      window.removeEventListener('scoll', handleScroll)
    }
  }, [])

  function handleScroll() {
    let scrollTop = window.scrollY,
      minHeight = 40,
      logoHeight = Math.max(minHeight, 100 - scrollTop)

    setLogoHeight(logoHeight)
  }

  function logoutHandler() {
    setUserState({ type: 'LOGOUT' })
    logout()
    setMobileMenuOpen(false)
  }

  const logoutLogin = (
    <>
      {userState.user ? (
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            onClick={logoutHandler}
            className={classes.menuButtonUser}
          >
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            className={classes.menuButtonUser}
          >
            Login
          </Button>
        </Link>
      )}
    </>
  )

  const drawer = (
    <div>
      <List className={classes.DrawerLinks}>
        <ListItem button onClick={toggleMobileMenu}>
          <Link href="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        {appLinks.map(({ label, url }) => (
          <ListItem button key={label} onClick={toggleMobileMenu} key={label}>
            <Link href={url}>
              <a>
                <ListItemText primary={label} />
              </a>
            </Link>
          </ListItem>
        ))}

        <ListItem button onClick={toggleDarkMode}>
          <ListItemText primary="Toggle Dark Mode" />
        </ListItem>

        {/* <Divider />
        <div className={classes.logoutLoginDrawerWrapper}>{logoutLogin}</div> */}
      </List>
    </div>
  )

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <IconButton
          onClick={toggleMobileMenu}
          className={classes.closeMenuButton}
        >
          <CloseIcon />
        </IconButton>
        {drawer}
      </Drawer>
      <AppBar
        position="relative"
        style={{
          position: 'fixed'
        }}
      >
        <Toolbar>
          <div className={classes.title}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center'
              }}
            >
              <Link href="/">
                <div style={{ padding: '10px' }}>
                  <img
                    src="/images/kw_logo.png"
                    width="100px"
                    className={classes.navLogo}
                  />
                </div>
              </Link>
              <Link href="/">
                <div className={classes.logoText}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      marginLeft: '10px'
                    }}
                  >
                    Killer
                  </span>
                  <span style={{ fontWeight: '400' }}>Whale</span>
                </div>
              </Link>
            </div>

            {/* <Typography variant="h6" className={classes.title}>
              <Link href="/change-log">
                <span
                  style={{
                    color: '#6270c3',
                    fontSize: '12px',
                    marginLeft: '150px'
                  }}
                >
                  Beta 1.3
                </span>
              </Link>
            </Typography> */}
          </div>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.menuLinks}
          >
            {appLinks.map(({ label, url }) => {
              return (
                <Link href={url} key={`drawer_${label}`}>
                  <a>
                    <Typography
                      variant="h6"
                      className={classes.menuButtonLink}
                      style={{
                        color: router.pathname === url ? '#52c4ed' : ''
                      }}
                    >
                      {label.toUpperCase()}
                    </Typography>
                  </a>
                </Link>
              )
            })}

            <Typography
              onClick={toggleDarkMode}
              className={classes.menuButtonLink}
              variant="h6"
            >
              <CgDarkMode style={{ marginBottom: '-3px' }} />
            </Typography>

            {/* {logoutLogin} */}
          </List>

          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={toggleMobileMenu}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <div
        style={{
          position: 'absolute',
          top: '100px',
          right: '0px',
          // width: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'white',
          borderRadius: '8px 0px 0px 8px',
          padding: '10px 20px',
          flexDirection: 'column'
        }}
      >
        <p style={{ margin: '0px', marginBottom: '10px' }}>Join Us!</p>
        <SiDiscord size="3em" color="black" />
      </div> */}
    </div>
  )
}
