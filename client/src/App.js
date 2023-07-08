import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Password from './components/auth/Password';
import Profile from './components/auth/Profile';
import Recovery from './components/auth/Recovery';
import Register from './components/auth/Register';
import Reset from './components/auth/Reset';
import Username from './components/auth/Username';
import NotFound from './components/common/NotFound';

// ROOT Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/password',
    element: <Password />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '*',
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
