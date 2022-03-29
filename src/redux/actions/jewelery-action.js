import { baseURL } from "../../constant/url";
import { JEWELERY_GET_REQUEST, 
  JEWELERY_GET_SUCCESS, 
  JEWELERY_GET_ERROR, 
  JEWELERY_ATTRIBUTE_GET_REQUEST, 
  JEWELERY_ATTRIBUTE_GET_SUCCESS, 
  JEWELERY_ATTRIBUTE_GET_ERROR, 
  PICKLIST_GET_REQUEST, 
  PICKLIST_GET_SUCCESS, 
  PICKLIST_GET_ERROR, 
  JEWELERY_DDL_ADD_REQUEST, 
  JEWELERY_DDL_ADD_SUCCESS, 
  JEWELERY_DDL_ADD_ERROR, 
  JEWELERY_ADD_REQUEST, 
  JEWELERY_ADD_SUCCESS, 
  JEWELERY_ADD_ERROR, 
  JEWELERY_EDIT_REQUEST, 
  JEWELERY_EDIT_ERROR, 
  JEWELERY_EDIT_SUCCESS,
  JEWELERY_ATTRIBUTE_ADD_REQUEST,
  JEWELERY_ATTRIBUTE_ADD_ERROR,
  JEWELERY_ATTRIBUTE_ADD_SUCCESS,
  JEWELERY_ATTRIBUTE_EDIT_REQUEST,
  JEWELERY_ATTRIBUTE_EDIT_ERROR,
  JEWELERY_ATTRIBUTE_EDIT_SUCCESS,
  ATTRIBUTE_PICKLIST_GET_REQUEST, 
  ATTRIBUTE_PICKLIST_GET_ERROR, 
  ATTRIBUTE_PICKLIST_GET_SUCCESS, } from '../../constant/redux-type';


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
      console.log("response 69", response)
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


export const jeweleryDdl = (data) => dispatch => {
  dispatch({ type: JEWELERY_DDL_ADD_REQUEST });

  return axios({
    method: "POST",
    url: `${baseURL}jewelry-ddl-value`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      console.log("response 69", response)
      return dispatch({ type: JEWELERY_DDL_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: JEWELERY_DDL_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: JEWELERY_DDL_ADD_ERROR, response: error.response });
    });
};


export const jeweleryAdd = (data) => dispatch => {
  dispatch({ type: JEWELERY_ADD_REQUEST });

  return axios({
    method: "POST",
    url: `${baseURL}jewelry`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      console.log("response 69", response)
      return dispatch({ type: JEWELERY_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: JEWELERY_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: JEWELERY_ADD_ERROR, response: error.response });
    });
};

export const jeweleryEdit = (data, id) => dispatch => {
  dispatch({ type: JEWELERY_EDIT_REQUEST });
  console.log("EDIT DATA FROM ACTION",data)
  // let form = new FormData();
  // form.append("jewelry_nm", data.jewelry_nm);
  // form.append("jewelry_desc", data.jewelry_desc);
  // form.append("valuation_unit", data.valuation_unit);
  // form.append("valuation_amount", data.valuation_amount);
  // form.append("valuation_desc", data.valuation_desc);


  return axios({
    method: "PATCH",
    url: `${baseURL}jewelry/update/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      return dispatch({ type: JEWELERY_EDIT_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: JEWELERY_EDIT_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: JEWELERY_EDIT_ERROR, response: error.response });
    });
};
export const jeweleryAttributeGet = (id) => dispatch => {
  dispatch({ type: JEWELERY_ATTRIBUTE_GET_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}jewelry-attributes`,
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
export const jeweleryAttributeAdd = (data) => dispatch => {
  dispatch({ type: JEWELERY_ATTRIBUTE_ADD_REQUEST });

  return axios({
    method: "POST",
    url: `${baseURL}jewelry-attribute`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      console.log("response 69", response)
      return dispatch({ type: JEWELERY_ATTRIBUTE_ADD_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: JEWELERY_ATTRIBUTE_ADD_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
        console.log("FAILED")
      }
      return dispatch({ type: JEWELERY_ATTRIBUTE_ADD_ERROR, response: error.response });
      
    });
};
export const jeweleryAttributeEdit = (data, id) => dispatch => {
  dispatch({ type: JEWELERY_ATTRIBUTE_EDIT_REQUEST });
  console.log("EDIT DATA FROM ACTION",data)
   return axios({
    method: "PATCH",
    url: `${baseURL}jewelry-attribute/update/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data
  })
    .then(response => {
      return dispatch({ type: JEWELERY_ATTRIBUTE_EDIT_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: JEWELERY_ATTRIBUTE_EDIT_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: JEWELERY_ATTRIBUTE_EDIT_ERROR, response: error.response });
    });
};
export const AttributepickListGet = (id) => dispatch => {
  dispatch({ type: ATTRIBUTE_PICKLIST_GET_REQUEST });

  return axios({
    method: "GET",
    url: `${baseURL}jewelry-ddls`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      console.log("response 69", response)
      return dispatch({ type: ATTRIBUTE_PICKLIST_GET_SUCCESS, response: response });
    })
    .catch(error => {
      console.log("error", error)
      if (error.message === "Network Error") {
        return dispatch({ type: ATTRIBUTE_PICKLIST_GET_ERROR, response: error.message });
      }
      if (error.response.status === 400) {
      }
      return dispatch({ type: ATTRIBUTE_PICKLIST_GET_ERROR, response: error.response });
    });
};
