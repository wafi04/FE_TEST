import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { DashboardHome, DashboardParent } from "../pages/dashboard/Dashboard";
import { DashboardProduct } from "../pages/dashboard/Dashboard_Product";

export const Router = createBrowserRouter([
  {
    // router page main pag
    path: "/",
    element: <App />,
  },
  {
    // router page register
    path: "/auth/register",
    element: <Register />,
  },
  {
    //   router page login
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    //   it's main primary page  if in nextjs is layout
    path: "/dashboard",
    element: <DashboardParent />,
    children: [
      {
        //   its make priamry dashboard
        index: true,
        element: <DashboardHome />,
      },
      {
        // its children page dashboard on page dashboard/products
        path: "products",
        element: <DashboardProduct />,
      },
    ],
  },
]);
