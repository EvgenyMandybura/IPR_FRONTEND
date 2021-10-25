import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import Header from "../../components/layout/Header";
import { AuthContext } from "../../Context/AuthContext";

const AuthMiddleware = ({ component: Component, exact = false, roles }) => {
  const { isAuth } = useContext(AuthContext);
  console.log("isAuth in middleware", isAuth);

  return (
    <Route
      exact={exact}
      render={(props) => {
        if (isAuth) {
          return (
            <>
              <Header />
              <Component {...props} />
            </>
          );
        }

        return (
          <Redirect
            to={{ pathname: "/sign-up", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default withRouter(AuthMiddleware);
