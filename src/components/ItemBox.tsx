import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { server } from '../helpers'
import { setNotice, setRefetch, showNotice } from '../store/appSlice'
import { AppDispatch } from '../store/store'
import ModalPopup from './ModalPopup'

interface IntItemBox {
  cat?: string
  children?: React.ReactNode
  id: number
  index?: number
  link: string
  title: string
  type: string
}

const ItemBox: React.FC<IntItemBox> = ({ cat, children, id, index, link, title, type }) => {
  const [modal, setModal] = useState<boolean>(false)
  const [hidden, setHidden] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  // remove
  const remove = async (id: number) => {
    fetch(`${server}/${type}/${id}`, {
      method: 'DELETE'
    })
    setModal(false)
    dispatch(setRefetch(true))
    dispatch(showNotice(true))
    dispatch(setNotice(`Item has been removed`))
  }

  return (
    <div className="itembox">
      <div className="itembox-head">
        <div className="itembox-title">{index}. {title} {cat && <small>- ({cat})</small>}</div>
        <button className="btn btn-sm btn-info" onClick={() => setHidden(!hidden)}>Info</button>
        <Link to={link} className="btn btn-sm btn-warning">Edit</Link>
        <button className="btn btn-sm btn-danger" onClick={() => setModal(true)}>Delete</button>
      </div>

      <div className="itembox-hide" style={{ 'maxHeight': `${hidden ? ref.current?.offsetHeight : 0}px` }}>
        <div className="itembox-hide__inner" ref={ref}>
          {children}
        </div>
      </div>

      <ModalPopup title={`You're going to remove the "${title}"`} show={modal} hide={() => setModal(false)}>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => remove(id)}>I'm sure. Remove it</button>
        </div>
      </ModalPopup>
    </div>
  )
}

export default ItemBox