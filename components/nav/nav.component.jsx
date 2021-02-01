import React from 'react'
import { userContext } from '../../context/UserContext'
import { logout } from '../../lib/auth'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { List } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Nav() {
  const classes = useStyles()

  const { userState, setUserState } = userContext()

  function logoutHandler() {
    setUserState({ type: 'LOGOUT' })
    logout()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Killer Whale
          </Typography>

          <List component="nav" aria-labelledby="main navigation">
            <Link href="/articles">
              <a className={classes.menuButton}>ARTICLES</a>
            </Link>
            <Link href="/premium">
              <a className={classes.menuButton}>PREMIUM</a>
            </Link>
            <Link href="/products">
              <a className={classes.menuButton}>PRODUCTS</a>
            </Link>
            <Link href="/our-story">
              <a className={classes.menuButton}>OUR STORY</a>
            </Link>
            <Link href="/faq">
              <a className={classes.menuButton}>FAQ</a>
            </Link>
          </List>
          {userState.user ? (
            <Link href="/">
              <Button
                variant="contained"
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

// import React from 'react'
// import Link from 'next/link'
// import { userContext } from '../../context/UserContext'
// import { logout } from '../../lib/auth'

// const Nav = () => {
//   const { userState, setUserState } = userContext()

//   function logoutHandler() {
//     setUserState({ type: 'LOGOUT' })
//     logout()
//   }

//   return (
//     <div>
//       <nav className="uk-navbar-container" data-uk-navbar>
//         <div className="uk-navbar-left">
//           <ul className="uk-navbar-nav">
//             <li>
//               <Link href="/">
//                 <a>Killer Whale Crypto</a>
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="uk-navbar-right">
//           <ul className="uk-navbar-nav">
//             <li>
//               {userState.user ? (
//                 <Link href="/">
//                   <a className="nav-link" onClick={logoutHandler}>
//                     Logout
//                   </a>
//                 </Link>
//               ) : (
//                 <Link href="/login">
//                   <a className="nav-link">Login</a>
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Nav
