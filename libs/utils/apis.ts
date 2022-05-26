export const APIS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CHECK_EMAIL: '/auth/check-email',
    REFRESH_TOKEN: '/auth/refresh-token'
  },
  DASHBOARD: {
    USER_LIST: '/dashboard/list-users'
  }
};

export const getListRequestConfig = () => {
  return {
    page: 1,
    limit: 20,
    search: '',
    search_fields: [],
    sort: [['id', 'DESC']],
  };
};