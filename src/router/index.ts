import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/homePage.vue'),
        children: [
            {
                path: '/homePage/upload',
                name: 'upload',
                component: () => import('../views/upload.vue'),
            },
            {
                path: '/homePage/attach',
                name: 'attach',
                component: () => import('../views/attachType.vue'),
                children: [
                ]
            },
            {
                path: '/homePage/attach/subType',
                name: 'attachSubType',
                component: () => import('../views/attachSubType.vue'),
            }
        ]
    }
]

const createRouter = () =>
    new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_PUBLIC_PATH,
    routes
})


const router = createRouter();

export default router
