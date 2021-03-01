import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    review: {
      marginBottom: theme.spacing(3)
    },
    quoteIcon: {
      color: theme.palette.secondary.dark,
      marginRight: theme.spacing(1),
      fontSize: '30px'
    },
    reviewText: {
      marginBottom: theme.spacing(2)
    },
    IconRound: {
      background: theme.palette.secondary.main,
      borderRadius: '50%',
      height: '50px',
      width: '50px',
      padding: '10px',
      color: 'white',
      marginRight: '20px',
      float: 'left'
    }
  }
})

export default function Review() {
  const classes = useStyles()

  const reviewData = [
    {
      id: 1,
      text:
        "When I first started using crypto hopper I had a lot of questions and nobody to ask, not a lot of my friends in real life are into crypto, then I found the Killer Whale team on the telegram channel who all helped me understand the individual settings, how the bot operates, the strategies, current market conditions, inside trades, suggested settings, realistic goals and more. It has become a daily hang out spot for like minded individuals who all share a common goal that is to learn and better themselves as traders, the group wasn't the reason I joined but it is the reason I stayed long enough to crush the markets with all the other Killer Whales!",
      author: 'Alex Young'
    },
    {
      id: 2,
      text:
        'Getting into the crypto market for the first time with no trading experience was really scary, I made some good moves followed by moves twice as bad! Fortunately, the Killer Whale bot & community taught me a lot, namely that this is a game which takes PATIENCE and TIMING!! While I was impatient at first, I finally lightened up and let the KW products run as intended and MAN was that the best move I could have made. Some days will be down, but if you hold on and trust the indicators, you will make GOOD returns!',
      author: 'Kaiser Drakkor'
    },
    {
      id: 3,
      text:
        'Why do I recommend Killer Whale strategy or signal? Because it simply does what is says in the description but has an important extra feature. Number one is that the owner Dylan always tries to better it and adapt the strategy or signal to the market. And the number two which is almost just as important is the community behind it. They help you set it all up and discuss and test the settings to get the most out of it. I also found it to work on all Cryptohopper supported exchanges because it has many pre built strategies to work from. Whether you are a pro or a beginner it gives you a very good base to start with.',
      author: 'Berend Btoje'
    }
  ]
  return (
    <div className={classes.root}>
      <SectionHeader subtitle="Hear from our pod">Pulse</SectionHeader>
      {reviewData.map((review) => (
        <div className={classes.review} key={review.id}>
          <BodyText style={{ fontStyle: 'italic' }}>
            <FormatQuoteIcon className={classes.IconRound} />
            {review.text.slice(0, 200)}...
          </BodyText>
          <CaptionText
            style={{
              fontSize: '1.1rem',
              textAlign: 'right'
            }}
          >
            - {review.author}
          </CaptionText>
        </div>
      ))}
    </div>
  )
}
