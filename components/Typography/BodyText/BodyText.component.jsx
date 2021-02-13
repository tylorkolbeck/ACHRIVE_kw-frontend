import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette, props }) => ({
  root: {
    color: ({ color }) => {
      if (color) {
        return color
      } else {
        return palette.type === 'light' ? 'rgba(0,0,0,.8)' : 'white'
      }
    },
    marginBottom: '10px',
    fontSize: '16px'
  }
}))

export default function BodyText({ children, color }) {
  const classes = useStyles({ color })
  return (
    <Typography variant="body1" className={classes.root}>
      {children}
    </Typography>
  )
}
