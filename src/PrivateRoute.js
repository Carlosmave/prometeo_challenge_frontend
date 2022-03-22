import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({path, component}) => {
  return (
      localStorage.getItem('sessionKeyAuth') !== null ? (
        <Route path={path} component={component}  />
      ) : (
        <Redirect to={{ pathname: '/auth' }} />
      )
  )
}

export default PrivateRoute
