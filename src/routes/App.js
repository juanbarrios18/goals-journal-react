import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Signup from '../containers/Signup'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/home' component={Home} />
      <Route exact path='/' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  </BrowserRouter>
)

export default App
