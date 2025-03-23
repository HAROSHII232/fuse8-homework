import { LandingPage } from '@pages/landing';
import { MainPage } from '@pages/main';
import { NotFoundPage } from '@pages/not-found';
import { RandomPostPage } from '@pages/random-post';
import { routes } from '@shared/services/routes';
import { createBrowserRouter } from 'react-router';
import { LayoutWithHeader } from '../layouts/layout-with-header/layout-with-header';
import { NavigationPage } from '@pages/navigation';

export const router = createBrowserRouter([
  {
    path: routes.main.pathName,
    element: <LayoutWithHeader />,
    errorElement: <NotFoundPage />,
    children: [
      { path: routes.main.pathName, element: <MainPage />, index: true },
      { path: routes.randomPost.pathName, element: <RandomPostPage /> },
      { path: routes.navigation.pathName, element: <NavigationPage /> },
    ],
  },
  { path: routes.landing.pathName, element: <LandingPage /> },
]);
