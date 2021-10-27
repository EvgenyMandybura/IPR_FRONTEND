import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { authRoutes, userRoutes } from "./routes/allRoutes";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import NonAuthMiddleware from "./routes/middleware/NonAuthMiddleware";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
          <Switch>
          {authRoutes.map((route, idx) => (
              <NonAuthMiddleware
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                  key={idx}
              />
          ))}

          {userRoutes.map((route, idx) => {
              return (
                  <AuthMiddleware
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                      roles={route.roles}
                      key={idx}
                  />
              );
          })}
        </Switch>
      </Router>
    </>
  );
};



export default App;

