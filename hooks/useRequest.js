import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())
const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

export const useGetAffiliates = (path) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const url = baseUrl + path

  const { data: links, error } = useSWR(url, fetcher)

  return { links, error }
}
