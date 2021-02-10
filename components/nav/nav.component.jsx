import React, { useEffect } from 'react'
import { userContext } from '../../context/UserContext'
import { logout } from '../../lib/auth'
import Link from 'next/link'
import { appLinks } from '../../lib/app.links'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { CgDarkMode } from 'react-icons/cg'
import { useRouter } from 'next/router'
import {
  List,
  Drawer,
  IconButton,
  ListItem,
  ListItemText
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'

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
    fontSize: '18px',
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
    position: 'absolute',
    top: '0px',
    left: '20px',
    height: ({ logoHeight }) => logoHeight,
    width: 'auto'
  }
}))

export default function Nav({ toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [logoHeight, setLogoHeight] = React.useState(75)
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
      minHeight = 75,
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
            onClick={logoutHandler}
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
            onClick={logoutHandler}
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
              <ListItemText primary={label} />
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
          // boxShadow: 'none',
          // background: 'transparent',
          position: 'fixed'
        }}
      >
        <Toolbar>
          <div className={classes.title}>
            <Link href="/">
              <img
                src="/KW_logo.png"
                width="100px"
                className={classes.navLogo}
              />
            </Link>
            <Typography variant="h6" className={classes.title}>
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
            </Typography>
          </div>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.menuLinks}
          >
            {appLinks.map(({ label, url }) => {
              return (
                <Link href={url} key={`drawer_${label}`}>
                  <Typography
                    variant="h6"
                    className={classes.menuButtonLink}
                    style={{ color: router.pathname === url ? '#52c4ed' : '' }}
                  >
                    <a>{label.toUpperCase()}</a>
                  </Typography>
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
    </div>
  )
}
