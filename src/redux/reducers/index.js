import { combineReducers } from "redux";
import login from "./auth/login-reducer";
import userGet from "./user/user-get-reducer"
import userAdd from "./user/user-add-reducer"
import auctionAdd from "./auction/auction-add-reducer";
import auctionGet  from "./auction/auction-get-reducer";
import auctionEdit from "./auction/auction-edit-reducer";
import auctionIdGet from "./auction/auction-id-get-reducer";
import jeweleryGet from "./jewelery/jewelery-get-reducer";
import jeweleryAttributeGet from "./jewelery/jeweleryAttribute-get-reducer";
import pickListGet from "./jewelery/pickList-get-reducer";
import collectionAdd from "./collection/collection-add-reducer";
import collectionGet from "./collection/collection-get-reducer";
import collectionEdit from "./collection/collection-edit-reducer";
import auctionItemGet from "./auction item/auction-item-get-reducer";
import auctionItemAdd from "./auction item/auction-item-add-reducer";
import jeweleryDdl from "./jewelery/jewelery-ddl-reducer";
import auctionItemDetailGet from "./auction item/auction-item-get-details-reducer";
import auctionItemEdit from "./auction item/auction-item-edit-reducer";
import jeweleryAdd from "./jewelery/jewelery-add-reducer";
import jeweleryEdit from "./jewelery/jewelery-edit-reducer";
import jeweleryAttributeAdd from "./jewelery/jeweleryAttribute-add-reducer";
import jeweleryAttributeEdit from "./jewelery/jeweleryAttribute-edit-reducer";
import AttributepickListGet  from "./jewelery/attributepicklist-get-reducer";
 
export default combineReducers({
  login,
  userGet,
  userAdd,
  auctionAdd,
  auctionGet,
  auctionEdit,
  auctionIdGet,
  jeweleryGet,
  jeweleryAttributeGet,
  pickListGet,
  collectionAdd,
  collectionGet,
  collectionEdit,
  auctionItemGet,
  auctionItemAdd,
  jeweleryDdl,
  auctionItemDetailGet,
  auctionItemEdit,
  jeweleryAdd,
  jeweleryEdit,
  jeweleryAttributeAdd,
  jeweleryAttributeEdit,
  AttributepickListGet,


});