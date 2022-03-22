import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const DataRoute = ({path, component}) => {
  return (
      localStorage.getItem('userName') !== null ? (
        <Route path={path} component={component}  />
      ) : (
        <Redirect to={{ pathname: '/auth' }} />
      )
  )
}

export default DataRoute
