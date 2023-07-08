import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import NotFound from "./components/common/NotFound";
import Password from "./components/utils/authUtils/Password";
import Profile from "./components/utils/authUtils/Profile";
import Recovery from "./components/utils/authUtils/Recovery";
import Reset from "./components/utils/authUtils/Reset";
import Username from "./components/utils/authUtils/Username";

// ROOT Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <NotFound />,
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
