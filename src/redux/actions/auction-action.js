import { baseURL } from "../../constant/url";
import { AUCTION_GET_REQUEST, AUCTION_GET_SUCCESS, AUCTION_GET_ERROR, AUCTION_ADD_REQUEST, AUCTION_ADD_SUCCESS, AUCTION_ADD_ERROR, AUCTION_EDIT_REQUEST, AUCTION_EDIT_SUCCESS, AUCTION_EDIT_ERROR,  AUCTION_GET_ID_REQUEST, AUCTION_GET_ID_SUCCESS,  AUCTION_GET_ID_ERROR } from "../../constant/redux-type";


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
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_GET_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_GET_ERROR, response: error.response });
    });
};

export const auctionAdd = (data) => dispatch => {
  dispatch({ type: AUCTION_ADD_REQUEST });
  let form = new FormData();
  form.append("source", data.source);
  form.append("auction_id", data.auction_id);
  form.append("auction_name", data.auction_name);
  form.append("auction_url", data.auction_url);
  form.append("category", data.category);
  form.append("start_date", data.start_date);
  form.append("end_date", data.end_date);
  form.append("auction_details_text", data.auction_details_text);
  form.append("hide", data.hide);
  if (data.image !== undefined)
    form.append("auction_image", data.auction_image);
  console.log("data", data)
  return axios({
    method: "POST",
    url: `${baseURL}auction`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: form
  })
    .then(response => {
      
      return dispatch({ type: AUCTION_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_ADD_ERROR, response: error.response });
    });
};


export const auctionEdit = (data) => dispatch => {
  dispatch({ type: AUCTION_EDIT_REQUEST });
  let form = new FormData();
  form.append("auction_details_text", data.auction_details_text);
  form.append("notes_text", data.notes_text);
  form.append("hide", data.hide);


  return axios({
    method: "PATCH",
    url: `${baseURL}auction/update/${data.auction_id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: form
  })
    .then(response => {
      console.log("response", response)
      return dispatch({ type: AUCTION_EDIT_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_EDIT_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_EDIT_ERROR, response: error.response });
    });
};

export const auctionIdGet = (id) => dispatch => {
  dispatch({ type: AUCTION_GET_ID_REQUEST });
  

  return axios({
    method: "GET",
    url: `${baseURL}auction/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      return dispatch({ type: AUCTION_GET_ID_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: AUCTION_GET_ID_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: AUCTION_GET_ID_ERROR, response: error.response });
    });
};