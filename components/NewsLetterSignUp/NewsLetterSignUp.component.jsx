import React from 'react'
import { Typography, Grid, TextField, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    // borderTop: `2px solid ${theme.palette.secondary.main}`,
    // paddingTop: theme.spacing(2),
    // marginTop: theme.spacing(5)
    // marginBottom: theme.spacing(3)
    // borderLeft: `4px solid ${theme.custom.color.green}`,
    borderLeft: `4px solid ${theme.palette.secondary.light}`,
    padding: '10px',
    paddingBottom: '20px',
    // paddingLeft: '20px',
    // background: theme.palette.secondary.light,
    // color: 'white',
    // borderRadius: '4px',
    paddingLeft: '20px',
    paddingRight: '20px',
    '& h6': {
      margin: '0px'
      // marginBottom: '20px'
      // padding: '0px'
    },
    '& button': {
      background: theme.custom.color.green,
      marginLeft: '20px',
      color: 'white'
    }
    // marginBottom: theme.spacing(3)
    // borderRadius: '4px'
  },
  inputLabel: {
    paddingBottom: theme.spacing(2)
  },
  emailInput: {
    width: '100%',
    '& input': {
      background: 'white',
      borderRadius: '4px'
    }
  },

  privacyPolicy: {
    color: theme.palette.secondary.light
  }
}))
export default function NewsLetterSignUp() {
  const classes = useStyles()
  return (
    <Paper elevation={1} className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Subscribe to Killer Whale for the Latest News and Trading Updates
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" wrap="nowrap">
            <TextField
              size="small"
              placeholder="Email Address"
              variant="outlined"
              className={classes.emailInput}
              helperText={
                <Typography variant="caption">
                  Dont worry, we will not spam. You will only get trade insights
                  from our experts and weekly trade predictions.
                  <a href="#" className={classes.privacyPolicy}>
                    Privacy Policy
                  </a>
                </Typography>
              }
            />
            <Grid item>
              <Button variant="contained" className={classes.signupButton}>
                Signup
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
