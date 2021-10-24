import { combineReducers } from "redux";
import Auth from "./auth/reducer";
import products from "./products/reducer";

const rootReducer = combineReducers({
  Auth,
  products,
});

export default rootReducer;
