export type Route = {
  name: string;
  pathname: string;
  getLink: () => string;
  text: string;
};

export const routes: Record<string, Route> = {
  main: {
    name: 'main',
    pathname: '/',
    getLink: () => '/',
    text: 'Главная',
  },
  randomPost: {
    name: 'random-post',
    pathname: 'random-post',
    getLink: () => `/random-post`,
    text: 'Рандомный пост',
  },
  landing: {
    name: 'landing',
    pathname: 'landing',
    getLink: () => `/landing`,
    text: 'Рандомный пост',
  },
  navigation: {
    name: 'navigation',
    pathname: 'navigation',
    getLink: () => `/navigation`,
    text: 'Навигация',
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
