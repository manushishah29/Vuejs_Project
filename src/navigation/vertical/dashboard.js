import store from '@/store'

export default [
  {
    title: 'Dashboard',
    icon: 'HomeIcon',
    route: 'dashboard-ecommerce',
    tagVariant: 'light-warning',
  },
  {
    title: 'Users',
    icon: 'UsersIcon',
    route: { name: 'apps-users-list', params: { companyId: store.state.companyId } },

  },
  {
    title: 'Document',
    icon: 'FileTextIcon',
    route: 'apps-invoice-list',
  },
  {
    title: 'Messages',
    route: 'apps-chat',
    icon: 'MessageSquareIcon',
  },
]
