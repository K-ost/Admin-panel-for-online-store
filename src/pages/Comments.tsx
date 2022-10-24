import React, { useEffect, useState } from 'react'
import ItemBox from '../components/ItemBox'
import { getCustomDate, server } from '../helpers'
import { CommentType } from '../types'

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    fetch(`${server}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
  }, [])
  

  return (
    <div>
      <h1>Comments</h1>

      {comments.map(el => {
        const date = getCustomDate(el.date)
        return <div className="comment" key={el.id}>
          <h4>{el.author}</h4>
          <p>{date}<br />
          <i>To product: {el.productId}</i></p>
          <div dangerouslySetInnerHTML={{__html: el.body}}></div>
        </div>
      })}
      
    </div>
  )
}

export default Comments