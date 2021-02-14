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
        {[
          'Members Only Chat',
          'Training and Education',
          'PremiumSupport',
          'Analysis Insights'
        ].map((text) => (
          <Grid item xs={6} key={text}>
            <BulletItem key={text}>{text}</BulletItem>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
