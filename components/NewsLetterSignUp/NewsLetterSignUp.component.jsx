import React from 'react'
import { Typography, Grid, TextField, Button } from '@material-ui/core'
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
    paddingLeft: '20px'
    // marginBottom: theme.spacing(3)
    // borderRadius: '4px'
  },
  inputLabel: {
    marginBottom: theme.spacing(2)
  },
  emailInput: {
    width: '100%'
  }
}))
export default function NewsLetterSignUp() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h6" className={classes.inputLabel}>
            Subscribe to Killer Whale for the latest news and trading updates
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" wrap="nowrap">
            <TextField
              size="small"
              placeholder="Email Address"
              variant="outlined"
              className={classes.emailInput}
              // helperText="Dont worry, we will not spam. You will only get trade insights from our experts and weekly trade predictions."
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: '20px' }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
