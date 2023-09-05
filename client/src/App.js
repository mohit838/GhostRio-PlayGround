import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./componetnts/Dashboard";
import Login from "./componetnts/Login";
import Register from "./componetnts/Register";
import PrivateRoute from "./componetnts/auth/PrivateRoute";

const isLoggedIn = true;

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
  {
    path: "/protected",
    element: <PrivateRoute isAuthenticated={isLoggedIn} element={Dashboard} />,
  },
]);

export default function App() {
  return (
      <main className="loginForm">
        <RouterProvider router={router}></RouterProvider>
      </main>
  );
}
