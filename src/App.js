import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from "layouts/AuthLayout.js";
import MainLayout from "layouts/MainLayout.js";
import PrivateRoute from "PrivateRoute.js"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={AuthLayout}  />
        <PrivateRoute path="/main" component={MainLayout}  />
        <Redirect from="/" to="/auth" />
      </Switch>
    </Router>
  )
}

export default App
