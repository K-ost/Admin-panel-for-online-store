import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { server } from '../helpers'
import { setNotice, setRefetch, showNotice } from '../store/appSlice'
import { AppDispatch, RootState } from '../store/store'
import { CommentType } from '../types'

const EditComment: React.FC = () => {
  const { id } = useParams()
  const [comment, setComment] = useState<CommentType | null>(null)
  const [commentText, setCommentText] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const refetch = useSelector((state: RootState) => state.app.refetch)

  useEffect(() => {
    fetch(`${server}/comments/${id}`)
      .then(response => response.json())
      .then((data: CommentType) => {
        setComment(data)
        setCommentText(data.body)
      })
  }, [id])

  // changeComment
  const changeComment = (e: any) => {
    e.preventDefault()
    dispatch(setRefetch(true))
    const updatedComment = { ...comment }
    updatedComment.body = commentText
    delete updatedComment.id
    fetch(`${server}/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment)
    }).then(response => {
      if (response.status === 200) {
        dispatch(setRefetch(false))
      }
    })
    dispatch(showNotice(true))
    dispatch(setNotice(`The comment ID: "${id}" has been edited`))
  }

  return (
    <div>
      <h1>Edit comment ID: {id}</h1>
      <form onSubmit={changeComment}>
        <div className="form-field">
          <label className="form-label">Comment text</label>
          <textarea className="form-control" defaultValue={comment?.body} onChange={e => setCommentText(e.target.value)}></textarea>
        </div>
        <Link to="/comments" className="btn btn-outline-secondary me-2">&larr; Back to comments</Link>
        <button className="btn btn-warning">
          {refetch ? 'Loading...' : 'Save comment'}
        </button>
      </form>
    </div>
  )
}

export default EditComment