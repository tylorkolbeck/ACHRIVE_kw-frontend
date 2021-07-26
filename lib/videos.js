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

export async function getAllVideoCategoriesPaths() {
  const videoCategories = await fetch(`${API_URL}/video-categories`)

  try {
    const videosCategories = await videoCategories.json()

    return videosCategories.map((category) => {
      return {
        params: {
          slug: category.slug
        }
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getVideoCategoryData(slug) {
  const videos = await fetch(`${API_URL}/video-categories?slug=${slug}`)
  const videoData = await videos.json()

  return {
    slug,
    videoData
  }
}

export async function getVideoData(slug) {
  const response = await fetch(`${API_URL}/videos/${slug}`)
  const videoData = await response.json()

  return {
    slug,
    ...videoData
  }
}
