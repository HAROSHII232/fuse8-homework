import { RouteName } from '@pages/navigation';
import { Route } from '@shared/services';

export type NavigationItem = {
  name: string;
  text: string;
  children: (NavigationItem | Route)[];
};

export type CheckPermission = (routeName: RouteName) => boolean;

const isRoute = (item: NavigationItem | Route): item is Route =>
  'pathname' in item;

const handleRoute = (
  route: Route,
  checkPermission: CheckPermission
): Route | null => {
  return checkPermission(route.name as RouteName) ? route : null;
};

const handleNavigationItem = (
  item: NavigationItem,
  checkPermission: CheckPermission
): NavigationItem | null => {
  const permittedChildren = getPermittedNavigation(
    item.children,
    checkPermission
  );
  return permittedChildren.length > 0
    ? { ...item, children: permittedChildren }
    : null;
};

export const getPermittedNavigation = (
  navigationList: (NavigationItem | Route)[],
  checkPermission: CheckPermission
): NavigationItem[] => {
  return navigationList
    .map((item) =>
      isRoute(item)
        ? handleRoute(item, checkPermission)
        : handleNavigationItem(item, checkPermission)
    )
    .filter(Boolean) as NavigationItem[];
};
