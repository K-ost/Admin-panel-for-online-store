import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCustomDate, server } from '../helpers'
import { setNotice, setRefetch, showNotice } from '../store/appSlice'
import { AppDispatch } from '../store/store'
import { CommentType, ProductType } from '../types'
import ModalPopup from './ModalPopup'

interface IComment {
  el: CommentType
}

const Comment: React.FC<IComment> = ({ el }) => {
  const [modal, setModal] = useState<boolean>(false)
  const [productTitle, setProductTitle] = useState<string>('')
  const date = getCustomDate(el.date)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    fetch(`${server}/goods/${el.id}`)
      .then(response => response.json())
      .then((data: ProductType) => setProductTitle(data.title))
  }, [el.id])

  // removeComment
  const removeComment = (id: number) => {
    fetch(`${server}/comments/${id}`, { method: 'DELETE' })
    setModal(false)
    dispatch(setRefetch(true))
    dispatch(showNotice(true))
    dispatch(setNotice(`Comment ID: "${id}" has been removed`))
  }

  return (
    <>
      <div className="comment" key={el.id}>
        <div className="d-flex justify-content-between align-items-top">
          <h4>{el.author}</h4>
          <div className="d-flex">
            <Link to={`/comment-edit/${el.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
            <button className="btn btn-sm btn-danger" onClick={() => setModal(true)}>Delete</button>
          </div>
        </div>
        <p>{date}<br />
        To product: <b>{productTitle}</b></p>
        <div dangerouslySetInnerHTML={{__html: el.body}}></div>
      </div>
      <ModalPopup show={modal} hide={() => setModal(false)} title="Remove comment">
        <p>Are use sure that you want to remove this comment?</p>
        <button className="btn btn-danger me-2" onClick={() => removeComment(el.id)}>Remove</button>
        <button className="btn btn-outline-secondary" onClick={() => setModal(false)}>Cancel</button>
      </ModalPopup>
    </>
  )
}

export default Comment