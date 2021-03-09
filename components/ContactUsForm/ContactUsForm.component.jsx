import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    }
  }
})

export default function ContactUsForm({url}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SectionHeader subtitle="Have your portfolio professionally managed by Killer Whale">
        Account Management
      </SectionHeader>
      <div className={classes.info}>
        <BodyText>
          Killer Whale's talented team of investors are available to manage your 
          portfolio and help you navigate the crypto landscape. 
        </BodyText>
        <TextLink icon><a href={url} target='_blank'>Complete this form to learn more</a></TextLink>
      </div>
    </div>
  )
}
