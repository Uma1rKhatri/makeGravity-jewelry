import {
    AUCTION_GET_ID_REQUEST, 
    AUCTION_GET_ID_SUCCESS,
    AUCTION_GET_ID_ERROR
} from "../../../constant/redux-type";

const auctionIdGet = (state = {}, action) => {
    switch (action.type) {
        case AUCTION_GET_ID_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case AUCTION_GET_ID_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case AUCTION_GET_ID_ERROR: {
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

export default auctionIdGet;