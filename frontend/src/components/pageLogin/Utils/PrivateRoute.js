import React from 'react'
import { Navigate } from 'react-router-dom'
import { GetToken } from './Common'

const PrivateRoute = ({children}) => {
  if (GetToken() != null) {
    return children
  } else {
    return <Navigate to='/login'/>
  }
}

export default PrivateRoute
