import Vue from 'vue';
import Router from 'vue-router';
import store from "@/store";
// @ts-ignore
import {getRole} from "@/api/index.js"

Vue.use(Router)

let router: Router;
//每次刷新页会调用的方法

export const translate = (roleList: any) => {

    for (let i in roleList) {
        const str = roleList[i].component;
        roleList[i] = {
            path: roleList[i].path,
            name: roleList[i].name,
            component: () => import(`@/views/${str}`),
            children: [...roleList[i].childrenList]
        };
        if (roleList[i].children.length > 0) {
            translate(roleList[i].children)
        }

    }

}

export const createRouter = async () => {

    const roleList = store.getters.getRoleList

    let arr: any[];
    if (roleList && roleList.length > 0) {

        arr = Object.assign([],roleList);

    } else {
        let res = await getRole();
        arr = Object.assign([],res.data); //直接arr = res.data , 修改arr 就等于修改res.data,影响store.commit('SET_ROLE_LIST',res.data);
        store.commit('SET_ROLE_LIST',res.data);

    }
    let routes: any[] = [
        {
            path: '/',
            redirect: '/login'
        }
    ];
    if (arr && arr.length > 0)  {
        translate(arr);
        store.commit("SET_ROUTER_LIST", arr);
        routes.push(...arr);
    } else {
        routes.push(...[
            {
                path: '/login',
                name: 'login',
                component: () => import('../views/login.vue'),
                children: []
            },
            {
                path: '/homePage',
                name: 'homePage',
                component: () => import('../views/homePage.vue'),
                children: []
            }
        ])
    }

    router = new Router({
        mode: 'history',
        base: process.env.VUE_APP_PUBLIC_PATH,
        routes
    });
    return router;
}

router = await createRouter();


//登录后会调用的方法
export const resetRouter = async () => {
    router = await createRouter();
}

export const getRoleList = () => {
    return store.getters.getRoleList;
}

export default router
