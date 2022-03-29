import {
   PICKLIST_GET_REQUEST,
   PICKLIST_GET_SUCCESS,
   PICKLIST_GET_ERROR
   } from "../../../constant/redux-type";
   
   const pickListGet = (state = {}, action) => {
       switch (action.type) {
           case PICKLIST_GET_REQUEST: {
               let obj = {
                   loading: true
               };
               return obj;
           }
           case PICKLIST_GET_SUCCESS: {
               let obj = {
                   loading: false,
                   data: action.response
               };
               return obj;
           }
           case PICKLIST_GET_ERROR: {
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
   
   export default pickListGet;