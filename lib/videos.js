const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

export async function getSortedVideoData() {
  const response = await fetch(`${API_URL}/videos?_sort=publishedAt:DESC`)

  try {
    const videos = await response.json()
    return videos
  } catch (error) {
    return []
  }
}

export async function getAllVideoIds() {
  const videos = await getSortedVideoData()

  return videos.map((video) => {
    return {
      params: {
        slug: video.slug
      }
    }
  })
}

export async function getVideoData(slug) {
  const response = await fetch(`${API_URL}/videos/${slug}`)
  const videoData = await response.json()

  return {
    slug,
    ...videoData
  }
}
