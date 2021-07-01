import React from 'react'

import BodyText from '../../components/Typography/BodyText/BodyText.component'

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  EmailIcon,
  EmailShareButton
} from 'react-share'
import Grid from '@material-ui/core/Grid'

export default function SocialMediaShare({ url }) {
  const ICON_SIZE = '38'
  const IS_ROUND = true
  return (
    <Grid item container spacing={1}>
      <Grid item xs={12}>
        <BodyText style={{ fontWeight: 'bold', margin: '10px 0px' }}>
          Share on...
        </BodyText>
      </Grid>
      <Grid item>
        <FacebookShareButton url={url}>
          <FacebookIcon round={IS_ROUND} size={ICON_SIZE} />
        </FacebookShareButton>
      </Grid>
      <Grid item>
        <TwitterShareButton url={url}>
          <TwitterIcon round={IS_ROUND} size={ICON_SIZE}></TwitterIcon>
        </TwitterShareButton>
      </Grid>
      <Grid item>
        <FacebookMessengerShareButton>
          <FacebookMessengerIcon round={IS_ROUND} size={ICON_SIZE} />
        </FacebookMessengerShareButton>
      </Grid>
      <Grid item>
        <RedditShareButton url={url}>
          <RedditIcon round={IS_ROUND} size={ICON_SIZE} />
        </RedditShareButton>
      </Grid>
      <Grid item>
        <TelegramShareButton url={url}>
          <TelegramIcon round={IS_ROUND} size={ICON_SIZE} />
        </TelegramShareButton>
      </Grid>
      <Grid item>
        <EmailShareButton url={url}>
          <EmailIcon round={IS_ROUND} size={ICON_SIZE} />
        </EmailShareButton>
      </Grid>
    </Grid>
  )
}
