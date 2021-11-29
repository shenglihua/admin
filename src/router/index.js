import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/index',
        component: () => import('../views/index.vue'),
        children: [{
                path: '/',
                redirect: 'UserControl'
            },
            {
                path: 'UserControl',
                component: () => import('../views/second/UserControl.vue')
            },
            {
                path: 'roles',
                component: () => import('../components/Permissions/roles.vue')
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router