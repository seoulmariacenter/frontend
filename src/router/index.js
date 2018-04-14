import {
  Home,
  Admin,
  SignIn,
  Dashboard,
  ProductManagement,
  ProductDetail,
  CreateManagement,
  CreateSchedule
} from './lazy'

export const routes = [
  {
    path: '*',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'signin',
        name: 'signIn',
        component:SignIn},
      {
        path: 'dashboard',
        name: 'Dashboard',
        component:Dashboard,
        meta: {requiresAuth: true},
        children: [
          {
            path: 'management',
            name: 'ProductManagement',
            component: ProductManagement
          },
          {
            path: 'product/:pk',
            name: 'Product',
            component: ProductDetail,
            props: true
          },
          {
            path: 'schedule/:pk',
            name: 'Schedule',
            component: CreateSchedule,
            props: true
          },
          {
            name: 'CreateManagement',
            path: 'create',
            component: CreateManagement
          }
        ]
      }
    ]
  }
];
