import {Home, Admin, SignIn} from './lazy'

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
      {path: 'signin', component:SignIn}
    ]
  }
];
