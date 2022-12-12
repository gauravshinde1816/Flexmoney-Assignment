import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Form from "./components/Form";
import UserDetails from "./components/UserDetails";
import Users from "./components/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "form/",
        element: <Form />,
      },
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "users/:userid",
        element: <UserDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
