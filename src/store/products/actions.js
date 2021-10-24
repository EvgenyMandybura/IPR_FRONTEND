import {
  GET_LIST_PRODUCTS,
  GET_LIST_PRODUCTS_SUCCESS,
  GET_LIST_PRODUCTS_CLEAR,
  GET_LIST_PRODUCTS_ERROR,
  GET_PRODUCT,
  GET_PRODUCT_CLEAR,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
} from "./actionTypes";

export const getListProducts = (url) => {
  return {
    payload: { url },
    type: GET_LIST_PRODUCTS,
  };
};
export const getListProductsSuccess = (data) => {
  return {
    payload: data,
    type: GET_LIST_PRODUCTS_SUCCESS,
  };
};
export const getListProductsError = ({ message }) => {
  return {
    payload: { message },
    type: GET_LIST_PRODUCTS_CLEAR,
  };
};
export const getListProductsClear = () => {
  return {
    type: GET_LIST_PRODUCTS_ERROR,
  };
};

export const getProduct = (productId, history) => {
  return {
    payload: { productId, history },
    type: GET_PRODUCT,
  };
};

export const getProductSuccess = ({ data }) => {
  return {
    payload: data,
    type: GET_PRODUCT_SUCCESS,
  };
};

export const getProductError = ({ message = "Unknown error" }) => {
  return {
    payload: { message },
    type: GET_PRODUCT_ERROR,
  };
};

export const clearProductFetched = () => {
  return {
    type: GET_PRODUCT_CLEAR,
  };
};
