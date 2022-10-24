import React from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../store/appSlice'
import { AppDispatch } from '../store/store'

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="form-container">
      <div className="module">
        <div className="input-field">
          <input type="text" className="form-control" placeholder="E-mail" />
        </div>
        <div className="input-field">
          <input type="password" className="form-control" placeholder="Password" />
          <div className="input-field-text">
            <a href="/">Forget password</a>
          </div>
        </div>
        <div className="input-field">
          <button className="btn btn-primary" onClick={() => dispatch(setLogin())}>Log in</button>
        </div>
        <div className="input-field">
          Have you not registered yet? 
          <a href="/">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Login