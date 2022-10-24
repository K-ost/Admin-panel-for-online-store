export type CatType = {
  id: number
  title: string
  description: string
}

export type ProductFeatType = {
  cpu: string
  screen: string
  screenSize: string
  camera: string
  memory: string
  battery: string
}

export type ProductType = {
  id: number
  title: string
  description: string
  price: string
  category: number
  image: string
  stock: number
  feat: ProductFeatType
}

export type CommentType = {
  id: number
  body: string
  productId: number
  author: string
  date: number
}