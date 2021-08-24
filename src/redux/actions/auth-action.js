import { baseURL } from "../../constant/url";
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR} from "../../constant/redux-type";


const axios = require("axios");
export const userLogin = data => dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST });

  return axios({
    method: "POST",
    url: `${baseURL}auth/`,
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      return dispatch({ type: USER_LOGIN_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error",error)
      if (error.message === "Network Error") {
        return dispatch({ type: USER_LOGIN_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: USER_LOGIN_ERROR, response: error.response });
    });
};