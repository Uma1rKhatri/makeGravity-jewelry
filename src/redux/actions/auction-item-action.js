import { baseURL } from "../../constant/url";
import { AUCTION_ITEM_GET_REQUEST, AUCTION_ITEM_GET_SUCCESS, AUCTION_ITEM_GET_ERROR } from "../../constant/redux-type";


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


