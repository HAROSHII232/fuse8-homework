import {
  getPermittedNavigation,
  isRoute,
  NavigationItem,
} from '@shared/helpers';
import { routes } from '@shared/services';
import { Link } from 'react-router';

import styles from './navigation-with-permission.module.scss';
import { useEffect, useState } from 'react';
import { Loader } from '@shared/ui/loader';

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

const checkHasUserPermission = async (routeName: RouteName) => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

export const NavigationWithPermission = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const result = await getPermittedNavigation(
          navigationList,
          checkHasUserPermission
        );
        setNavigationItems(result);
      } catch (err) {
        setNavigationItems([]);
        console.error('Failed to load navigation:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavigation();
  }, [navigationItems]);

  if (isLoading) {
    return <Loader />;
  }

  if (!navigationItems.length) {
    return <div>Нет доступных разделов</div>;
  }

  return (
    <nav className={styles.navigation} aria-label="Main navigation">
      <ul className={styles.navigationList} role="menu">
        {navigationItems.map((level1) => (
          <li key={level1.name} className={styles.navigationLevel1} role="none">
            <span role="menuitem">{level1.text}</span>
            <ul>
              {level1.children.map((level2) => (
                <li
                  key={level2.name}
                  className={styles.navigationLevel2}
                  role="none"
                >
                  <span role="menuitem">{level2.text}</span>
                  <ul className={styles.navigationLinks}>
                    {'children' in level2 &&
                      level2.children.map((route) =>
                        isRoute(route) ? (
                          <li key={route.name} role="none">
                            <Link
                              to={route.getLink()}
                              className={styles.navigationLink}
                              role="menuitem"
                            >
                              {route.text}
                            </Link>
                          </li>
                        ) : null
                      )}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
