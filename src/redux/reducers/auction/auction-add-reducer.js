import {
    AUCTION_ADD_REQUEST,
    AUCTION_ADD_SUCCESS,
   AUCTION_ADD_ERROR
} from "../../../constant/redux-type";

const auctionAdd = (state = {}, action) => {
    switch (action.type) {
        case AUCTION_ADD_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case AUCTION_ADD_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case AUCTION_ADD_ERROR: {
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

export default auctionAdd;