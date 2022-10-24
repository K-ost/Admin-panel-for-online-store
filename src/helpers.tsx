import { CatType, ProductType } from "./types"

export const server = 'http://localhost:5000'

export function debounce(callback: any, delay: number) {
  let timeout: any
  return function(...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(args)
    }, delay)
  }
}

export const featsArray = [
  { id: 1, name: 'feat.cpu', title: 'CPU' },
  { id: 2, name: 'feat.screen', title: 'Screen' },
  { id: 3, name: 'feat.screenSize', title: 'Screen size' },
  { id: 4, name: 'feat.camera', title: 'Camera' },
  { id: 5, name: 'feat.memory', title: 'Memory' },
  { id: 6, name: 'feat.battery', title: 'Battery' }
]

export const options = {
  title: "Categories & Products",
  is3D: false
}

// count cats for dashboard
export function countCats(cats: CatType[], products: ProductType[]) {
  const catsTitles = cats.map(el => {
    return {
      id: el.id,
      title: el.title
    }
  })
  return catsTitles.map(el => {
    let count = products.filter(cat => Number(cat.category) === el.id)
    return [el.title, count.length]
  }).sort((a, b) => Number(b[1]) - Number(a[1]))
}

// getCustomDate
export const getCustomDate = (date: number): string => {
  const months = ['January', 'Fedruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const newDate = new Date(date)
  const total = `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`
  return total
}
