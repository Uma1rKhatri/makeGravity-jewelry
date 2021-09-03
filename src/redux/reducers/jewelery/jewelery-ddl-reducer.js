import {
JEWELERY_DDL_ADD_REQUEST,
JEWELERY_DDL_ADD_SUCCESS,
JEWELERY_DDL_ADD_ERROR
   } from "../../../constant/redux-type";
   
   const jeweleryDdl = (state = {}, action) => {
       switch (action.type) {
           case JEWELERY_DDL_ADD_REQUEST: {
               let obj = {
                   loading: true
               };
               return obj;
           }
           case JEWELERY_DDL_ADD_SUCCESS: {
               let obj = {
                   loading: false,
                   data: action.response
               };
               return obj;
           }
           case JEWELERY_DDL_ADD_ERROR: {
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
   
   export default jeweleryDdl;