import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    '& h4': {
      fontWeight: 'bold',

      marginBottom: (props) => {
        if (props.subTitle) return spacing(0)
        else return spacing(1)
      }
    },
    '& h6': {
      fontWeight: '400',
      marginBottom: spacing(3)
    }
  }
}))

export default function BodyText(props) {
  const classes = useStyles(props)

  return (
    <div className={classes.root} onClick={props.onClick}>
      <Typography variant="h4">{props.children}</Typography>
      {props.subTitle && <Typography variant="h6">{props.subTitle}</Typography>}
    </div>
  )
}
