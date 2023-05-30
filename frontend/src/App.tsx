import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import SingleProfile from './pages/SingleProfile';
import Followers from './pages/ProfilePages/Followers';
import Following from './pages/ProfilePages/Following';
import Photos from './pages/ProfilePages/Photos';
import ProfilePageLayout from './pages/ProfilePage';
import SinglePicture from './pages/ProfilePages/SinglePicture';
import LoginPage from './pages/LoginPage';
import UserPosts from './pages/ProfilePages/UserPosts';
import SettingsPage from './pages/Settings';
import InformationsPage from './pages/ProfilePages/Informations';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        },
        {
          path: 'profile',
          element: <ProfilePageLayout />,
          children: [
            {
              path: ':id',
              element: <SingleProfile />,
              children: [
                {
                  index: true,
                  element: <UserPosts />,
                },
                {
                  path: 'informations',
                  element: <InformationsPage />,
                },
                {
                  path: 'followers',
                  element: <Followers />,
                },
                {
                  path: 'following',
                  element: <Following />,
                },
                {
                  path: 'photos',
                  children: [
                    { index: true, element: <Photos /> },
                    {
                      path: ':name',
                      element: <SinglePicture />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'messages',
          element: <ChatPage />,
        },
        {
          path: 'discover',
          element: <Discover />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },

    // {
    //   path: '/',
    //   element: <Navigate to="/login" />,
    // },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
