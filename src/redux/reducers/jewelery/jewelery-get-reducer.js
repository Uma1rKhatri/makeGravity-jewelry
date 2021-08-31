import {
 JEWELERY_GET_REQUEST,
 JEWELERY_GET_SUCCESS,
 JEWELERY_GET_ERROR
} from "../../../constant/redux-type";

const jeweleryGet = (state = {}, action) => {
    switch (action.type) {
        case JEWELERY_GET_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case JEWELERY_GET_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case JEWELERY_GET_ERROR: {
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

export default jeweleryGet;