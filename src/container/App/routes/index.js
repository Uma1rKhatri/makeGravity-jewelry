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
      <Route exact path={`/users`} component={asyncComponent(() => import("../../../screens/User"))} />
      <Route exact path={`/auction-item/auction-detail/:id`} component={asyncComponent(()=>import("../../../screens/Auction Management/Auction Detail"))} />  
      <Route exact path={`/auction-management`} component={asyncComponent(() => import("../../../screens/Auction Management"))} />
      <Route exact path={`/auction-collection`} component={asyncComponent(() => import("../../../screens/Auction Collection"))} />
      <Route exact path={`/auction-item/:id`} component={asyncComponent(() => import("../../../screens/Auction Management/Auction Item"))} />
     
    </Switch>

  )
}

export default RouteApp;