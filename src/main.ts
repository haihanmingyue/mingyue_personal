import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import "./permission"; // permission control
import App from './App.vue'
import queryString from "query-string/index";
const { setToken } = require("./utils/auth");

Vue.config.productionTip = false
Vue.use(Element);

if (location.href.indexOf("JSESSIONID") !== -1) {
  // 地址栏有JSESSIONID 存到session storage
  const J_SESSION_ID_OBJ = queryString.parse(location.search);
  setToken(J_SESSION_ID_OBJ["JSESSIONID"]);
}

new Vue({
  router,
  store,
  render: h => h(App),
  created() {

  }
}).$mount('#app')
