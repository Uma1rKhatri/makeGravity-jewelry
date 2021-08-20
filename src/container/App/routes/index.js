import React from 'react'
import asyncComponent from '../../../utils/asyncComponent'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


const RouteApp = ({ match }) => {
  return (
    <Switch>
      <Route path={`/users`} component={asyncComponent(() => import("../../../screens/User/user"))} />      
    </Switch>

  )
}

export default RouteApp;