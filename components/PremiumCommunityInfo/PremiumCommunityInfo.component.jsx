import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import BulletItem from '../Typography/BulletItem/BulletItem.component'

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
      <SectionHeader subtitle="Be a part of the active Killer Whale Pod!">
        Pod Membership
      </SectionHeader>
      <div className={classes.info}>
        <BodyText>
          Killer Whale offers various levels of site membership from our free
          Calf level up to the ultimate Blue Whale membership Each level offers
          advanced materials, articles, education videos and guides, indepth
          analysis and market insights and more Whether you are just getting
          started and are a newborn calk in the world of automated trading or
          are ready to rule the oceans as a mighty Blue Whale, Killer Whale
          offers a membership level for you.
        </BodyText>
        <BodyText>
          Come join our pod now and never be alone again in the dangerous waters
          of crypto
        </BodyText>
      </div>
      <Grid container spacing={1}>
        {[
          'Members Only Chat',
          'Training and Education',
          'Premium Support',
          'Chart Insights'
        ].map((text) => (
          <Grid item xs={6} key={text}>
            <BulletItem key={text}>{text}</BulletItem>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
