import { LandingPage } from '@pages/landing';
import { MainPage } from '@pages/main';
import { Navigation } from '@pages/navigation';
import { NotFoundPage } from '@pages/not-found';
import { RandomPostPage } from '@pages/random-post';
import { routes } from '@shared/services/routes';
import { createBrowserRouter } from 'react-router';
import { LayoutWithHeader } from '../layouts/layout-with-header/layout-with-header';

export const router = createBrowserRouter([
  {
    path: routes.main.pathname,
    element: <LayoutWithHeader />,
    errorElement: <NotFoundPage />,
    children: [
      { path: routes.main.pathname, element: <MainPage />, index: true },
      { path: routes.randomPost.pathname, element: <RandomPostPage /> },
      { path: routes.navigation.pathname, element: <Navigation /> },
    ],
  },
  { path: routes.landing.pathname, element: <LandingPage /> },
]);
