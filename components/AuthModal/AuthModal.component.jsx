import React, { useState } from 'react'
import { userContext } from '../../context/UserContext'
import classes from './AuthModal.module.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextLink from '../../components/Typography/TextLink/TextLink.component'
import { login } from '../../lib/auth'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {
  Container,
  CssBaseline,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Link
} from '@material-ui/core'

export default function AuthModal({ open, setOpen, afterLogin }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const { userState, setUserState } = userContext()

  const [data, updateData] = useState({
    identifier: '',
    password: '',
    rememberMe: ''
  })

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
        setUserState({
          type: 'LOGIN',
          payload: { ...res.data.user, token: res.data.jwt }
        })

        afterLogin()
        setOpen(false)
        // afterLogin()
      })
      .catch((error) => {
        setError(error?.response?.data ? error?.response?.data : {})

        setLoading(false)
      })
  }

  return (
    <Dialog
      open={open}
      onClose={afterLogin}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Please Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To show your support by liking this article please login first.
        </DialogContentText>

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
        </form>
      </DialogContent>
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs>
          <Link href="/forgot-password" variant="body2">
            <TextLink>Forgot password?</TextLink>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2">
            <TextLink>Don't have an account? Sign Up</TextLink>
          </Link>
        </Grid>
      </Grid>
    </Dialog>
  )
}
