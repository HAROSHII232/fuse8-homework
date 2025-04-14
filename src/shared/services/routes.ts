export type Route = {
  name: string;
  pathname: string;
  getLink: () => string;
  text: string;
  showInNav?: boolean;
};

export const routes: Record<string, Route> = {
  main: {
    name: 'main',
    pathname: '/',
    getLink: () => '/',
    text: 'Главная',
    showInNav: true,
  },
  randomPost: {
    name: 'random-post',
    pathname: 'random-post',
    getLink: () => `/random-post`,
    text: 'Рандомный пост',
    showInNav: true,
  },
  landing: {
    name: 'landing',
    pathname: 'landing',
    getLink: () => `/landing`,
    text: 'Рандомный пост',
    showInNav: true,
  },
  navigation: {
    name: 'navigation',
    pathname: 'navigation',
    getLink: () => `/navigation`,
    text: 'Навигация',
    showInNav: true,
  },
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
    text: 'Партнёры',
  },
};
