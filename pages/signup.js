import React, { useState } from 'react'
import {
  Button,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import Link from 'next/link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { userContext } from '../context/UserContext'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { sendEmailConf, registerUser } from '../lib/auth'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import TextField from '../components/UI/TextField.component'

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  successMessage: {
    fontSize: '18px'
  }
}))

const Signup = () => {
  const classes = useStyles()
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    subscribedToNewsletter: true,
    username: 'nousername'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [confirmationSent, setConfirmationSent] = useState(false)
  const { setUserState } = userContext()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError({})
    if (data.password !== data.passwordConfirmation) {
      setError({
        message: [
          {
            messages: [
              { message: 'Passwords must match', id: 'Passwords must match' }
            ]
          }
        ]
      })
      setLoading(false)
    } else {
      registerUser(data)
        .then((res) => {
          console.log('REGISTERED', data)
          setConfirmationSent(true)
          // set authed user in global context object
          // setUserState({
          //   type: 'LOGIN',
          //   payload: { ...res.data.user, token: res.data.jwt }
          // })
          setLoading(false)
        })
        .catch((error) => {
          console.log('ERROR', error)

          if (error?.response?.data?.message) {
            setError(error?.response?.data)
            console.log(error.response)
          } else {
            setError({ message: [] })
            console.log(error)
          }

          setLoading(false)
        })
    }
  }

  const handleResendClick = () => {
    sendEmailConf(data.email)
  }

  return (
    <div>
      <PageHeader title="Sign up" subtitle="Join our Killer Whale pod" />
      <div style={{ minHeight: '50vh' }}>
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            {/* {Object.entries(error).length !== 0 &&
              error.constructor === Object &&
              error.message.map((error) => {
                return (
                  <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                    <small style={{ color: 'red' }}>
                      {error.messages[0].message}
                    </small>
                  </div>
                )
              })} */}

            {Array.isArray(error?.message) &&
              error?.message?.map((error) => {
                return (
                  <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                    <small style={{ color: 'red' }}>
                      {error.messages[0].message}
                    </small>
                  </div>
                )
              })}
            {!confirmationSent && (
              <form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={data.email}
                      disabled={loading}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={data.password}
                      disabled={loading}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label="Confirm Password"
                      type="password"
                      id="passwordConfirmation"
                      autoComplete="current-password"
                      value={data.passwordConfirmation}
                      disabled={loading}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.subscribedToNewsletter}
                          name="subscribedToNewsletter"
                          onChange={(e) =>
                            setData({
                              ...data,
                              subscribedToNewsletter: e.target.checked
                            })
                          }
                          color="primary"
                        />
                      }
                      label="Signup up for newsletters from Killer Whale Crypto"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                  onClick={handleFormSubmit}
                >
                  {loading ? 'Loading..' : 'Signup'}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      <a>
                        <TextLink>Already have an account? Login</TextLink>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
            {confirmationSent && (
              <Grid
                container
                justify="center"
                className={classes.successMessage}
                spacing={3}
              >
                <Grid item style={{ textAlign: 'center' }}>
                  Thank you, check your email for a confirmation link to
                  activate your account!
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleResendClick}>
                    <a>
                      <TextLink>Didn't get an email? Click to resend.</TextLink>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}
export default Signup
