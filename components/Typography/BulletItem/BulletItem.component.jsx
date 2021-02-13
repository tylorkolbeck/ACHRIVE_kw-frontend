import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  wingding: {
    '& span': {
      color: theme.palette.secondary.dark,
      paddingRight: '6px'
    }
  },
  text: {
    fontSize: '1rem'
  }
}))

export default function BulletItem({ children }) {
  const classes = useStyles()
  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <Grid item className={classes.wingding}>
        <span>&#9679;</span>
      </Grid>
      <Grid item className={classes.text}>
        {children}
      </Grid>
    </Grid>
  )
}
