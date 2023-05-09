import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faCheck,
  faXmark,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons'
import FunctionRegister from './functionRegister'

function Register() {
  const {
    values,
    error,
    handleChange,
    checkIfSubmitted,
    loading,
    signUp
    
  } = FunctionRegister()

  return (
    <div className="register side">
      <div className="title">register</div>
      <form >
        <div className="input-and-indicator">
          <input
            type="text"
            value={values.username}
            onChange={handleChange}
            name="username"
            placeholder="username"
          ></input>
          <div className="status-indicator">
            <div
              className={
                'indicator level1 ' +
                (error.username === 'error' || loading ? 'hidden' : '')
              }
            >
              <FontAwesomeIcon title="Username available" icon={faCheck} />
            </div>
            <div
              className={
                'indicator level-1 ' +
                (values.username.length > 0 &&
                error.username === 'error' &&
                !loading
                  ? ''
                  : 'hidden')
              }
            >
              <FontAwesomeIcon title="Username unavailable" icon={faXmark} />
            </div>
            {loading && (
              <div className="indicator level0 ">
                <FontAwesomeIcon icon={faCircleNotch} />
              </div>
            )}
          </div>
        </div>
        <div className="input-and-indicator">
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            name="email"
            placeholder="email"
          ></input>
          <div className="status-indicator">
            <div
              className={
                'indicator level1 ' + (error.email === 'error' ? 'hidden' : '')
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className={
                'indicator level-1 ' +
                (values.email.length > 0 && error.email === 'error'
                  ? ''
                  : 'hidden')
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        <div className="input-and-indicator">
          <input
            type="email"
            value={values.verifyEmail}
            onChange={handleChange}
            name="verifyEmail"
            placeholder="verify email"
          ></input>
          <div className="status-indicator">
            <div
              className={
                'indicator level1 ' +
                (error.verifyEmail === 'error' ? 'hidden' : '')
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className={
                'indicator level-1 ' +
                (values.verifyEmail.length > 0 && error.verifyEmail === 'error'
                  ? ''
                  : 'hidden')
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        <div className="input-and-indicator">
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
          ></input>
          <div className="status-indicator">
            <div
              className={
                'indicator level1 ' +
                (error.password === 'error' ? 'hidden' : '')
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className={
                'indicator level-1 ' +
                (values.password.length > 0 && error.password === 'error'
                  ? ''
                  : 'hidden')
              }
            >
              {values.password.length < 8 ? (
                <FontAwesomeIcon
                  title="Password must be at least 8 characters"
                  icon={faXmark}
                />
              ) : (
                <FontAwesomeIcon
                  title="Password must contain at least one capital letter, number and special character"
                  icon={faXmark}
                />
              )}
            </div>
          </div>
        </div>
        <div className="input-and-indicator">
          <input
            type="password"
            value={values.verifyPassword}
            onChange={handleChange}
            name="verifyPassword"
            placeholder="verify password"
          ></input>
          <div className="status-indicator">
            <div
              className={
                'indicator level1 ' +
                (error.verifyPassword === 'error' ? 'hidden' : '')
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className={
                'indicator level-1 ' +
                (values.verifyPassword.length > 0 &&
                error.verifyPassword === 'error'
                  ? ''
                  : 'hidden')
              }
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        <button className="button" onClick={signUp} disabled={!checkIfSubmitted()}>
          <div>
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </div>
        </button>
      </form>
    </div>
  )
}

export default Register
