import Vue from 'vue';
import Router from 'vue-router';

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

    const roleList = <any>sessionStorage.getItem("roleList"); //从session 获取
    let arr: any[];
    if (roleList) {

        arr = JSON.parse(roleList);

    } else {
        let res = await getRole();

        arr = res.data;
        sessionStorage.setItem("roleList", JSON.stringify(res.data)); //存入session

    }
    let routes: any[] = [
        {
            path: '/',
            redirect: '/login'
        }
    ];
    if (arr && arr.length > 0)  {
        translate(arr);
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
    const role = JSON.parse(<string>sessionStorage.getItem("roleList"));
    let roleList: any = [];
    if (role) {
        roleList = JSON.parse(<string>sessionStorage.getItem("roleList"));
    }
    return roleList;
}

export default router
