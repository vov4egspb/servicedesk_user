
import DefaultLayout from '@/layouts/default.vue'
import PublicLayout from '@/layouts/public.vue'

import Dashboard from '@/views/dashboard'
import LoginPage from '@/views/login'

import CompaniesList from '@/views/companies/list.vue'
import CompanyDetails from '@/views/companies/details.vue'

let publicPages = {
  path: '/login',
  component: PublicLayout,
  children: [
    {
      path: '/login',
      component: LoginPage,
      meta: {
        guest: true
      }
    }
  ]
}

let companiesPages = {
  path: '/companies',
  component: DefaultLayout,
  redirect: '/companies/list',
  children: [
    {
      path: 'list',
      component: CompaniesList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'details/:id',
      component: CompanyDetails,
      meta: {
        requiresAuth: true
      }
    }
    
  ]
}

const routes = [
  {
    path: '*',
    redirect: '/companies/list',
  },
  publicPages,
  companiesPages,
]

export default routes
