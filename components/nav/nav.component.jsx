import React from 'react'
import Link from 'next/link'
import { userContext } from '../../context/UserContext'
import { logout } from '../../lib/auth'

const Nav = () => {
  const { userState, setUserState } = userContext()

  function logoutHandler() {
    setUserState({ type: 'LOGOUT' })
    logout()
  }

  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Killer Whale Crypto</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              {userState.user ? (
                <Link href="/">
                  <a className="nav-link" onClick={logoutHandler}>
                    Logout
                  </a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className="nav-link">Login</a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
