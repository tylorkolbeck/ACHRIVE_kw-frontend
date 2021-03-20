import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import TextLink from '../Typography/TextLink/TextLink.component'
import Markdown from '../../components/Markdown/Markdown.component'

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

export default function ContactUsForm({ data }) {
  const { contentBody, formUrl, heading, subtitle, linkLabel } = data
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SectionHeader subtitle={subtitle}>{heading}</SectionHeader>
      <div className={classes.info}>
        <Markdown source={contentBody} />

        <TextLink icon>
          <a href={formUrl} target="_blank">
            {linkLabel}
          </a>
        </TextLink>
      </div>
    </div>
  )
}
