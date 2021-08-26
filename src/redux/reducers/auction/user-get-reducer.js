import {
    AUCTION_GET_REQUEST,
    AUCTION_GET_SUCCESS,
    AUCTION_GET_ERROR
} from "../../../constant/redux-type";

const auctionGet = (state = {}, action) => {
    switch (action.type) {
        case AUCTION_GET_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case AUCTION_GET_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case AUCTION_GET_ERROR: {
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

export default auctionGet;