import { all } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import productsSaga from "./products/saga";

export default function* rootSaga() {
  yield all([AuthSaga(), productsSaga()]);
}
