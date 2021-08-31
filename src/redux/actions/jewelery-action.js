import { baseURL } from "../../constant/url";
import {JEWELERY_GET_REQUEST, JEWELERY_GET_SUCCESS, JEWELERY_GET_ERROR} from '../../constant/redux-type';


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