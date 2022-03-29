import {
   AUCTION_ITEM_GET_REQUEST,
   AUCTION_ITEM_GET_SUCCESS,
   AUCTION_ITEM_GET_ERROR
} from "../../../constant/redux-type";

const auctionItemGet = (state = {}, action) => {
    switch (action.type) {
        case AUCTION_ITEM_GET_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case AUCTION_ITEM_GET_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case AUCTION_ITEM_GET_ERROR: {
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

export default auctionItemGet;