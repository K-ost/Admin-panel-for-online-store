import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../store/appSlice'
import { AppDispatch } from '../store/store'

const Aside: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // logoutFunc
  const logoutFunc = (e: any) => {
    e.preventDefault()
    dispatch(setLogout())
    navigate('/')
  }

  return (
    <div className="app-aside">
      <ul className="navmenu">
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/categories">Categories</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/orders">Orders</NavLink></li>
        <li><NavLink to="/comments">Comments</NavLink></li>
        <li><a href="/" onClick={logoutFunc}>Logout</a></li>
      </ul>
    </div>
  )
}

export default Aside