import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import StorageService from "../../services/StorageService";
import Header from "../../components/layout/Header";

const AuthMiddleware = ({ component: Component, exact = false, roles }) => (
  <Route
    exact={exact}
    render={(props) => {
      const user = StorageService.user.value;
      const session = StorageService.session.value;

      if (!!user && session.accessToken && roles.includes(user.role)) {
        return (
          <>
            <Header />
            <Component {...props} />
          </>
        );
      }

      return (
        <Redirect
          to={{ pathname: "/sign-in", state: { from: props.location } }}
        />
      );
    }}
  />
);

export default withRouter(AuthMiddleware);
