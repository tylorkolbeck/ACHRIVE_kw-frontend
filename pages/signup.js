import React, { useState, useContext } from 'react'
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
  FormHelperText
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { registerUser } from '../lib/auth'
// import { AppContext } from '../context/AppContext'
import { userContext } from '../context/UserContext'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import Footer from '../components/Footer/Footer.component'
import { sendEmailConf } from '../lib/auth'

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
    firstName: '',
    lastName: '',
    email: '',
    // username: '',
    discordUsername: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [confirmationSent, setConfirmationSent] = useState(false)
  // const appContext = useContext(AppContext)
  const { userState, setUserState } = userContext()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    console.log(data)
    e.preventDefault()
    setLoading(true)
    setError({})
    if (data.password !== data.passwordConfirmation) {
      setError({
        message: [{ messages: [{ message: 'Passwords must match' }] }]
      })
      setLoading(false)
    } else {
      registerUser(
        data.firstName,
        data.lastName,
        // data.username,
        data.email,
        data.password
      )
        .then((res) => {
          setConfirmationSent(true)
          // set authed user in global context object
          setUserState({ type: 'LOGIN', payload: res.data.user })
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.response.data)
          setError(error?.response?.data)
          setLoading(false)
        })
    }
  }

  const handleResendClick = () => {
    sendEmailConf(data.email)
  }

  return (
    <div>
      <PageHeader title="Sign up" subTitle="Join our Killer Whale pod" />
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
          {!confirmationSent && (
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={data.firstName}
                    disabled={loading}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={data.lastName}
                    disabled={loading}
                    onChange={handleChange}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={data.username}
                    disabled={loading}
                    onChange={handleChange}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="discordUsername"
                    label="Discord Username"
                    name="discordUsername"
                    helperText="(You can always add this later)"
                    value={data.discordUsername}
                    disabled={loading}
                    onChange={handleChange}
                  />
                </Grid>
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
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
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
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
          {confirmationSent && (
            <Grid container justify="center" className={classes.successMessage}>
              <Grid item>
                Thanks, check your email for a confirmation link!
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleResendClick}>
                  {"Didn't get an email? Click to resend."}
                </Link>
              </Grid>
            </Grid>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  )
}
export default Signup
