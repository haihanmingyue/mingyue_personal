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
                path: '/uploadPage',
                name: 'uploadPage',
                component: () => import('../views/upload.vue'),
            },
            {
                path: '/attach',
                name: 'uploadPage_attach',
                component: () => import('../views/attachType.vue'),
            },
            {
                path: '/attach/subType',
                name: 'uploadPage_attachSubType',
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
