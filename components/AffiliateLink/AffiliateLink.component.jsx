import React from 'react'

export default function AffiliateLink({ label, url, imageUrl }) {
  return (
    <a href={url} target="_blank" >
      <img src={imageUrl} alt={label}/>
    </a>
  )
}
