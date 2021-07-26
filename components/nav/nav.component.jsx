import React, { useEffect } from 'react'
import { userContext } from '../../context/UserContext'
import { logout } from '../../lib/auth'
import Link from 'next/link'
import { appLinks } from '../../lib/app.links'
import { makeStyles } from '@material-ui/core/styles'
import { CgDarkMode } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { fetchAPI } from '../../lib/api'
import Grid from '@material-ui/core/Grid'
import { IoMdArrowDropdown } from 'react-icons/io'
import Divider from '@material-ui/core/Divider'
import useClickOutside from '../../components/SearchField/clickOutside'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import RootRef from '@material-ui/core/RootRef'

import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button
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

  link: {
    '&:hover': {
      color: theme.custom.color.teal
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
      cursor: 'pointer'
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
  },
  dropdownNavContainer: {
    background: '#212121',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, .5)',
    position: 'absolute',
    top: '40px',
    borderRadius: '4px',
    '& ul': {
      margin: 0,
      padding: 4
    },
    '& li': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: '5px'
    }
  }
}))

export default function Nav({ toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [logoHeight, setLogoHeight] = React.useState(40)
  const classes = useStyles({ logoHeight })
  const router = useRouter()
  const [navigationLinks, setNavigationLinks] = React.useState([])
  const [mobileMenuVideosExpanded, setmobileMenuVideosExpanded] =
    React.useState(false)

  const [dropdownMenuState, setDropdownMenuState] = React.useState([])
  const { ref, isVisible, setIsVisible } = useClickOutside(false)

  const { userState, setUserState } = userContext()

  useEffect(() => {
    if (typeof 'window' !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    ;() => {
      window.removeEventListener('scoll', handleScroll)
    }
  }, [])

  // Fetch video categories to build navigation
  useEffect(() => {
    fetchAPI('/video-categories').then((res) => {
      setNavigationLinks(buildNavigation(res, appLinks))
    })
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

  function buildNavigation(videoCategoriesArray, appLinks) {
    const categoryWithVideos = videoCategoriesArray.filter(
      (cat) => cat.videos.length > 0
    )

    const newLinks = appLinks.map((navObj) => {
      const subNavLinks = []

      if (navObj.label === 'Videos') {
        categoryWithVideos.forEach((subLink) => {
          subNavLinks.push({
            label: subLink.Category,
            url: `/videos/${subLink?.slug?.toLowerCase()}`
          })
        })

        navObj.subLinks = subNavLinks.length > 0 ? subNavLinks : null
        return navObj
      } else {
        return navObj
      }
    })
    return newLinks
  }

  function renderMobileVideoNav({ url, label, subLinks }) {
    if (subLinks && subLinks.length > 0) {
      return (
        <>
          <ListItem
            button
            onClick={() =>
              setmobileMenuVideosExpanded(!mobileMenuVideosExpanded)
            }
          >
            <ListItemText primary="Videos" />
            {mobileMenuVideosExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={mobileMenuVideosExpanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem
                button
                className={classes.nested}
                style={{ paddingLeft: '30px' }}
                onClick={toggleMobileMenu}
              >
                <Link href="/videos">
                  <a>
                    <ListItemText primary="All" />
                  </a>
                </Link>
              </ListItem>
              {subLinks.map((link) => (
                <ListItem
                  button
                  className={classes.nested}
                  style={{ paddingLeft: '30px' }}
                  onClick={toggleMobileMenu}
                  key={`mobile_${link.label}`}
                >
                  <Link href={link.url}>
                    <a>
                      <ListItemText primary={link.label} />
                    </a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      )
    } else {
      return (
        <ListItem button className={classes.nested} onClick={toggleMobileMenu}>
          <Link href={'/videos'}>
            <a>
              <ListItemText primary="Videos" />
            </a>
          </Link>
        </ListItem>
      )
    }
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
      <List component="nav">
        <ListItem button onClick={toggleMobileMenu}>
          <Link href="/">
            <a>
              <ListItemText primary="Home" />
            </a>
          </Link>
        </ListItem>
        {navigationLinks &&
          navigationLinks.map(({ label, url, subLinks }) => (
            <div key={label}>
              {label === 'Videos' ? (
                renderMobileVideoNav({ label, url, subLinks })
              ) : (
                <ListItem button onClick={toggleMobileMenu}>
                  <Link href={url}>
                    <a>
                      <ListItemText primary={label} />
                    </a>
                  </Link>
                </ListItem>
              )}
            </div>
          ))}

        <ListItem button onClick={toggleDarkMode}>
          <ListItemText primary="Toggle Dark Mode" />
        </ListItem>

        <Divider />
        <div className={classes.logoutLoginDrawerWrapper}>{logoutLogin}</div>
      </List>
    </div>
  )

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  function toggleDropdown(label) {
    setDropdownMenuState({
      ...dropdownMenuState,
      [label]: {
        open: !dropdownMenuState[label].open,
        subLinks: dropdownMenuState[label].subLinks
      }
    })
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
          </div>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.menuLinks}
          >
            {navigationLinks.map(({ label, url, subLinks }) => {
              return (
                <React.Fragment key={label}>
                  {!subLinks ? (
                    <Link href={url} key={`drawer_${label}`}>
                      <Typography
                        variant="h6"
                        className={classes.menuButtonLink}
                        style={{
                          color: router.pathname === url ? '#52c4ed' : ''
                        }}
                      >
                        <Grid container>
                          <Grid item className={classes.link}>
                            {label.toUpperCase()}
                          </Grid>
                          <Grid item></Grid>
                        </Grid>
                      </Typography>
                    </Link>
                  ) : (
                    // These are nav items that have sub navigation links(dropdown navigation)
                    <React.Fragment>
                      <Typography
                        variant="h6"
                        className={classes.menuButtonLink}
                      >
                        <Grid container>
                          <RootRef rootRef={ref}>
                            <Grid
                              item
                              className={classes.link}
                              style={{
                                color: router.pathname === url ? '#52c4ed' : '',
                                marginRight: '5px'
                              }}
                              // ref={ref}
                              onClick={() => setIsVisible(!isVisible)}
                            >
                              {label.toUpperCase()}
                            </Grid>
                          </RootRef>
                          {subLinks?.length > 0 && (
                            <Grid item>
                              <IoMdArrowDropdown
                                style={{
                                  marginBottom: '-2px'
                                }}
                              />
                            </Grid>
                          )}

                          {isVisible && subLinks.length > 0 && (
                            <div className={classes.dropdownNavContainer}>
                              <ul>
                                <a href={`/videos`}>
                                  <li className={classes.link}>All Videos</li>
                                </a>
                                {subLinks?.map((link) => (
                                  <li className={classes.link} key={link.label}>
                                    <Link href={link.url}>{link.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Grid>
                      </Typography>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            })}

            <Typography
              onClick={toggleDarkMode}
              className={classes.menuButtonLink}
              variant="h6"
            >
              <CgDarkMode style={{ marginBottom: '-3px' }} />
            </Typography>

            {logoutLogin}
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
