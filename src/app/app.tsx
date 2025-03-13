import { Header } from '@shared/ui/header';
import { Outlet } from 'react-router';

import './index.css';

export const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
