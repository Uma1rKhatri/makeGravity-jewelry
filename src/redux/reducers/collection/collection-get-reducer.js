import {
    COLLECTION_GET_REQUEST,
    COLLECTION_GET_SUCCESS,
    COLLECTION_GET_ERROR
} from "../../../constant/redux-type";

const collectionGet = (state = {}, action) => {
    switch (action.type) {
        case COLLECTION_GET_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case COLLECTION_GET_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case COLLECTION_GET_ERROR: {
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

export default collectionGet;