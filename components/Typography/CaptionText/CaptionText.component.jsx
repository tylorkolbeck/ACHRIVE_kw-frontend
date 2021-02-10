import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    fontSize: '16px',
    fontWeight: 'bold'
  }
}))

export default function BodyText({ children }) {
  const classes = useStyles()
  return (
    <Typography variant="caption" className={classes.root}>
      {children}
    </Typography>
  )
}
