import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, CssBaseline, Avatar, Grid } from '@material-ui/core'
import Link from 'next/link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { resetPassword } from '../lib/auth'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  successMessage: {
    fontSize: '18px'
  }
}))

const Login = (props) => {
  const router = useRouter()
  const classes = useStyles()
  const [data, setData] = useState({
    code: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  useEffect(() => {
    setData({ ...data, code: router.query.code })
  }, [router.query])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError({})
    resetPassword(data.code, data.password, data.passwordConfirmation)
      .then((res) => {
        setPasswordReset(true)
        setLoading(false)
      })
      .catch((error) => {
        setError(error?.response?.data)
        setLoading(false)
      })
  }

  return (
    <div>
      <PageHeader
        title="Reset Password"
        subtitle="Enter your new password below"
      />
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
          {!passwordReset && (
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFormSubmit}
              >
                {loading ? 'Loading... ' : 'Reset Password'}
              </Button>
            </form>
          )}

          {passwordReset && (
            <Grid container justify="center" className={classes.successMessage}>
              <Grid item>Your password has been successfully reset.</Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  <a>
                    <TextLink>Click here to login</TextLink>
                  </a>
                </Link>
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Login
