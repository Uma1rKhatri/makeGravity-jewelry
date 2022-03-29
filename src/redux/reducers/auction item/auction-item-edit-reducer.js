import {
 AUCTION_ITEM_EDIT_REQUEST,
 AUCTION_ITEM_EDIT_SUCCESS,
 AUCTION_ITEM_EDIT_ERROR
 } from "../../../constant/redux-type";
 
 const auctionItemEdit = (state = {}, action) => {
     switch (action.type) {
         case AUCTION_ITEM_EDIT_REQUEST: {
             let obj = {
                 loading: true
             };
             return obj;
         }
         case AUCTION_ITEM_EDIT_SUCCESS: {
             let obj = {
                 loading: false,
                 data: action.response
             };
             return obj;
         }
         case AUCTION_ITEM_EDIT_ERROR: {
             let obj = {
                 loading: false,
                 status: action.response.status
             };
             return obj;
         }
         default:
             return state;
     }
 };
 
 export default auctionItemEdit;