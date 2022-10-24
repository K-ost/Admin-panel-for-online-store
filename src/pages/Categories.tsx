import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemBox from '../components/ItemBox'
import Loader from '../components/Loader'
import ModalPopup from '../components/ModalPopup'
import { server } from '../helpers'
import { setNotice, setRefetch, showNotice } from '../store/appSlice'
import { AppDispatch, RootState } from '../store/store'
import { CatType } from '../types'

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const refetch = useSelector((state: RootState) => state.app.refetch)
  const [cats, setCats] = useState<CatType[]>([])
  const [titleCat, setTitleCat] = useState<string>('')
  const [descCat, setDescCat] = useState<string>('')
  const [modalNewCat, setModalNewCat] = useState<boolean>(false)

  useEffect(() => {
    fetch(`${server}/categories`)
      .then(response => response.json())
      .then(data => {
        setCats(data)
        dispatch(setRefetch(false))
      })
  }, [refetch])
  

  // Adding new category
  const addCat = (e: any) => {
    e.preventDefault()
    fetch(`${server}/categories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titleCat,
        description: descCat
      })
    })
    setTitleCat('')
    setDescCat('')
    setModalNewCat(false)
    dispatch(setRefetch(true))
    dispatch(showNotice(true))
    dispatch(setNotice(`Category has been added`))
  }

  return (
    <div>
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="mb-0">Categories</h1>
        <button className="btn btn-outline-primary" onClick={() => setModalNewCat(true)}>Add new category</button>
      </div>

      <ModalPopup title="Add new category" show={modalNewCat} hide={() => setModalNewCat(false)}>
        <form onSubmit={addCat}>
          <div className="form-field">
            <input type="text" className="form-control" placeholder="Category title" onChange={e => setTitleCat(e.target.value)} />
          </div>
          <div className="form-field">
            <textarea className="form-control" placeholder="Category description" onChange={e => setDescCat(e.target.value)}></textarea>
          </div>
          <div className="form-field">
            <button className="btn btn-primary">Add new category</button>
          </div>
        </form>
      </ModalPopup>

      <Loader list={cats} />
      {cats.map((el, index) => (
        <ItemBox title={el.title} key={el.id} id={el.id} link={`/category-edit/${el.id}`} index={index + 1} type="categories">
          <div className="itembox-description" dangerouslySetInnerHTML={{__html: el.description}}></div>
        </ItemBox>
      ))}
    </div>
  )
}

export default Categories