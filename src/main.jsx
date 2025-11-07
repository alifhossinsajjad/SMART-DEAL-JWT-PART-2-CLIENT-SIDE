import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import AllProducts from "./Components/AllProducts/AllProducts.jsx";
import CreateAProduct from "./Components/CreateAProduct/CreateAProduct.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import MyBids from "./Components/MyBids/MyBids.jsx";
import MyProducts from "./Components/MyProducts/MyProducts.jsx";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails.jsx";
import Register from "./Components/Register/Register.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import PrivetRoutes from "./Context/PrivetRoutes.jsx";
import "./index.css";
import RootLayout from "./Layout/RootLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/myProducts",
        element: (
          <PrivetRoutes>
            <MyProducts></MyProducts>
          </PrivetRoutes>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivetRoutes>
            <MyBids></MyBids>
          </PrivetRoutes>
        ),
      },
      {
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(`https://dragon-ball-server.vercel.app//products/${params.id}`),
        element: (
          <PrivetRoutes>
            <ProductsDetails />
          </PrivetRoutes>
        ),
      },
      {
        path: "/createAProduct",
        element: (
          <PrivetRoutes>
            <CreateAProduct />
          </PrivetRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
