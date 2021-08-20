import React, { lazy } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
  useHistory
} from "react-router-dom";

import Login from "../screens/Login/login";
import MainApp from "../container/App/MainApp";

import ProtectedRoute from "../utils/protectedRoutes";
import { ReadCookie } from "../utils/ReadCookie";

class Routers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      name: null,
      role: null,
    };
  }
  // componentWillMount() {
  //   let token = ReadCookie("token");
  //   let name = ReadCookie("name");
  //   let role = ReadCookie("role");
  //   this.setState({
  //     token: token,
  //     name: name,
  //     role: role
  //   });
  // }

  render() {
     const { token, name, role} = this.state;
    // console.log("Role: ", role)

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <HashRouter >
              <ProtectedRoute  component={MainApp} />
              <Route
                exact
                path="/signin"
                render={() => {
                  if (token && name && role) {
                    return <Redirect to="/user" />;
                  } else {
                    return (
                      <Route exact path="/signin" component={Login} />
                    );
                  }
                }}
                component={Login}
              />
            </HashRouter>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Routers;