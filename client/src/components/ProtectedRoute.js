import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({
  authenticated,
  user,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      user && authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
)

export default ProtectedRoute
