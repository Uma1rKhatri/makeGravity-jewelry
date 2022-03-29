import {
    JEWELERY_ATTRIBUTE_GET_REQUEST,
    JEWELERY_ATTRIBUTE_GET_SUCCESS,
  JEWELERY_ATTRIBUTE_GET_ERROR
   } from "../../../constant/redux-type";
   
   const jeweleryAttributeGet = (state = {}, action) => {
       switch (action.type) {
           case JEWELERY_ATTRIBUTE_GET_REQUEST: {
               let obj = {
                   loading: true
               };
               return obj;
           }
           case JEWELERY_ATTRIBUTE_GET_SUCCESS: {
               let obj = {
                   loading: false,
                   data: action.response
               };
               return obj;
           }
           case JEWELERY_ATTRIBUTE_GET_ERROR: {
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
   
   export default jeweleryAttributeGet;