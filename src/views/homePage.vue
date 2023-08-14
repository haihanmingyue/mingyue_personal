<template>
  <div class="bg">

    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             @select="handleSelect"
             :text-color="'#fff'"
             menu-trigger="click"
             :active-text-color="'#ffd04b'"
    >
      <div class="titleMenu" style="float: left;width: 50%;max-height: 60px;">
        <el-menu-item style="float: left" v-for="(i,index) in pageList" :key="index" :index="i.name"
        >
          {{i.nameCn}}
        </el-menu-item>
        <el-menu-item v-if="pageList == null || pageList.length === 0" style="float: left"></el-menu-item>
      </div>
      <div class="titleMenu2" style="float: left;min-width: 80px;max-height: 60px;background-color: #292c2f">
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i></template>
          <el-menu-item v-for="(i,index) in pageList" :index="i.name" :key="index">{{i.nameCn}}</el-menu-item>
        </el-submenu>
      </div>
      <div class="headerPic" style="position: absolute;right: 20px;bottom: 6px">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar class="el-dropdown-link"
                     :src="'/mingyue/attach/download?uuid='+ getUsetHeaderPic()"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'person'">个人中心</el-dropdown-item>
            <el-dropdown-item :command="'change'">修改密码</el-dropdown-item>
            <el-dropdown-item :command="'loginOut'">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>

<!--    子路由-->
    <div class="children_page" style="display: block;margin: 0 auto;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script>

import views from "@/utils/views"
import {removeLocalToken,removeToken} from "@/utils/auth";
import { getRoleList } from "@/router"
import { loginOut,checkLogin } from "@/api"
export default {
  name: "homePage",
  mixins: [views],
  data() {
    return {
      activeIndex: '',
      pageList: [],
    }
  },
  created() {
    this.$nextTick(async () => {
      this.pageList = [
        {
          name: "homePage",
          nameCn: "首页",
          isTitleMenu: 1
        }
      ];
      const arr = getRoleList();
      for (const i in arr) {
        const obj = arr[i];
        if (obj.name === 'homePage') {
          this.pageList.push(...obj.childrenList)
        }
      }
      this.pageList = this.pageList.filter(i => {
        return i.isTitleMenu === 1
      })
      this.activeIndex = this.$route.name
      await checkLogin();
    })
  },
  activated() {
  },
  methods: {
    handleClick() {

    },
    getUsetHeaderPic() {
      return '1ff6f5be-b755-4f50-8885-de51788d9f0d';
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
        sessionStorage.removeItem("roleList")
        this.goPage({routeName: 'login', params: {}})
      }
    },
    handleSelect(key, keyPath) {
      if (key === this.activeIndex) {
        this.$router.go(0)
      } else {
        switch (key) {
          case 'homePage':
          case 'uploadPage':
            this.goPage({routeName: key})
            break
          default:
            alert(keyPath + "建设中")
            break
        }
      }
    },
  },
  watch: {
    $route(to,from){
      if(to.name === 'homePage') {
        this.activeIndex = ''
      } else {
        this.activeIndex = to.name.split("_")[0]
      }
    }
  }
}
</script>

<style scoped>


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


.bg {
  /*图片地址 不重复 水平位置居中 垂直位置居中*/
  /*background: url("/public/img/homePage.png") no-repeat center center;*/
  height: 100%;
  width: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}

.headerPic {

}
.titleMenu2{
  display: none;
}
@media (max-width: 900px) {
  .titleMenu {
    display: none;
  }
  .titleMenu2{
    display: block;
  }
}
@media (max-width: 1000px) {
  .children_page {
    width: 100%;
  }
}
@media (min-width: 1000px) {
  .children_page {
    width: 70%;
  }
}
</style>
