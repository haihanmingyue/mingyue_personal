import router from "./router";
import store from "./store";
import {getLocalToken, getToken} from "@/utils/auth";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import {h} from "vue"; // progress bar style
import Cookies from 'js-cookie';
import Element from "element-ui";

const whiteList = [
  "login"
];

router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
    if (to.name === 'homePage') {
      Element.Message.error('没有分配任何权限，请联系管理员');
    } else {
      Element.Message.error('没有该功能权限');
    }

  } else {

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
    else {
      // NProgress.start();
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
  // NProgress.done(); //打开一个页面转圈圈，加载完圈圈消失
});

