
import store from '../store'


//layouts
import DefaultLayout from '@/layouts/default.vue'
import PublicLayout from '@/layouts/public.vue'

import Dashboard from '@/views/dashboard'
import LoginPage from '@/views/login'
// import TicketsListView from '@/views/tickets/ticketsList.vue'
// import TicketDetail from '@/views/tickets/ticketDetail.vue'
// import ListSettings from '@/views/settings/listSettings.vue'

// import ListAdminSettings from '@/views/settings/admin/listAdminSettings.vue'
// import ListAgents from '@/views/settings/admin/listAgents.vue'
// import ListGroups from '@/views/settings/admin/listGroups.vue'
// import ListTplAnswers from '@/views/settings/ListTplAnswers.vue'
// import listTasks from '@/views/settings/admin/listTasks.vue'




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

// let ticketPages = {
//     path: '/tickets',
//     component: DefaultLayout,
//     redirect: '/tickets/list',
//     children: [
//         {
//             path: 'list/:queueId',
//             component: TicketsListView,
//             meta: {
//                 requiresAuth: true
//             }
//         },
//         {
//             path: 'detail/:ticketId',
//             component: TicketDetail,
//             meta: {
//                 requiresAuth: true
//             }
//         }
//     ]
// }

// let settingsPages = {
//     path: '/settings',
//     component: DefaultLayout,
//     children: [
//         {
//             path: '/settings',
//             component: ListSettings,
//             meta: {
//                 requiresAuth: true
//             }
//         },
//         {
//             path: 'tpl',
//             component: ListTplAnswers, //!!!!! поменять
//             meta: {
//                 requiresAuth: true
//             }
//         }
//     ]
// }


// let adminSettingsPages = {
//     path: '/admin',
//     component: DefaultLayout,
//     children: [
//         {
//             path: 'panel',
//             component: ListAdminSettings,
//             meta: {
//                 requiresAuth: true,
//                 is_admin: true
//             }
//         },
//         {
//             path: 'agents',
//             component: ListAgents,
//             meta: {
//                 requiresAuth: true,
//                 is_admin: true
//             }
//         },
//         {
//             path: 'groups',
//             component: ListGroups,
//             meta: {
//                 requiresAuth: true,
//                 is_admin: true
//             }
//         },
//         {
//             path: 'tasks',
//             component: listTasks,
//             meta: {
//                 requiresAuth: true,
//                 is_admin: true
//             }
//         }
//     ]
// }



const routes = [
    {
        path: '*',
        redirect: '/dashboard',
    },
    {
        path: '/',
        component: DefaultLayout,
        redirect: '/dashboard',
        name: 'Dashboard layout',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    publicPages,
    // ticketPages,
    // settingsPages,
    // adminSettingsPages
]

export default routes
