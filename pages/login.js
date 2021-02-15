import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Link
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { login } from '../lib/auth'
import { userContext } from '../context/UserContext'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import TextLink from '../components/Typography/TextLink/TextLink.component'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    marginBottom: '4rem'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = (props) => {
  const classes = useStyles()
  const [data, updateData] = useState({
    identifier: '',
    password: '',
    rememberMe: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const { userState, setUserState } = userContext()

  useEffect(() => {
    if (userState.isAuthenticated) {
      router.push('/') // redirect if you're already logged in
    }
  }, [userState.isAuthenticated])

  const handleChange = (e) => {
    updateData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError({})
    login(data.identifier, data.password, data.rememberMe)
      .then((res) => {
        setLoading(false)
        // set authed User in user context to update header/app state
        setUserState({ type: 'LOGIN', payload: res.data.user })
      })
      .catch((error) => {
        setError(error?.response?.data)
        setLoading(false)
      })
  }

  return (
    <div>
      <PageHeader title="Log in" subTitle="Log in with your email below" />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {Object.entries(error).length !== 0 &&
            error.constructor === Object &&
            error.message.map((error) => {
              return (
                <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                  <small style={{ color: 'red' }}>
                    {error.messages[0].message}
                  </small>
                </div>
              )
            })}
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="identifier"
              autoComplete="email"
              autoFocus
              onChange={(event) => handleChange(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => handleChange(event)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name="rememberMe"
              onChange={(event) => handleChange(event)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleFormSubmit}
            >
              {loading ? 'Loading... ' : 'Login'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  <a>
                    <TextLink>Forgot password?</TextLink>
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  <a>
                    <TextLink>Don't have an account? Sign Up</TextLink>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Login
