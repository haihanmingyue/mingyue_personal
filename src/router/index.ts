import Vue from 'vue'
import Router from 'vue-router'
import {types} from "sass";
import List = types.List;


Vue.use(Router)


//每次刷新页会调用的方法
export const createRouter = () => {
    let children;
    const roleList = <string>sessionStorage.getItem("roleList"); //从session 获取
    let arr;
    if (roleList) {
        arr = JSON.parse(<string>sessionStorage.getItem("roleList"));
    } else {
        arr = []; // 没有的话，说明已经关闭过浏览器了，从接口重新获取
    }
    arr = [
        {
            path: '/uploadPage',
            name: 'uploadPage',
            component: () => import('../views/upload.vue')
        }
    ] // 模拟获取到的

    if (arr) {
        children = [...arr];
    } else {
        children = [...[]]
    }
    let rra = [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
        }, {
            path: '/homePage',
            name: 'homePage',
            component: () => import('../views/homePage.vue'),
            children: [
                ...children
            ]
        }];
    let routes = [...rra]
    return new Router({
        mode: 'history',
        base: process.env.VUE_APP_PUBLIC_PATH,
        routes
    });
}

let router = createRouter();

//登录后会调用的方法
export const resetRouter = (roleList: any) => {
    let children;
    if (roleList) {

        children = [...roleList];
    } else {
        children = [...[]]
    }
    let rra = [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
        }, {
            path: '/homePage',
            name: 'homePage',
            component: () => import('../views/homePage.vue'),
            children: [
                ...children
            ]
        }];
    const routes = [...rra]
    router = new Router({
        mode: 'history',
        base: process.env.VUE_APP_PUBLIC_PATH,
        routes
    });
    return router;
}

export const getRoleList = () => {
    const role = <string>sessionStorage.getItem("roleList");
    let roleList;
    if (role) {
        roleList = JSON.parse(<string>sessionStorage.getItem("roleList"));
    } else {
        roleList = [];
    }
    roleList = [
        {
            path: '/uploadPage',
            name: 'uploadPage',
            nameCn: "媒体"
        }
    ]
    return roleList;
}

export default router
