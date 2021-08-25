import { combineReducers } from "redux";
import login from "./auth/login-reducer";
import userGet from "./user/user-get-reducer"
import userAdd from "./user/user-add-reducer"


export default combineReducers({
  login,
  userGet,
  userAdd
});