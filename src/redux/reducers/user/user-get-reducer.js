import {
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
   USER_GET_ERROR
} from "../../../constant/redux-type";

const userGet = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case USER_GET_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case USER_GET_ERROR: {
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

export default userGet;