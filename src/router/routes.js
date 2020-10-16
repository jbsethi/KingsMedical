import Dashboard from '../pages/Dashboard/Dashboard.vue'
import notFoundPage from '../pages/NotFound.vue'

// import { routePropResolver } from './util'
import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: `${DOMAIN_TITLE} | Dashboard` }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
