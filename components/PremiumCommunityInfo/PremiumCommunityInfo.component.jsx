import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'

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
      <SectionHeader subtitle="Success stories from our Killer Whale pod">
        Spotlight Review
      </SectionHeader>
      <div className={classes.info}>
        <BodyText>
          Being new to crypto I had no idea what I was getting into. Recently
          divorced I found myself with a new found capital. I decided to start
          playing around with cryptocurrency. At first I was doing manual trades
          on coinbase and thought I would be a long term trader. Well being an
          addict by nature I quickly for sucked into the craze lottery
          mentality.
          <br />
          <br />
          After a time I learned about cryptohopper and started bot trading,
          although better than manual there was still allot to learn. My goal
          with crypto was to get to 100k and start to take a passive income of
          about 1% a month and let the rest roll. In 2020 I lost about 10k on my
          own, with a starting capital of about 50k.
          <br />
          <br />
          Towards the end of the year I found the kw strategies and have not
          looked back. I made it to 100k 3 months in, which is insane. Doing so
          well me and my fiancee as using a bit if the profits to fund our
          wedding in May. I have reduced my strategy to just premium signals as
          I am not a deep diver on charts and nurdy stuff and it is overall less
          str we than watching it every day. Hope to stay with kw as long as
          they will have me, to the moon and beyond.
        </BodyText>
        <CaptionText
          style={{
            fontSize: '1.1rem',
            textAlign: 'right'
          }}
        >
          - Todd M.
        </CaptionText>
      </div>
      {/* <Grid container spacing={1}>
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
      </Grid> */}
    </div>
  )
}
