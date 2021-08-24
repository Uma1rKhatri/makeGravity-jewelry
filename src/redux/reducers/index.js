import { combineReducers } from "redux";
import login from "./auth/login-reducer";
import userGet from "./user/user-get-reducer"


export default combineReducers({
  login,
  userGet
});