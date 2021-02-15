const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`)
  const products = await response.json()

  return products ? products : []
}

export async function getProductIds() {
  let results = await getProducts()

  let products = results ? results : []

  return products.map((product) => {
    return {
      params: {
        slug: product.slug
      }
    }
  })
}

export async function getProductData(slug) {
  const response = await fetch(`${API_URL}/products/${slug}`)
  const productData = await response.json()

  return {
    slug,
    ...productData
  }
}
