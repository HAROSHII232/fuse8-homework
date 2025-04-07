import { RouteName } from '@pages/navigation';
import { Route } from '@shared/services';

export type NavigationItem = {
  name: string;
  text: string;
  children: (NavigationItem | Route)[];
};

export type CheckPermission = (routeName: RouteName) => Promise<boolean>;

export const isRoute = (item: NavigationItem | Route): item is Route =>
  'pathname' in item;

const handleRoute = async (
  route: Route,
  checkPermission: CheckPermission
): Promise<Route | null> => {
  const hasPermission = await checkPermission(route.name as RouteName);
  return hasPermission ? route : null;
};

const handleNavigationItem = async (
  item: NavigationItem,
  checkPermission: CheckPermission
): Promise<NavigationItem | null> => {
  const permittedChildren = await getPermittedNavigation(
    item.children,
    checkPermission
  );
  return permittedChildren.length > 0
    ? { ...item, children: permittedChildren }
    : null;
};

export const getPermittedNavigation = async (
  navigationList: (NavigationItem | Route)[],
  checkPermission: CheckPermission
): Promise<NavigationItem[]> => {
  const processedItems = await Promise.all(
    navigationList.map(async (item) => {
      if (isRoute(item)) {
        return await handleRoute(item, checkPermission);
      }
      return await handleNavigationItem(item, checkPermission);
    })
  );

  return processedItems.filter(Boolean) as NavigationItem[];
};
