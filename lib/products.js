const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

export async function getProducts() {
  const response = await fetch(`${API_URL}/products?`)
  const products = await response.json()
  return products
}

export async function getProductIds() {
  const products = await getProducts()

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
