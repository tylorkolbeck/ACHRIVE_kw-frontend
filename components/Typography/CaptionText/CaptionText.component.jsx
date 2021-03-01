import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'block'
  }
}))

export default function BodyText({ children, ...props }) {
  const classes = useStyles()
  return (
    <Typography variant="p" className={classes.root} {...props}>
      {children}
    </Typography>
  )
}
