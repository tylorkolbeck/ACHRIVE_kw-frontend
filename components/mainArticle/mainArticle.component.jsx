import React from 'react'
import Image from '../image/image.component'
import { Typography } from '@material-ui/core'
import Link from 'next/link'

const MainArticle = ({ latestArticle }) => {
  const imgStyles = {maxWidth: '100%', overFlow: 'hidden'}
  return (
    <>
    <Link href={`/article/${latestArticle.slug}`} color="inherit">
      <a>
        <Image style={imgStyles} image={latestArticle.image} />
        <Typography variant='h3' component='h1'>{latestArticle.title}</Typography>
        <Typography>{latestArticle.author.name}</Typography>
        <Typography>{latestArticle.description}</Typography>
      </a>
    </Link>
    </>
  )
}

export default MainArticle