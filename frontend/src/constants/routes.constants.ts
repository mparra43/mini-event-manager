export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EVENTS: {
    LIST: '/events',
    DETAIL: (id: number) => `/events/${id}`,
    CREATE: '/events/create',
    EDIT: (id: number) => `/events/create?id=${id}`,
  },
} as const;
