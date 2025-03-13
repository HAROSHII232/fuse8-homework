import { routes } from '@shared/services/routes';
import { NavLink } from 'react-router';

import styles from './header.module.css';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : '';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to={routes.main.getLink()} className={getActiveClass}>
          Главная
        </NavLink>
        <NavLink to={routes.randomPost.getLink()} className={getActiveClass}>
          Рандомный пост
        </NavLink>
      </nav>
    </header>
  );
};
