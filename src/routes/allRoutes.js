import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AllProductsPage from "../pages/user/allProducts";

const userRoutes = [
  { path: "/all-products", component: AllProductsPage },
  { path: "/", exact: true, component: AllProductsPage },
];

const authRoutes = [
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
];

export { userRoutes, authRoutes };
