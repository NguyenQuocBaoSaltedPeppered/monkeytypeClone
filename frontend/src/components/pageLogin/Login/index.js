import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
import FunctionLogin from './functionLogin'
function Login() {
  const {
    values,
    error,
    handleChange,
    signIn  
  } = FunctionLogin()

  return (
    <div className="login side">
      <div className="title">login</div>
      <form>
        <div className="input-and-indicator">
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="email"
          ></input>
        </div>
        <div className="input-and-indicator">
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
          ></input>
        </div>
        <div className='error-message'>  
          {error}
        </div>
        <button type="submit" className="button sign-in" onClick={signIn}>
          <div>
            <FontAwesomeIcon icon={faRightToBracket} /> Sign In
          </div>
        </button>
      </form>
    </div>
  )
}

export default Login
