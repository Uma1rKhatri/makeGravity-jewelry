import {
    COLLECTION_EDIT_REQUEST,
    COLLECTION_EDIT_SUCCESS,
    COLLECTION_EDIT_ERROR
} from "../../../constant/redux-type";

const collectionEdit = (state = {}, action) => {
    switch (action.type) {
        case COLLECTION_EDIT_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case COLLECTION_EDIT_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case COLLECTION_EDIT_ERROR: {
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

export default collectionEdit;