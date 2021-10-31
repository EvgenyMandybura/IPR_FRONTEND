import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AllProductsPage from "../pages/user/allProducts";
import AddProductPage from "../pages/artist/addProduct";

const userRoutes = [
  { path: "/add-product", exact: true, component: AddProductPage },
  { path: "", exact: true, component: AllProductsPage },
];

const authRoutes = [
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
  { path: "/all-products", component: AllProductsPage },
  { path: "", exact: true, component: AllProductsPage },
];

export { userRoutes, authRoutes };
