import {
 COLLECTION_ADD_REQUEST,
 COLLECTION_ADD_SUCCESS,
 COLLECTION_ADD_ERROR
} from "../../../constant/redux-type";

const collectionAdd = (state = {}, action) => {
    switch (action.type) {
        case COLLECTION_ADD_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case COLLECTION_ADD_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case COLLECTION_ADD_ERROR: {
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

export default collectionAdd;