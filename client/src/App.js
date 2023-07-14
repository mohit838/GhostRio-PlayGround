import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./componetnts/Dashboard";
import Login from "./componetnts/Login";
import Regiser from "./componetnts/Regiser";

// All routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Regiser></Regiser>,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
