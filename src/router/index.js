import {Home, Admin, SignIn, Dashboard} from './lazy'

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
      {path: 'signin', name: 'signIn', component:SignIn},
      {path: 'dashboard', name: 'Dashboard', component:Dashboard}
    ]
  }
];
