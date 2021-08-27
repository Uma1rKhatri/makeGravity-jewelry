import { combineReducers } from "redux";
import login from "./auth/login-reducer";
import userGet from "./user/user-get-reducer"
import userAdd from "./user/user-add-reducer"
import auctionAdd from "./auction/auction-add-reducer";
import auctionGet  from "./auction/user-get-reducer";
import auctionEdit from "./auction/auction-edit-reducer";

export default combineReducers({
  login,
  userGet,
  userAdd,
  auctionAdd,
  auctionGet,
  auctionEdit
});