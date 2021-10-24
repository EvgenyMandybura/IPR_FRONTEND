import {
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGIN_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actionTypes";

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = ({ user }) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const logoutError = ({ message }) => {
  return {
    type: LOGOUT_ERROR,
    payload: { message },
  };
};

export const registerUser = (user, history) => {
  return {
    type: REGISTER_USER,
    payload: { user, history },
  };
};

export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};

export const registerUserError = ({ message }) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});
