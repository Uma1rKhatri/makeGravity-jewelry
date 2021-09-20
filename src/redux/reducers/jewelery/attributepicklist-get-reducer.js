import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR
    } from "../../../constant/redux-type";
    
    const AttributepickListGet = (state = {}, action) => {
        switch (action.type) {
            case ATTRIBUTE_PICKLIST_GET_REQUEST: {
                let obj = {
                    loading: true
                };
                return obj;
            }
            case ATTRIBUTE_PICKLIST_GET_SUCCESS: {
                let obj = {
                    loading: false,
                    data: action.response
                };
                return obj;
            }
            case ATTRIBUTE_PICKLIST_GET_ERROR: {
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
    
    export default AttributepickListGet;