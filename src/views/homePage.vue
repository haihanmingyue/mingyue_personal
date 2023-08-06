<template>
  <div>
    <div class="header">
      <div class="box">
        <nav>
          <a active-class="active" @click="go('media')"> 媒体</a>
        </nav>
        <div style="position: absolute;right: 20px">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar class="el-dropdown-link" src="favicon.ico"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'person'">个人中心</el-dropdown-item>
              <el-dropdown-item :command="'change'">修改密码</el-dropdown-item>
              <el-dropdown-item :command="'loginOut'">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="contents">
      <div class="content">
        <!--指定组件的位置-->
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>

import views from "@/utils/views"

const {removeLocalToken} = require("@/utils/auth");

const {removeToken} = require("@/utils/auth");

const {loginOut} = require("@/api");
export default {
  name: "homePage",
  mixins: [views],
  methods: {
    handleClick() {

    },
    handleCommand(val) {
      switch (val) {
        case "loginOut":
          this.loginOut();
          break;
        default:
          alert(val);
          break
      }
    },
    async loginOut() {
      const res = await loginOut();
      if (res && res.code && res.code === 200) {
        removeToken();
        removeLocalToken();
        this.goPage({routeName: 'login', params: {}})
      }
    },
    go(type) {
      switch (type) {
        case 'media':
          this.goPage({routeName: 'upload', params: {}})
          break;
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #292c2f;
  color: #ffffff;

  /*吸顶效果*/
  /* position: sticky;
   position: -webkit-sticky;    !*兼容 -webkit 内核的浏览器*!
   top: 0px;                    !*必须设一个值，否则不生效*!*/

}

.box {
  display: flex;
  align-items: center;
}

h1 {
  display: flex;
  align-items: center;
  font: normal 28px Cookie, Arial, Helvetica, sans-serif;
  padding: 0px 20px;
}

img {
  width: 40px;
  height: 40px;
}

nav {
  display: flex;
  align-items: center;
  margin: 0px 40px;
  font: 16px Arial, Helvetica, sans-serif;
}

nav a {
  padding: 0 15px;
  width: 50px;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: normal;
  opacity: 0.9;
}

nav a:hover {
  opacity: 1;
}

.active {
  color: #608bd2;
  pointer-events: none;
  opacity: 1;
}

/*搜索框*/

.text {
  height: 22px;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 3px 16px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.text:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

.button {
  width: 60px;
  height: 30px;
  font-size: 14px;
  margin-right: 35px;
  border: 1px solid #608bd2;
  background-color: #608bd2;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.contents {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  width: 1400px;
  height: 1400px;
  /*background-color: #f0f2f3;*/
}
</style>
