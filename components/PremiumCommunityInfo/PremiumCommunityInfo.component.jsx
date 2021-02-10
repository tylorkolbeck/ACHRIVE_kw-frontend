import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import TextLink from '../Typography/TextLink/TextLink.component'

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
      width: '100%',
      marginTop: theme.spacing(3),
      '& button': {
        width: '100%'
      }
    }
  }
})

export default function PremiumCommunityInfo() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SectionHeader subTitle="Be a part of the active Killer Whale Pod!">
        Premium Community
      </SectionHeader>
      <div className={classes.info}>
        <BodyText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore,
          laborum!
        </BodyText>
        <BodyText>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          maiores quas neque minima ea ipsa. Mollitia tempora eum optio nisi!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero,
          maiores?
        </BodyText>
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
      <Grid item className={classes.CTAWrapper}>
        <a>
          <TextLink icon>Join The Community</TextLink>
        </a>
      </Grid>
    </div>
  )
}
