import router from "./router";
import store from "./store";
import {getLocalToken, getToken} from "@/utils/auth";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import {h} from "vue"; // progress bar style
import Cookies from 'js-cookie';
import Element from "element-ui";
import {checkLogin} from "@/api";

const whiteList = [
  "login"
];

let flag = false;

export const findPath = (routerName, routerList) =>{
  flag = false;
  // console.log("routerName", routerName)
  // console.log("routerList", routerList)
  if (routerName && routerList && routerList.length > 0) { // 判断是否有
    for (let i in routerList) {
      if (routerList[i].name === routerName) {
        // console.log("routerList[i].name", routerList[i].name)
        flag = true;
        return;
      }
      if (routerList[i].children && routerList[i].children.length > 0) {
        findPath(routerName,routerList[i].children)
      }
    }
  }
}

router.beforeEach(async (to, from, next) => {

  if (to.path === '/') {

    //获取缓存中的路由
    const routerList = store.getters.getRouterList;
    console.log("to.name", to.name)
    findPath(to.name, routerList);
    if (flag) {
         //更新router的路由
         router.options = routerList;
         router.addRoutes(routerList)
         next({name: to.name});
     } else {
      if (to.name === 'homePage') {
        Element.Message.error('没有分配任何权限，请联系管理员');
      } else {
        Element.Message.error('没有该功能权限');
      }
    }

  }
  else {

    //检查是否在白名单
    if (whiteList.includes(to.name)) {
      if (to.name === 'login') {
        let hasToken = getToken();
        if (!hasToken) {
          hasToken = getLocalToken();
        }
        if (hasToken) {
          const cookie = Cookies.get("JSESSIONID");
          if (!cookie) {
            Cookies.set("JSESSIONID",hasToken);
          }
          next({ name: "homePage" });
        }
      }
      next();
    }
    //没有在的话
    else {
      // NProgress.start();
      await checkLogin(); //验证登录
      let hasToken = getToken(); // 获取session storage里面的JSESSIONID 这个token浏览器关闭就会清除

      if (!hasToken) {
        hasToken = getLocalToken(); //从local 获取

      }

      if (hasToken) {
        const cookie = Cookies.get("JSESSIONID"); //放入cookie
        if (!cookie) {
          Cookies.set("JSESSIONID",hasToken);
        }
        next();
      } else {
        next({name: "login"});
        // NProgress.done();
      }
    }

  }
});

router.afterEach((to, from) => {
  NProgress.done()
});

