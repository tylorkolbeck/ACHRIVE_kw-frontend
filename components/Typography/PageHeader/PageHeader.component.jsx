import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import DiscordCTA from '../../DiscordCTA/DiscordCTA.component'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.custom.screen.navBarHeight,
    background: theme.palette.grey[900]
  },
  content: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: 'white',
    paddingBottom: '0px'
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  },
  subTitle: {
    marginTop: theme.spacing(2),
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem'
    }
  }
}))

export default function PageHeader({ title, subtitle }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.subTitle}>
          {subtitle}
        </Typography>
        <DiscordCTA />
      </div>
    </div>
  )
}
