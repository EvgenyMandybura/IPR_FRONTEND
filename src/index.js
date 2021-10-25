import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { UserProvider } from "./Context/AuthContext";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
