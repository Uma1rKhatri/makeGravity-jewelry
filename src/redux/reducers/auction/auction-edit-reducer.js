import {
    AUCTION_EDIT_REQUEST,
    AUCTION_EDIT_SUCCESS,
    AUCTION_EDIT_ERROR
} from "../../../constant/redux-type";

const auctionEdit = (state = {}, action) => {
    switch (action.type) {
        case AUCTION_EDIT_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case AUCTION_EDIT_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case AUCTION_EDIT_ERROR: {
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

export default auctionEdit;