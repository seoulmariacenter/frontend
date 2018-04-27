import {
  Home,
  Admin,
  SignIn,
  Dashboard,
  Reservation,
  ProductManagement,
  ProductDetail,
  ProductCreate,
  ProductUpdate,
  ScheduleCreate,
  ReservationManagement,
  ReservationComplete,
  ReservationCheck,
  ReservationDetail,
  ReservationCancelComplete,
  ReservationList,
  Provision
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
    path: '/provision',
    name: 'Provision',
    component: Provision,
    children: [

    ]
  },
  {
    path:'/reservation',
    name: 'Reservation',
    component: Reservation,
    children: [
      {
        path: 'management',
        name: 'ReservationManagement',
        component: ReservationManagement
      },
      {
        path: 'complete',
        name: 'Complete',
        component: ReservationComplete
      },
      {
        path: 'check',
        name: 'Check',
        component: ReservationCheck,
        meta: {hasReservation: true}
      },
      {
        path: 'detail',
        name: 'Detail',
        component: ReservationDetail
      },
      {
        path: 'cancel',
        name: 'Cancel',
        component: ReservationCancelComplete
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'signin',
        name: 'signIn',
        component: SignIn,
        meta: {hasToken: true}
      },
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
            path: 'create',
            name: 'ProductCreate',
            component: ProductCreate
          },
          {
            path: 'product/:pk',
            name: 'Product',
            component: ProductDetail,
            props: true
          },
          {
            path: 'product/:pk/update',
            name: 'ProductUpdate',
            component: ProductUpdate,
            props: true
          },
          {
            path: 'product/:pk/reservation',
            name: 'ReservationList',
            component: ReservationList,
            props: true
          },
          {
            path: 'schedule/:pk',
            name: 'Schedule',
            component: ScheduleCreate,
            props: true
          }
        ]
      }
    ]
  }
];
