import React from 'react'
import asyncComponent from '../../../utils/asyncComponent'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Error404 from '../../../component/Page404/index'



const RouteApp = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`/users`} component={asyncComponent(() => import("../../../screens/User"))} />
      <Route exact path={`/auction-item/auction-detail/:id`} component={asyncComponent(()=>import("../../../screens/Auction Management/Auction Detail"))} />  
      <Route exact path={`/auction-management`} component={asyncComponent(() => import("../../../screens/Auction Management"))} />
      <Route exact path={`/auction-collection`} component={asyncComponent(() => import("../../../screens/Auction Collection"))} />
      <Route exact path={`/auction-item/:id`} component={asyncComponent(() => import("../../../screens/Auction Management/Auction Item"))} />
      <Route exact path={`/auction-item/auction-detail/:id/edit/:uid`} component={asyncComponent(() => import("../../../screens/Auction Management/Auction Detail"))} />
      <Route exact path={`/auction-jewelery`} component={asyncComponent(() => import("../../../screens/Auction Jewelery"))} />
      <Route exact path={`/jewelery-description`} component={asyncComponent(() => import("../../../screens/Jewelry Attribute"))} />
      <Route exact path={`/jewelery-ddl-values`} component={asyncComponent(() => import("../../../screens/Jewelry ddl values"))} />
      <Route component={Error404} />
    </Switch>

  )
}

export default RouteApp;