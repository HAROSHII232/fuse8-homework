import { Header } from '@shared/ui/header';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
