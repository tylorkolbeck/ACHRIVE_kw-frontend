import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BodyText from '../Typography/BodyText/BodyText.component'

const useStyles = makeStyles((theme) => ({
  root: {
    '& p': {
      color: theme.palette.type === 'dark' ? 'lightgrey' : 'grey',
      fontSize: '20px',
      marginTop: '20px',
      marginBottom: '20px'
    }
  }
}))

export default function Description({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BodyText fontSize="20px">{children}</BodyText>
    </div>
  )
}
