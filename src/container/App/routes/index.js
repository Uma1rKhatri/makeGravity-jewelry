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
      <Route path={`/users`} component={asyncComponent(() => import("../../../screens/User"))} />
      <Route path={`/auction-management`} component={asyncComponent(() => import("../../../screens/Auction Management"))} />      
    </Switch>

  )
}

export default RouteApp;