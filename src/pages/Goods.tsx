import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import Loader from '../components/Loader'
import { debounce, server } from '../helpers'
import { setRefetch } from '../store/appSlice'
import { AppDispatch, RootState } from '../store/store'
import { CatType, ProductType } from '../types'

const Goods: React.FC = () => {
  const [cats, setCats] = useState<CatType[]>([])
  const [goods, setGoods] = useState<ProductType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const refetch = useSelector((state: RootState) => state.app.refetch)
  const dispatch = useDispatch<AppDispatch>()
  const [sort, setSort] = useState<string>('')
  const [perpage, setPerpage] = useState<number>(7)
  const [searchState, setSearchState] = useState<string>('')


  useEffect(() => {
    fetch(`${server}/categories`).then(response => response.json()).then(data => setCats(data))
  }, [dispatch])


  useEffect(() => {
    fetch(`${server}/goods?_start=0&_end=${perpage}${sort}${searchState}`)
      .then(response => {
        setTotalCount(Number(response.headers.get('X-Total-Count')))
        return response.json()
      })
      .then(data => {
        setGoods(data)
        dispatch(setRefetch(false))
      })
  }, [refetch, dispatch, perpage, sort, searchState])


  // sortCategory
  const sortCategory = (val: string) => {
    const cat = cats.find(el => el.title === val)
    if (val !== 'All') {
      setPerpage(7)
      setSort(`&category=${cat?.id}`)
    } else {
      setSort('')
    }
  }


  // loadMoreGoods
  const loadMoreGoods = () => {
    setPerpage(prev => prev + 5)
    dispatch(setRefetch(true))
  }


  // Search debounceValue
  const debounceValue = debounce((text: string) => {
    setSearchState(`&q=${text}`)
  }, 700)

  
  // Search
  const searchProduct = (e: any) => {
    let { value } = e.target
    debounceValue(value)    
  }
  

  return (
    <div>
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="mb-0">Products</h1>
        <Link to="/product-add" className="btn btn-outline-primary">Add new product</Link>
      </div>
      <h4 className="mb-5">{`${server}/goods?_start=0&_end=${perpage}${sort}${searchState}`}</h4>

      <div className="form-field">
        <div className="input-group">
          <span className="input-group-text">Category</span>
          <select className="form-select" onChange={e => sortCategory(e.target.value)} data-testid="sortby">
            <option>All</option>
            {cats.map(el => <option key={el.id}>{el.title}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <div className="input-group">
          <span className="input-group-text">Search</span>
          <input type="text" className="form-control" placeholder="Search product..." onChange={searchProduct} data-testid="search" />
        </div>
      </div>

      <Loader list={goods} />
      {goods.map((el, index) => {
        const cat = cats.find(c => c.id === Number(el.category))
        return <ItemBox type="goods" key={el.id} index={index + 1} cat={cat?.title} id={el.id} title={el.title} link={`/product-edit/${el.id}`}>
          <div className="itembox-description">
            {el.image && <div className="itembox-img"><img src={el.image} alt="" /></div>}
            <p><b>Category:</b> {cat?.title}<br />
            <b>Stock:</b> 
            {
              (el.stock < 1) ? <span className="badge bg-secondary">Out of stock</span> :
              (el.stock < 5) ? <span className="badge bg-warning">Limited {el.stock}</span> :
              <span className="badge bg-success">In stock {el.stock}</span>
            }
            <br />
            <b>Price:</b> {el.price}</p>
            <p><b>Description:</b></p>
            <div dangerouslySetInnerHTML={{__html: el.description}}></div>
          </div>
        </ItemBox>
      })}

      {goods.length < totalCount && <div className="text-center mt-4">
        <button className="btn btn-outline-primary" onClick={loadMoreGoods} data-testid="loadmore">
          {refetch && <span className="spinner-border spinner-border-sm me-2"></span>}
          Load more
        </button>
      </div>}

    </div>
  )
}

export default Goods