export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/account-management',
    name: 'Account management',
    icon: 'SettingOutlined',
    access: 'normalRouteFilter',
    routes: [
      {
        path: '/account-management',
        redirect: '/account-management/accounts',
      },
      {
        path: '/account-management/accounts',
        name: 'Account',
        icon: 'TeamOutlined',
        access: 'normalRouteFilter',
        component: './system/accounts',
      },
      {
        path: '/account-management/products',
        name: 'Product',
        icon: 'TeamOutlined',
        access: 'normalRouteFilter',
        component: './system/products',
      }
    ],
  },
  {
    component: './system/settings',
    access: 'normalRouteFilter',
    path: '/settings/:tab',
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'setting',
    access: 'normalRouteFilter',
    component: './system/settings',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
