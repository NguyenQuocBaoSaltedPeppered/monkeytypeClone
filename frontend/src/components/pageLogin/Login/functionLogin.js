import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetToken, SetUserSession } from '../Utils/Common'
import AuthenticationContext from '../../../Context'

const FunctionLogin = () => {
  const authAndMode = useContext(AuthenticationContext)
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const navigate = useNavigate()
  async function signIn(e) {
    e.preventDefault()
    try {
      fetch(`${process.env.REACT_APP_IP_KEY}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      })
        .then((data) => data.json())
        .then((res) => {
          authAndMode.setIsLoggedIn(true)
          SetUserSession(res.accessToken, res.username, res._id)
          if (GetToken() !== 'undefined') {
            navigate('/account')
          } else {
            setError('User not found')
          }
        })
    } catch (error) {}
  }
  return {
    values,
    error,
    handleChange,
    signIn,
  }
}

export default FunctionLogin
