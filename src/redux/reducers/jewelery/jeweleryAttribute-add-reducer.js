import {
    JEWELERY_ATTRIBUTE_ADD_REQUEST,
    JEWELERY_ATTRIBUTE_ADD_ERROR,
    JEWELERY_ATTRIBUTE_ADD_SUCCESS,
         } from "../../../constant/redux-type";
         
         const jeweleryAttributeAdd = (state = {}, action) => {
             switch (action.type) {
                 case JEWELERY_ATTRIBUTE_ADD_REQUEST: {
                     let obj = {
                         loading: true
                     };
                     return obj;
                 }
                 case JEWELERY_ATTRIBUTE_ADD_SUCCESS: {
                     let obj = {
                         loading: false,
                         data: action.response
                     };
                     return obj;
                 }
                 case JEWELERY_ATTRIBUTE_ADD_ERROR: {
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
         
         export default jeweleryAttributeAdd;