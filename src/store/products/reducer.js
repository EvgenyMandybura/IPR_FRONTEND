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
import { DEFAULT_OFFSET } from "../../constants/pagination";

const initialState = {
  data: [],
  item: null,
  error: "",
  loading: false,
  loadedImage: true,
  removed: false,
  url: "",
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PRODUCTS:
      state = {
        ...state,
        loading: true,
        url: action.payload.url,
      };
      break;
    case GET_LIST_PRODUCTS_SUCCESS:
      state = {
        ...state,
        data: action.payload.data,
        pagination: action.payload.pagination,
        loading: false,
      };
      break;
    case GET_LIST_PRODUCTS_CLEAR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_LIST_PRODUCTS_ERROR:
      state = {
        ...state,
        data: [],
        pagination: { totalCount: 0, nextOffset: DEFAULT_OFFSET },
        error: "",
      };
      break;
    case GET_PRODUCT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        item: action.payload,
        loading: false,
      };
      break;
    case GET_PRODUCT_ERROR:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_PRODUCT_CLEAR:
      state = {
        ...state,
        item: null,
        loading: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default products;
