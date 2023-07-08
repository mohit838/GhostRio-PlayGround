import { RouterProvider, createBrowserRouter } from "react-router-dom";

// ROOT Router

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/register",
    element: <div>Register</div>,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
