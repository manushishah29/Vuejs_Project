function myRouteGuard(to, from, next) {
  let isAuthenticated = false
  if (localStorage.getItem('token')) {
    isAuthenticated = true
  } else {
    isAuthenticated = false
  }
  if (isAuthenticated) {
    next()
  } else {
    next({ name: 'auth-login' })
  }
}

export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/dashboard',
    name: 'dashboard-ecommerce',
    beforeEnter: myRouteGuard,
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {

    path: '/users/:companyId',
    name: 'apps-users-list',
    beforeEnter: myRouteGuard,
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
  },
  {
    path: '/document',
    name: 'apps-invoice-list',
    beforeEnter: myRouteGuard,
    component: () => import('@/views/apps/document/DocumentList.vue'),
  },
  {
    path: '/messages',
    name: 'apps-chat',
    beforeEnter: myRouteGuard,
    component: () => import('@/views/apps/chat/Chat.vue'),
  },
]
