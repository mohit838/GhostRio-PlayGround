import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./componetnts/Home";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
