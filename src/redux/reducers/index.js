import { combineReducers } from "redux";
import login from "./auth/login-reducer";
import userGet from "./user/user-get-reducer"
import userAdd from "./user/user-add-reducer"
import auctionAdd from "./auction/auction-add-reducer";
import auctionGet  from "./auction/user-get-reducer";
import auctionEdit from "./auction/auction-edit-reducer";
import auctionIdGet from "./auction/auction-id-get-reducer";
import jeweleryGet from "./jewelery/jewelery-get-reducer";
import pickListGet from "./jewelery/pickList-get-reducer";

export default combineReducers({
  login,
  userGet,
  userAdd,
  auctionAdd,
  auctionGet,
  auctionEdit,
  auctionIdGet,
  jeweleryGet,
  pickListGet
});