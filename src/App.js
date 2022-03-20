import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from "layouts/Auth.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={AuthLayout}  />
        <Redirect from="/" to="/auth" />
      </Switch>
    </Router>
  )
}

export default App
