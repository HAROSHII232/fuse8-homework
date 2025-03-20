import { Header } from '@shared/ui/header';
import { Outlet } from 'react-router';

import styles from './layout-with-header.module.scss';

export const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};
