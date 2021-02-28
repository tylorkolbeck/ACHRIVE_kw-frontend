import React, { useState } from 'react'
import { Grid, TextField, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'
import Button from '../UI/Button.component'
import { postNewsletterEmail } from '../../lib/newsletter'

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: `4px solid ${theme.palette.secondary.dark}`,
    padding: '10px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    '& h6': {
      margin: '0px'
    },
    '& button': {
      marginLeft: '20px',
      [theme.breakpoints.down('md')]: {
        marginLeft: '0px'
      }
    }
  },
  inputLabel: {
    paddingBottom: theme.spacing(2)
  },
  emailInput: {
    width: '100%',

    marginBottom: '20px',
    '& input': {
      background: 'white',
      borderRadius: '4px',
      color: '#212121'
    }
  },

  privacyPolicy: {
    color: theme.palette.secondary.light
  },
  privacyPolicyLink: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.secondary.main
        : theme.custom.color.teal
  }
}))
export default function NewsLetterSignUp() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setErrorMsg(null)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)
    if (validateEmail(email)) {
      postNewsletterEmail(email)
        .then((res) => {
          setEmail('')
          setLoading(false)
          setSuccessMsg(true)
          setHidden(true)
        })
        .catch((error) => {
          setLoading(false)
          setErrorMsg(error.message)
        })
    }
  }

  const validateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true
    }
    setLoading(false)
    setErrorMsg('Invalid email')
    return false
  }

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <SectionHeader>Subscribe for the Latest Updates</SectionHeader>
        </Grid>
        {!hidden && (
          <form onSubmit={handleFormSubmit}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={10}>
                  <TextField
                    size="small"
                    placeholder="Email Address"
                    type="email"
                    variant="outlined"
                    required
                    className={classes.emailInput}
                    value={email}
                    disabled={loading}
                    error={errorMsg ? true : false}
                    onChange={(event) => handleChange(event)}
                    helperText={errorMsg && errorMsg}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Button
                    type="button"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    onClick={handleFormSubmit}
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
        <CaptionText>
          {successMsg ? (
            'Thanks for signing up!'
          ) : (
            <span style={{ fontWeight: 'normal', fontSize: '12px' }}>
              * We do not spam or sell your info.{' '}
              <span className={classes.privacyPolicyLink}>
                <a href="/privacypolicy">Privacy Policy</a>
              </span>
            </span>
          )}
        </CaptionText>
      </Grid>
    </Paper>
  )
}
