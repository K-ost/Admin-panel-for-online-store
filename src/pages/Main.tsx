import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { countCats, options, server } from '../helpers'
import { CatType, ProductType } from '../types'

const Main: React.FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  
  useEffect(() => {
    fetch(`${server}/categories`)
      .then(response => response.json())
      .then(data => {
        setCats(data)
      })
    fetch(`${server}/goods`)
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
  }, [])

  const totalCats = countCats(cats, products) 
  
  // Chart data
  const data = [
    ["Categories", "Number of products"],
    ...totalCats
  ]

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Dashboard</p>

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />

    </div>
  )
}

export default Main