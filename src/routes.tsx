import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Client/Home";
import Products from "./pages/Client/Products";
import Favorites from "./pages/Client/Favorites";
import Contact from "./pages/Client/Contact";
import ClinetLayout from "./pages/Client";
import AdminHomePage from "./pages/Admin/Home";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/AddProduct";
import AdminProducts from "./pages/Admin/Products";
import AdminLayout from "./pages/Admin";
import ProductInfo from "./pages/Client/ProductInfo";

export const routes = createBrowserRouter([
  // Admin Side
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
    ],
  },

  // Client Side
  {
    path: "/",
    element: <ClinetLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductInfo />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
