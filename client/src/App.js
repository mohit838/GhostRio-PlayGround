import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./componetnts/Dashboard";
import Login from "./componetnts/Login";
import Register from "./componetnts/Register";

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
    element: <Register></Register>,
  },
]);

export default function App() {
  return (
    <main className="loginForm">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
