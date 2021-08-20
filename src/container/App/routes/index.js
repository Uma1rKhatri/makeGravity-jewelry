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
    
      <Route path={`/user`} component={asyncComponent(() => import("../../../screens/User/user"))} />
    

      {/* <Route path={`/category`} component={asyncComponent(() => import("../../../screens/Services/Category/Category"))} />
      <Route path={`/services`} component={asyncComponent(() => import("../../../screens/Services/Category/subCategory/Services"))} /> */}
      
    </Switch>

  )
}

export default RouteApp;