import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { authRoutes, userRoutes } from "./routes/allRoutes";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import NonAuthMiddleware from "./routes/middleware/NonAuthMiddleware";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
// import { AuthContext, AuthProvider } from "./Context/AuthContext";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AllProductsPage from "./pages/user/allProducts";

const App = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log("isAuth in App", isAuth);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        console.log("isAuth in PrivateRoute", isAuth);
        return isAuth ? <Component {...props} /> : <Redirect to="/sign-in" />;
      }}
    />
  );

  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <SignIn {...props} />} />
          <Route
            exact
            path="/sign-in"
            render={(props) => <SignIn {...props} />}
          />
          <Route
            exact
            path="/sign-up"
            render={(props) => <SignUp {...props} />}
          />
          <PrivateRoute
            exact
            path="/all-products"
            component={AllProductsPage}
          />
        </Switch>
      </Router>
    </>
  );
};

// export default App;

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

/*
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
 */
