import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/Aside'
import Login from './components/Login'
import Main from './pages/Main'
import Categories from './pages/Categories'
import { AppDispatch, RootState } from './store/store'
import Goods from './pages/Goods'
import Orders from './pages/Orders'
import Comments from './pages/Comments'
import { setLogin } from './store/appSlice'
import AddGood from './pages/AddGood'
import EditGood from './pages/EditGood'
import EditCat from './pages/EditCat'
import Notice from './components/Notice'
import EditComment from './pages/EditComment'

const Dashboard: React.FC = () => {
  const login = useSelector((state: RootState) => state.app.login)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if ( localStorage.getItem('login') === 'true' ) {
      dispatch(setLogin())
    }
  }, [dispatch])

  if (!login) {
    return <Login />
  }

  return (
    <div className="app">
      <Aside />
      <div className="app-main">
        <div className="app-header">
          Header
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category-edit/:id" element={<EditCat />} />
            <Route path="products" element={<Goods />} />
            <Route path="product-add" element={<AddGood />} />
            <Route path="product-edit/:id" element={<EditGood />} />
            <Route path="orders" element={<Orders />} />
            <Route path="comments" element={<Comments />} />
            <Route path="comment-edit/:id" element={<EditComment />} />
          </Routes>
        </div>
        <div className="app-footer">
          footer
        </div>
      </div>
      <Notice />
    </div>
  )
}

export default Dashboard