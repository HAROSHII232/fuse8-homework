import { MainPage } from '@pages/main';
import { RandomPostPage } from '@pages/random-post';
import { routes } from '@shared/services/routes';
import { createBrowserRouter } from 'react-router';
import { App } from './app';
import { NotFoundPage } from '@pages/not-found';
import { LandingPage } from '@pages/landing';

export const router = createBrowserRouter([
  {
    path: routes.main.pathName,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: routes.main.pathName, element: <MainPage />, index: true },
      { path: routes.randomPost.pathName, element: <RandomPostPage /> },
      { path: routes.landing.pathName, element: <LandingPage /> },
    ],
  },
]);
