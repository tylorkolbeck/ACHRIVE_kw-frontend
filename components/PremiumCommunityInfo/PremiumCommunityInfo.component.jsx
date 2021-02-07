import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& > p': {
        marginBottom: '10px'
      }
    },
    info: {
      marginBottom: theme.spacing(2)
    },
    wingding: {
      color: theme.custom.color.green
    },
    CTAWrapper: {
      marginTop: theme.spacing(3)
    }
  }
})

export default function PremiumCommunityInfo() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <Typography variant="body2" component="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore,
          laborum!
        </Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          maiores quas neque minima ea ipsa. Mollitia tempora eum optio nisi!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
          maiores?
        </Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <span className={classes.wingding}>&#9679;</span> Members Only Chat
        </Grid>
        <Grid item xs={6}>
          <span className={classes.wingding}>&#9679;</span> Training and
          Education
        </Grid>
        <Grid item xs={6}>
          <span className={classes.wingding}>&#9679;</span> Premium Support
        </Grid>
        <Grid item xs={6}>
          <span className={classes.wingding}>&#9679;</span> Premium Analysis
        </Grid>
      </Grid>
      <Grid container className={classes.CTAWrapper}>
        <Button variant="contained" color="secondary">
          Join The Community
        </Button>
      </Grid>
    </div>
  )
}
