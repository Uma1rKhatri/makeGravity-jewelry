import { baseURL } from "../../constant/url";
import { COLLECTION_ADD_REQUEST, COLLECTION_ADD_SUCCESS, COLLECTION_ADD_ERROR, COLLECTION_GET_REQUEST, COLLECTION_GET_SUCCESS, COLLECTION_GET_ERROR, COLLECTION_EDIT_REQUEST, COLLECTION_EDIT_SUCCESS, COLLECTION_EDIT_ERROR } from "../../constant/redux-type";


const axios = require("axios");
export const collectionGet = () => dispatch => {
    dispatch({ type: COLLECTION_GET_REQUEST });

    return axios({
        method: "GET",
        url: `${baseURL}auction-collections`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            return dispatch({ type: COLLECTION_GET_SUCCESS, response: response });
        })
        .catch(error => {
            console.log("error", error)
            if (error.message === "Network Error") {
                return dispatch({ type: COLLECTION_GET_ERROR, response: error.message });
            }
            if (error.response.status === 400) {
            }
            return dispatch({ type: COLLECTION_GET_ERROR, response: error.response });
        });
};

export const collectionAdd = (data, id) => dispatch => {
    dispatch({ type: COLLECTION_ADD_REQUEST });
    let form = new FormData();
    form.append("auction_id", id);
    form.append("collection_name", data.collection_name);
    form.append("collection_description", data.collection_description);
    form.append("hide", data.hide);
    if (data.images_file !== undefined)
        form.append("images_file", data.images_file);
    console.log("data", data)
    return axios({
        method: "POST",
        url: `${baseURL}auction-collection`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: form
    })
        .then(response => {
            return dispatch({ type: COLLECTION_ADD_SUCCESS, response: response });
        })
        .catch(error => {
            console.log("error", error)
            if (error.message === "Network Error") {
                return dispatch({ type: COLLECTION_ADD_ERROR, response: error.message });
            }
            if (error.response.status === 400) {
            }
            return dispatch({ type: COLLECTION_ADD_ERROR, response: error.response });
        });
};


export const collectionEdit = (data) => dispatch => {
    dispatch({ type: COLLECTION_EDIT_REQUEST });
    let form = new FormData();
    form.append("collection_name", data.collection_name);
    form.append("collection_description", data.collection_description);
    form.append("notes_text", data.notes_text);
    form.append("hide", data.hide);
    if (data.images_file !== undefined)
        form.append("images_file", data.images_file);


    return axios({
        method: "PATCH",
        url: `${baseURL}auction/update/${data.id}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: form
    })
        .then(response => {
            return dispatch({ type: COLLECTION_EDIT_SUCCESS, response: response });
        })
        .catch(error => {
            console.log("error", error)
            if (error.message === "Network Error") {
                return dispatch({ type: COLLECTION_EDIT_ERROR, response: error.message });
            }
            if (error.response.status === 400) {
            }
            return dispatch({ type: COLLECTION_EDIT_ERROR, response: error.response });
        });
};
