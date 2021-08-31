import { baseURL } from "../../constant/url";
import {JEWELERY_GET_REQUEST, JEWELERY_GET_SUCCESS, JEWELERY_GET_ERROR, JEWELERY_ATTRIBUTE_GET_REQUEST,JEWELERY_ATTRIBUTE_GET_SUCCESS, JEWELERY_ATTRIBUTE_GET_ERROR, PICKLIST_GET_REQUEST,PICKLIST_GET_SUCCESS,PICKLIST_GET_ERROR} from '../../constant/redux-type';


const axios = require("axios");

export const jewelryGet = () => dispatch => {
    dispatch({ type: JEWELERY_GET_REQUEST });
  
    return axios({
      method: "GET",
      url: `${baseURL}jewelries`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        return dispatch({ type: JEWELERY_GET_SUCCESS, response: response });
      })
      .catch(error => {
        console.log("error", error)
        if (error.message === "Network Error") {
          return dispatch({ type: JEWELERY_GET_ERROR, response: error.message });
        }
        if (error.response.status === 400) {
        }
        return dispatch({ type: JEWELERY_GET_ERROR, response: error.response });
      });
  };

  export const jeweleryAttributeGet = (id) => dispatch => {
    dispatch({ type: JEWELERY_ATTRIBUTE_GET_REQUEST });
  
    return axios({
      method: "GET",
      url: `${baseURL}jewelry-attribute/jewelry/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        return dispatch({ type: JEWELERY_ATTRIBUTE_GET_SUCCESS, response: response });
      })
      .catch(error => {
        console.log("error", error)
        if (error.message === "Network Error") {
          return dispatch({ type: JEWELERY_ATTRIBUTE_GET_ERROR, response: error.message });
        }
        if (error.response.status === 400) {
        }
        return dispatch({ type: JEWELERY_ATTRIBUTE_GET_ERROR, response: error.response });
      });
  };

  export const pickListGet = (id) => dispatch => {
    dispatch({ type: PICKLIST_GET_REQUEST });
  
    return axios({
      method: "GET",
      url: `${baseURL}jewelry-ddl-value/ddl/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        return dispatch({ type: PICKLIST_GET_SUCCESS, response: response });
      })
      .catch(error => {
        console.log("error", error)
        if (error.message === "Network Error") {
          return dispatch({ type: PICKLIST_GET_ERROR, response: error.message });
        }
        if (error.response.status === 400) {
        }
        return dispatch({ type: PICKLIST_GET_ERROR, response: error.response });
      });
  };