import React from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../store/appSlice'
import { AppDispatch } from '../store/store'

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="form-container">
      <div className="module">
        <h4>Authorization</h4>
        <div className="form-field">
          <input type="text" className="form-control" placeholder="E-mail" />
        </div>
        <div className="form-field">
          <input type="password" className="form-control" placeholder="Password" />
          <div className="form-field-text">
            <a href="/">Forget password</a>
          </div>
        </div>
        <div className="form-field">
          <button className="btn btn-primary" onClick={() => dispatch(setLogin())}>Log in</button>
        </div>
        <div className="form-field">
          Have you not registered yet? 
          <a href="/">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Login