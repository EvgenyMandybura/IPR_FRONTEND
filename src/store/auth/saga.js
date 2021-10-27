import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./actionTypes";

import {
  loginSuccess,
  loginError,
  logoutUserSuccess,
  logoutError,
  registerUserSuccess,
  registerUserError,
} from "./actions";

import AuthService from "../../services/AuthService";
import ToastrService from "../../services/ToastrService";
import UsersService from "../../services/UsersService";

const loginWithEmailPasswordAsync = async (email, password) => {
  const authUser = await AuthService.login({ password, email });
  // return authUser.data;
};

const signOutAsync = () => {
  return AuthService.signOut();
};

const registerWithEmailPasswordAsync = (
  email,
  password,
  firstName,
  lastName,
  role
) =>
  AuthService.register({
    email,
    password,
    firstName,
    lastName,
  });

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(
      loginWithEmailPasswordAsync,
      user.email,
      user.password
    );
    yield put(loginSuccess(response));
    history.push("/all-products");
  } catch (error) {
    ToastrService.error(error);
    yield put(loginError());
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield call(signOutAsync);
    yield put(logoutUserSuccess());
    history.push("/sign-in");
  } catch (error) {
    ToastrService.error(error.message);
    yield put(logoutError(error));
  }
}

function* signUpUser({ payload }) {
  const { email, password, firstName, lastName } = payload.user;
  const { history } = payload;
  try {
    const response = yield call(
      registerWithEmailPasswordAsync,
      email,
      password,
      firstName,
      lastName
    );

    yield put(registerUserSuccess(response));
    if (!!response.data.email) {
      history.push("/all-products");
    } else {
      history.push("/");
    }
  } catch (error) {
    ToastrService.error(error.message);
    yield put(registerUserError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogOut() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, signUpUser);
}

function* authSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLogOut),
    fork(watchUserRegister),
  ]);
}

export default authSaga;
