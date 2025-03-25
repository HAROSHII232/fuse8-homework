/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPermittedNavigation, NavigationItem } from '@shared/helpers';
import { Route, routes } from '@shared/services';
import { Link } from 'react-router';

import styles from './navigation-with-permission.module.scss';

export type RouteName = (typeof USER_READ_PERMISSIONS)[number];

const USER_READ_PERMISSIONS = [
  'vacancies',
  'candidates',
  'events',
  'users',
  'clients',
  'partners',
] as const;

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

const checkHasUserPermission = (routeName: RouteName) => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

export const NavigationWithPermission = () => {
  const navigationListWithPermission = getPermittedNavigation(
    navigationList,
    checkHasUserPermission
  );

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
