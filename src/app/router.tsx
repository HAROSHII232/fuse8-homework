import { MainPage } from '@pages/main';
import { RandomPostPage } from '@pages/random-post';
import { routes } from '@shared/helpers/routes';
import { createBrowserRouter } from 'react-router';
import { App } from './app';
import { NotFoundPage } from '@pages/not-found';

export const router = createBrowserRouter([
  {
    path: routes.main.pathName,
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: routes.main.pathName, element: <MainPage />, index: true },
      { path: routes.randomPost.pathName, element: <RandomPostPage /> },
    ],
  },
]);
