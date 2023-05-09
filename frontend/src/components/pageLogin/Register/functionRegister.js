import { useEffect, useState} from 'react'
import useDebounce from './useDebounce'

const FunctionRegister = () => {
  const usernameRegex = RegExp(/^[0-9a-zA-Z]{4,}$/)
  const emailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  const passwordRegex = RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/,
  )

  const [values, setValues] = useState({
    username: '',
    email: '',
    verifyEmail: '',
    password: '',
    verifyPassword: '',
  })

  const [error, setError] = useState({
    username: 'error',
    email: 'error',
    verifyEmail: 'error',
    password: 'error',
    verifyPassword: 'error',
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    switch (name) {
      case 'username':
        setLoading(true)
        break
      case 'email':
        setError({ ...error, email: emailRegex.test(value) ? '' : 'error' })
        break
      case 'verifyEmail':
        setError({
          ...error,
          verifyEmail: value === values.email ? '' : 'error',
        })
        break
      case 'password':
        setError({
          ...error,
          password: passwordRegex.test(value) ? '' : 'error',
        })
        break
      case 'verifyPassword':
        setError({
          ...error,
          verifyPassword: value === values.password ? '' : 'error',
        })
        break
      default:
        break
    }
    setValues({ ...values, [name]: value })
  }

  async function validateUsername(e) {
    try {
      const result = await fetch(`${process.env.REACT_APP_IP_KEY}/auth/verify`, {
        method: 'POST',
        body: JSON.stringify({
          username: values.username,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
        },
      })
      setError({ ...error, username: result.ok ? '' : 'error' })
      setLoading(false)
    } catch (error) {}
  }

  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(values.username, 2000)

  useEffect(() => {
    if (values.username.length > 0) {
      if (usernameRegex.test(values.username)) {
        validateUsername()
      } else {
        setError({ ...error, username: 'error' })
        setLoading(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  function checkIfSubmitted() {
    let valid = true

    Object.values(error).forEach((val) => {
      val === 'error' && (valid = false)
    })
    return valid
  }

  async function signUp(e) {
    e.preventDefault()
    try {
      await fetch(`${process.env.REACT_APP_IP_KEY}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: '*/*',
        },
      })
        alert('SIGN UP SUCCEED! PLEASE LOG IN TO ACCESS')
    } catch (error) {}
  }

  return {
    values,
    error,
    handleChange,
    checkIfSubmitted,
    loading,
    signUp,
  }
}

export default FunctionRegister
