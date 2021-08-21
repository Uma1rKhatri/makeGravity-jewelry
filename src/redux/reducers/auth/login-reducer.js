import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS
} from "../../../constant/redux-type";

const login = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            let obj = {
                loading: true
            };
            return obj;
        }
        case USER_LOGIN_SUCCESS: {
            let obj = {
                loading: false,
                data: action.response
            };
            return obj;
        }
        case USER_LOGIN_ERROR: {
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

export default login;