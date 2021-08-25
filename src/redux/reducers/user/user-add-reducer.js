import {
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_ERROR
} from "../../../constant/redux-type";

const userAdd = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case USER_ADD_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case USER_ADD_ERROR: {
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

export default userAdd;