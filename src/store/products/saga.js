import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getListProductsError,
  getListProductsSuccess,
  getProductSuccess,
  getProductError,
} from "./actions";
import { GET_LIST_PRODUCTS, GET_PRODUCT } from "./actionTypes";

import ProductsService from "../../services/ProductService";

const getProductsListAsync = async (url) => {
  return await ProductsService.getAllList(url);
};

const getProductAsync = async (id) => {
  return await ProductsService.getProduct(id);
};

function* getProductsList({ payload: { url } }) {
  try {
    const response = yield call(getProductsListAsync, url);
    yield put(getListProductsSuccess(response));
  } catch (error) {
    yield put(getListProductsError(error));
  }
}

function* getProduct({ payload: { productId } }) {
  try {
    const response = yield call(getProductAsync, productId);
    yield put(getProductSuccess(response));
  } catch (error) {
    yield put(getProductError(error));
  }
}

export function* watchGetProductsList() {
  yield takeEvery(GET_LIST_PRODUCTS, getProductsList);
}

export function* watchGetProduct() {
  yield takeEvery(GET_PRODUCT, getProduct);
}

function* productsSaga() {
  yield all([fork(watchGetProductsList), fork(watchGetProduct)]);
}

export default productsSaga;
