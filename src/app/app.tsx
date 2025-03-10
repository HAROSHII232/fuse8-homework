import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <header>шапка</header>
      <Outlet />
    </>
  );
};
