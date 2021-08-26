import { baseURL } from "../../constant/url";
import {AUCTION_GET_REQUEST,AUCTION_GET_SUCCESS,AUCTION_GET_ERROR,AUCTION_ADD_REQUEST,AUCTION_ADD_SUCCESS,AUCTION_ADD_ERROR} from "../../constant/redux-type";


const axios = require("axios");
export const auctionGet = () => dispatch => {
  dispatch({ type: AUCTION_GET_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}auctions`,
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    }
  })
    .then(response => {
      return dispatch({ type: AUCTION_GET_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error",error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_GET_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_GET_ERROR, response: error.response });
    });
};

export const auctionAdd = (data, type) => dispatch => {
  dispatch({ type: AUCTION_ADD_REQUEST });

  return axios({
    method: "POST",
    url: `${baseURL}auction`,
    headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      console.log("response", response)
      console.log("${baseURL}${type}/", `${baseURL}${type}/`)
      return dispatch({ type: AUCTION_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error",error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_ADD_ERROR, response: error.response });
    });
};