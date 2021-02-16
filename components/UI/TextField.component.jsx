import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    '& label.Mui-focused': {
      color: palette.type === 'light' ? palette.grey[900] : '#ffffff'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: palette.type === 'light' ? palette.grey[900] : '#ffffff'
      }
    }
  }
}))

export default function BodyText({ children, ...props }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TextField {...props}>{children}</TextField>
    </div>
  )
}
