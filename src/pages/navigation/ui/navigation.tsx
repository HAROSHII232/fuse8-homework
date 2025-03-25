/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router';
import styles from './navigation.module.scss';

type Route = {
  name: RouteName | string;
  pathname: string;
  getLink: () => string;
  text: string;
};

type NavigationItem = {
  name: string;
  text: string;
  children: (NavigationItem | Route)[];
};

type RouteName = (typeof USER_READ_PERMISSIONS)[number];
type CheckPermission = (routeName: RouteName) => boolean;

const USER_READ_PERMISSIONS = [
  'vacancies',
  'candidates',
  'events',
  'users',
  'clients',
  'partners',
] as const;

const checkHasUserPermission: CheckPermission = (routeName) => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

const routes: Record<string, Route> = {
  vacancies: {
    name: 'vacancies',
    pathname: 'vacancies',
    getLink: () => '/vacancies',
    text: 'Вакансии',
  },
  candidates: {
    name: 'candidates',
    pathname: 'candidates',
    getLink: () => '/candidates',
    text: 'Кандидаты',
  },
  events: {
    name: 'events',
    pathname: 'events',
    getLink: () => '/events',
    text: 'События',
  },
  clients: {
    name: 'clients',
    pathname: 'clients',
    getLink: () => '/clients',
    text: 'Клиенты',
  },
  partners: {
    name: 'partners',
    pathname: 'partners',
    getLink: () => '/partners',
    text: 'Партнёры',
  },
};

const navigationList: NavigationItem[] = [
  {
    name: 'content',
    text: 'Контент',
    children: [
      {
        name: 'job',
        text: 'Работа',
        children: [routes.vacancies, routes.candidates],
      },
      {
        name: 'news',
        text: 'Новости',
        children: [routes.events],
      },
    ],
  },
  {
    name: 'users',
    text: 'Пользователи',
    children: [
      {
        name: 'inner-users',
        text: 'Внутренние пользователи',
        children: [routes.clients, routes.partners],
      },
    ],
  },
];

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
const getPermittedNavigation = (
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

export const Navigation = () => {
  const navigationListWithPermission = getPermittedNavigation(
    navigationList,
    checkHasUserPermission
  );
  console.log(navigationListWithPermission);

  if (navigationListWithPermission.length === 0) {
    return null;
  }

  return (
    <nav className={styles.navigation}>
      {navigationListWithPermission.map((level1: any) => (
        <div key={level1.name} className={styles.navigationLevel1}>
          {level1.text}
          {level1.children.map((level2: any) => (
            <div key={level2.name} className={styles.navigationLevel2}>
              {level2.text}
              <div className={styles.navigationLinks}>
                {level2.children.map(({ name, text, getLink }: Route) => (
                  <Link key={name} to={getLink()}>
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};
