import { baseURL } from "../../constant/url";
import {USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_ERROR, USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_ERROR} from "../../constant/redux-type";


const axios = require("axios");
export const userGet = () => dispatch => {
  dispatch({ type: USER_GET_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}admin/`,
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    }
  })
    .then(response => {
      return dispatch({ type: USER_GET_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error",error)
      if (error.message === "Network Error") {
        return dispatch({ type: USER_GET_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: USER_GET_ERROR, response: error.response });
    });
};

export const userAdd = (data, type) => dispatch => {
  dispatch({ type: USER_ADD_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}${type}/`,
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      return dispatch({ type: USER_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error",error)
      if (error.message === "Network Error") {
        return dispatch({ type: USER_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: USER_ADD_ERROR, response: error.response });
    });
};