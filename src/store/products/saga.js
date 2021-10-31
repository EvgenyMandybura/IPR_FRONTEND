import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getListProductsError,
  getListProductsSuccess,
  getProductSuccess,
  getProductError,
  createProductSuccess,
  createProductError,
} from "./actions";
import { GET_LIST_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT } from "./actionTypes";

import ProductsService from "../../services/ProductService";
import ToastrService from "../../services/ToastrService";

const getProductsListAsync = async (url) => {
  return await ProductsService.getAllList(url);
};

const getProductAsync = async (id) => {
  return await ProductsService.getProduct(id);
};

const createProductAsync = async (model) => {
  return await ProductsService.createProduct(model);
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

function* createProduct({ payload: model }) {
  try {
    const response = yield call(createProductAsync, model);
    yield put(createProductSuccess(response));
  } catch (error) {
    ToastrService.error(error.message);
    yield put(createProductError());
  }
}

export function* watchGetProductsList() {
  yield takeEvery(GET_LIST_PRODUCTS, getProductsList);
}

export function* watchGetProduct() {
  yield takeEvery(GET_PRODUCT, getProduct);
}

export function* watchCreateProduct() {
  yield takeEvery(CREATE_PRODUCT, createProduct);
}

function* productsSaga() {
  yield all([
    fork(watchGetProductsList),
    fork(watchGetProduct),
    fork(watchCreateProduct),
  ]);
}

export default productsSaga;
