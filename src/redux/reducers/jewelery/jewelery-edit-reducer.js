import {
    JEWELERY_EDIT_REQUEST,
    JEWELERY_EDIT_SUCCESS,
    JEWELERY_EDIT_ERROR
    } from "../../../constant/redux-type";
    
    const jeweleryEdit = (state = {}, action) => {
        switch (action.type) {
            case JEWELERY_EDIT_REQUEST: {
                let obj = {
                    loading: true
                };
                return obj;
            }
            case JEWELERY_EDIT_SUCCESS: {
                let obj = {
                    loading: false,
                    data: action.response
                };
                return obj;
            }
            case JEWELERY_EDIT_ERROR: {
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
    
    export default jeweleryEdit;