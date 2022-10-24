import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import InputField from '../components/InputField'
import { featsArray, server } from '../helpers'
import { setNotice, showNotice } from '../store/appSlice'
import { AppDispatch } from '../store/store'
import { CatType, ProductType } from '../types'

const EditGood: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const [cats, setCats] = useState<CatType[]>([])
  const [good, setGood] = useState<ProductType | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: good
  })

  // currentCat
  const currentCat = cats.find(el => el.id === good?.category)
  

  useEffect(() => {
    fetch(`${server}/categories`)
      .then(response => response.json())
      .then(data => setCats(data))
  }, [])
  
  useEffect(() => {
    fetch(`${server}/goods/${id}`)
      .then(response => response.json())
      .then(product => {
        setGood(product)
        reset(product)
      })
  }, [id, reset])
  
  // onSubmit
  const onSubmit = async (data: any) => {
    fetch(`${server}/goods/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    dispatch(showNotice(true))
    dispatch(setNotice(`The product "${data.title}" has been edited`))
  }


  return (
    <div>
      <h1>Edit product {good?.title}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Title"
          error={errors.title?.message}
          func={register("title", {required: 'This field should not be empty'})}
          value={good?.title}
        />
        <div className="form-field">
          <label className="form-label">Image</label>
          <input type="text" className="form-control" defaultValue={good?.image} placeholder="Image" {...register("image")} />
        </div>
        <div className="form-field">
          <label className="form-label">Description</label>
          <textarea className="form-control" defaultValue={good?.description} placeholder="Description" {...register("description", {})} />
        </div>
        <div className="form-field">
          <select className="form-select" defaultValue={currentCat?.title} {...register('category', {})}>
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
          value={String(good?.stock)}
        />
        <InputField
          type="text"
          placeholder="Price"
          error={errors.price?.message}
          func={register("price", {required: 'This field should not be empty'})}
          value={good?.price}
        />
        <Link to="/products" className="btn btn-outline-secondary me-3">&larr; back to products</Link>
        <button className="btn btn-warning" type="submit">Edit product</button>
      </form>
    </div>
  )
}

export default EditGood