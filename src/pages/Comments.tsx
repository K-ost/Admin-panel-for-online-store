import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Comment from '../components/Comment'
import Loader from '../components/Loader'
import { server } from '../helpers'
import { RootState } from '../store/store'
import { CommentType } from '../types'

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([])
  const refetch = useSelector((state: RootState) => state.app.refetch)

  useEffect(() => {
    fetch(`${server}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
  }, [refetch])
  
  return (
    <div>
      <h1>Comments</h1>
      <Loader list={comments} />
      {comments.map(el => <Comment key={el.id} el={el} />)}
    </div>
  )
}

export default Comments