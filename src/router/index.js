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
                redirect: 'users'
            },
            {
                path: 'users',
                component: () => import('../views/second/users.vue')
            },
            {
                path: 'roles',
                component: () => import('../components/Permissions/roles.vue')
            },
            {
                path: 'rights',
                component: () => import('../components/Permissions/rights.vue')
            },
            {
                path: 'productlist',
                component:()=>import('../views/second/productlist.vue')
            },
            {
                path: 'reports',
                component:()=>import('../views/second/reports.vue')
            },
            {
                path: 'categories',
                component:()=>import('../views/second/categories.vue')
            },
            {
                path: 'goods',
                component:()=>import('../views/second/goods.vue')
            },
            
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router