import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { server } from '../helpers'
import { setRefetch } from '../store/appSlice'
import { AppDispatch } from '../store/store'
import { CatType } from '../types'

const EditCat: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    fetch(`${server}/categories/${id}`).then(response => response.json()).then((data: CatType) => {
      setTitle(data.title)
      setDescription(data.description)
    })
  }, [id])

  // updateCat
  const updateCat = async (e: any) => {
    e.preventDefault()
    fetch(`${server}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title, description})
    })
    dispatch(setRefetch(true))
    navigate('/categories')
  }
  

  return (
    <div>
      <h1 className="mb-4">Edit category "{title}"</h1>

      <form onSubmit={updateCat}>
        <div className="form-field">
          <input type="text" className="form-control" placeholder="Category title" defaultValue={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-field">
          <textarea className="form-control" placeholder="Category description" defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-field">
          <button className="btn btn-warning">Edit category</button>
        </div>
      </form>
      
    </div>
  )
}

export default EditCat