import { baseURL } from "../../constant/url";
import { AUCTION_ITEM_GET_REQUEST, AUCTION_ITEM_GET_SUCCESS, AUCTION_ITEM_GET_ERROR, AUCTION_ITEM_ADD_REQUEST, AUCTION_ITEM_ADD_SUCCESS, AUCTION_ITEM_ADD_ERROR } from "../../constant/redux-type";


const axios = require("axios");
export const auctionItemGet = (id) => dispatch => {
  dispatch({ type: AUCTION_ITEM_GET_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}auction-items/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      return dispatch({ type: AUCTION_ITEM_GET_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_ITEM_GET_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_ITEM_GET_ERROR, response: error.response });
    });
};

export const auctionItemAdd = (data) => dispatch => {
    dispatch({ type: AUCTION_ITEM_ADD_REQUEST });
    let form = new FormData();
    console.log("data", data)
    return axios({
      method: "POST",
      url: `${baseURL}auction-item-detail`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: form
    })
      .then(response => {
        return dispatch({ type: AUCTION_ITEM_ADD_SUCCESS, response: response });
      })
      .catch(error => {
        console.log("error", error)
        if (error.message === "Network Error") {
          return dispatch({ type: AUCTION_ITEM_ADD_ERROR, response: error.message });
        }
        if (error.response.status === 400) {
        }
        return dispatch({ type: AUCTION_ITEM_ADD_ERROR, response: error.response });
      });
  };
  


