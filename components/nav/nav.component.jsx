import React, { useContext } from 'react'
import Link from 'next/link'
import { logout } from '../../lib/auth'
import AppContext from '../../context/AppContext'

const Nav = ({ categories }) => {
  const { user, setUser } = useContext(AppContext)

  return (
    <div>
      <nav className='uk-navbar-container' data-uk-navbar>
        <div className='uk-navbar-left'>
          <ul className='uk-navbar-nav'>
            <li>
              <Link href='/'>
                <a>Killer Whale Crypto</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='uk-navbar-right'>
          <ul className='uk-navbar-nav'>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link as={`/category/${category.slug}`} href='/category/[id]'>
                    <a className='uk-link-reset'>{category.name}</a>
                  </Link>
                </li>
              )
            })}
            <li>
              {user ? (
                <Link href='/'>
                  <a
                    className='nav-link'
                    onClick={() => {
                      logout()
                      setUser(null)
                    }}
                  >
                    Logout
                  </a>
                </Link>
              ) : (
                <Link href='/login'>
                  <a className='nav-link'>Login</a>
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
