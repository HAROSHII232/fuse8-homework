import { LandingPage } from '@pages/landing';
import { MainPage } from '@pages/main';
import { NotFoundPage } from '@pages/not-found';
import { RandomPostPage } from '@pages/random-post';
import { routes } from '@shared/services/routes';
import { createBrowserRouter } from 'react-router';

import { NavigationPage } from '@pages/navigation';
import { LayoutWithHeader } from '@layouts/layout-with-header';

export const router = createBrowserRouter([
  {
    path: routes.main.pathname,
    element: <LayoutWithHeader />,
    errorElement: <NotFoundPage />,
    children: [
      { path: routes.main.pathname, element: <MainPage />, index: true },
      { path: routes.randomPost.pathname, element: <RandomPostPage /> },
      { path: routes.navigation.pathname, element: <NavigationPage /> },
    ],
  },
  { path: routes.landing.pathname, element: <LandingPage /> },
]);
