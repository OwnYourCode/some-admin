type configKeys =
  | 'API_URL'
  | 'TITLE'
  | 'APP_VERSION'
  | 'IDENTITY_API_ROUTES'
  | 'IDENTITY_CLIENT_ID'
  | 'IDENTITY_CLIENT_SECRET'
  | 'IDENTITY_SCOPES'
  | 'IDENTITY_RESPONSE_TYPE'
  | 'IDENTITY_URL'
  | 'IDENTITY_REDIRECT_URI'
  | 'CLIENT_ROOT'
  | 'API_ROUTES';

type apiRouteKeys = 'AUTHORIZE' | 'LOGIN';

export const CONFIG: Record<configKeys, string | any> = {
  APP_VERSION: '1.0.0',
  TITLE: 'Staging',
  CLIENT_ROOT: process.env.REACT_APP_LOCALHOST,
  API_URL: process.env.REACT_APP_API_URL!,
  API_ROUTES: {
    partner: '/partners',
    partners: '/partners?',
    categories: '/categories?',
    companies: '/companies',
    apiKeys: '/partners',
    partnersSync: '/partners/synchronizations',
  },

  IDENTITY_URL: process.env.REACT_APP_IDENTITY_URL,
  IDENTITY_REDIRECT_URI: `${process.env.REACT_APP_LOCALHOST}/overview`,
  IDENTITY_API_ROUTES: {
    AUTHORIZE: '/identity/connect/authorize',
    LOGIN: '/identity/connect/token',
  } as Record<apiRouteKeys, string>,
  IDENTITY_CLIENT_ID: 'PartnersPortal',
  IDENTITY_CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET!,
  IDENTITY_SCOPES: 'openid permissions bookingplanner companyids offline_access',
  IDENTITY_RESPONSE_TYPE: 'code',
} as const;
