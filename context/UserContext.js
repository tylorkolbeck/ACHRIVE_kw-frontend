import { createContext, useContext, useReducer, useEffect } from 'react'
import Cookie from 'js-cookie'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export const UserStateContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case 'LOGOUT':
      return initialState
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get('token')

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove('token')
          setUser(null)
          return null
        }
        const user = await res.json()
        dispatch({ type: 'LOGIN', payload: { ...user, token } })
      })
    }
  }, [])

  return (
    <UserStateContext.Provider value={[state, dispatch]}>
      {children}
    </UserStateContext.Provider>
  )
}

export function userContext() {
  const [userState, setUserState] = useContext(UserStateContext)
  return { userState, setUserState }
}
