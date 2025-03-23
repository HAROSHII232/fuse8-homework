/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './navigation.module.scss';

const USER_READ_PERMISSIONS = [
  'vacancies',
  'users',
  'candidates',
  'clients',
  'partners',
];

const checkHasUserPermission = (routeName: any) => {
  return USER_READ_PERMISSIONS.includes(routeName);
};

// Со звездочкой проверка прав асинхронная
// const checkHasUserPermission = async (routeName) => {
// 	return USER_READ_PERMISSIONS.includes(routeName)
// }

const routes = {
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
    text: 'Клиенты',
  },
};

const navigationList = [
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

const generateNavigationListWithPermissions = (
  navigationList,
  checkPermission
) => {
  return [];
};

export const NavigationPage = () => {
  const navigationListWithPermission = generateNavigationListWithPermissions(
    navigationList,
    checkHasUserPermission
  );
  return (
    <div className={styles.container}>
      {navigationListWithPermission.map((item) => item)}

      <div className={styles.navigation}>
        <div className={styles.navigationLevel1}>
          Контент
          <div className={styles.navigationLevel2}>
            Работа
            <div className={styles.navigationLevel3}>
              {checkHasUserPermission('vacancies') && <div>Вакансии</div>}
              {checkHasUserPermission('candidates') && <div>Кандидаты</div>}
            </div>
          </div>
          <div className={styles.navigationLevel2}>
            Новости
            <div className={styles.navigationLevel3}>
              {checkHasUserPermission('events') && <div>События</div>}
            </div>
          </div>
        </div>
        <div className={styles.navigationLevel1}>
          Пользователи
          <div className={styles.navigationLevel2}>
            Клиенты
            <div className={styles.navigationLevel3}>
              {checkHasUserPermission('clients') && <div>Клиенты</div>}
              {checkHasUserPermission('partners') && <div>Партнеры</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
