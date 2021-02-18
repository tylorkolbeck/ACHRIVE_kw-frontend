import React from 'react'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import BulletItem from '../../components/Typography/BulletItem/BulletItem.component'

const useStyles = makeStyles((theme) => {
  return {
    markdownStyling: {
      position: 'relative',
      '& img': {
        maxWidth: '100%',
        padding: '20px',
        paddingTop: '40px',
        paddingBottom: '40px'
      },

      '& span': {
        width: '100%',
        display: 'block'
      },
      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%'
      },

      '& .video': {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '56.25%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
      }
    },
    orderedList: {
      fontSize: '1rem'
    }
  }
})

export default function Markdown({ source }) {
  const classes = useStyles()

  const renderers = {
    paragraph: ({ children }) => {
      return (
        <BodyText fontSize="20px" lineHeight="30px">
          {children}
        </BodyText>
      )
    },
    link: ({ href, children }) => {
      return (
        <a href={href} style={{ color: 'dodgerblue' }}>
          {children}
        </a>
      )
    },
    list: ({ ordered, children }) => {
      if (!ordered) {
        return children.map((item, index) => (
          <BulletItem style={{ paddingLeft: '20px' }} key={index}>
            {item}
          </BulletItem>
        ))
      } else {
        return <ol className={classes.orderedList}>{children}</ol>
      }
    }
  }
  return (
    <div className={classes.markdownStyling}>
      <ReactMarkdown renderers={renderers} source={source} escapeHtml={false} />
    </div>
  )
}
