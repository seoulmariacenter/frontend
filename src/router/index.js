import {Home, Admin, SignIn, Dashboard, Management, ProductDetail} from './lazy'

export const routes = [
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
        component:SignIn}
        ,
      {
        path: 'dashboard',
        name: 'Dashboard',
        component:Dashboard,
        children: [
          {
            path: 'management',
            name: 'Management',
            component: Management
          },
          {
            path: 'product/:pk',
            name: 'Product',
            component: ProductDetail,
            props: true
          }
        ]
      }
    ]
  }
];
