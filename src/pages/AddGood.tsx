import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import { Link, useNavigate } from 'react-router-dom'
import { setRefetch } from '../store/appSlice'
import { featsArray, server } from '../helpers'
import { CatType } from '../types'

const AddGood: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [cats, setCats] = useState<CatType[]>([])
  const [img, setImg] = useState<string>('')

  useEffect(() => {
    fetch(`${server}/categories`).then(response => response.json()).then(data => setCats(data))
  }, [])


  // Create product
  const onSubmit = (data: any) => {
    fetch(`${server}/goods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    reset()
    dispatch(setRefetch(true))
    navigate('/products')
  }


  return (
    <div>
      <h1>Add new product</h1>

      <div className="module">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            placeholder="Title"
            error={errors.title?.message}
            func={register("title", {required: 'This field should not be empty'})}
          />
          
          <div className="form-field">
            <label className="form-label">Image</label>
            <input type="text" className="form-control" placeholder="Image" {...register("image")} />
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea className="form-control" placeholder="Description" {...register("description", {})} />
          </div>
          <div className="form-field">
            <select className="form-select" {...register("category")}>
              {cats.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
            </select>
          </div>

          <h5>Features</h5>
          <div className="row">
            {featsArray.map(el => (
              <div className="col-6 col-lg-3 form-field" key={el.id}>
                <label className="form-label">{el.title}</label>
                <input type="text" className="form-control" {...register(el.name)} />
              </div>
            ))}
          </div>

          <InputField
            type="number"
            placeholder="Stock (amount)"
            error={errors.stock?.message}
            func={register("stock", {required: 'This field should not be empty'})}
          />
          <InputField
            type="text"
            placeholder="Price"
            error={errors.price?.message}
            func={register("price", {required: 'This field should not be empty'})}
          />
          <Link to="/products" className="btn btn-outline-secondary me-3">&larr; back to products</Link>
          <button className="btn btn-primary" type="submit">Add product</button>
        </form>
      </div>
      
    </div>
  )
}

export default AddGood