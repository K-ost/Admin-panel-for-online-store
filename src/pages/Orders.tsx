import React, { useState } from 'react'
import Order from '../components/Order'
import { server } from '../helpers'
import { CatType } from '../types'

const Orders: React.FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const showCats = () => {
    fetch(`${server}/categories`)
      .then(response => response.json())
      .then(data => setCats(data))
  }

  return (
    <div>
      <h1>Orders</h1>
      <button className="btn btn-outline-primary" onClick={showCats} data-testid="showbtn">Show cats</button>

      <h4>Cats</h4>
      {
        cats.length ?
        <ul>
          {cats.map(el => <li data-testid={`test-${el.id}`} key={el.id}>{el.title}</li>)}
        </ul> :
        'Cats not found'
      }

      <Order />
    </div>
  )
}

export default Orders