import { routes } from '@shared/services/routes';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to={routes.main.getLink()}>Главная</NavLink>
        <NavLink to={routes.randomPost.getLink()}>Рандомный пост</NavLink>
      </nav>
    </header>
  );
};
