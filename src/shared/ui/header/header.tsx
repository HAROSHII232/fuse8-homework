import { routes } from '@shared/services/routes';
import { NavLink } from 'react-router';

import styles from './header.module.css';
import { getNavRoutes } from '@shared/helpers';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : '';

export const Header = () => {
  const NAV_LINKS = getNavRoutes(routes);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {NAV_LINKS.map((route, index) => {
          return (
            <NavLink
              key={index}
              to={route.getLink()}
              className={getActiveClass}
            >
              {route.text}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
