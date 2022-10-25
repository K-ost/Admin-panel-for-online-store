import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { countCats, options, server } from '../helpers'
import { CatType, CommentType, ProductType } from '../types'

const Main: React.FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])
  
  useEffect(() => {
    fetch(`${server}/categories`)
      .then(response => response.json())
      .then(data => setCats(data))
    fetch(`${server}/goods`)
      .then(response => response.json())
      .then(data => setProducts(data))
    fetch(`${server}/comments?_start=0&_end=3`)
      .then(response => response.json())
      .then(data => setComments(data))
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
      <div className="row">
        <div className="col-12 col-lg-7">
          <h5>Categories chart</h5>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="col-12 col-lg-5">
          <h5>Latest comments</h5>
          {comments.map(el => (
            <div key={el.id} className="shortcomment">
              <h6>{el.author}</h6>
              <div className="shortcomment-text" dangerouslySetInnerHTML={{__html: el.body}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main