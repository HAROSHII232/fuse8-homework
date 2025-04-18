import { Route } from '@shared/services';

export const getNavRoutes = (routes: Record<string, Route>) =>
  Object.values(routes).filter((route) => route.showInNav);
