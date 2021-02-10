import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    background: palette.secondary.main,
    color: ' white',
    padding: '2px 4px',
    // color:
    //   palette.type === 'light' ? palette.secondary.dark : custom.color.teal,
    fontSize: '18px',
    marginBottom: '10px',
    textTransform: 'uppercase'
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
