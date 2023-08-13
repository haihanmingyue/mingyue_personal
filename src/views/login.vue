<template>
  <div style=" position: absolute; width: 99%;height: 99%; " >
    <div
        style=" position: absolute; width: 100%;height: 100%; "
        class="bg"></div>
    <div
        style=" position: absolute; width: 100%;height: 100%; background-color: #000000;opacity: 0.2;
        min-width: 2220px;min-height: 1260px;"
        ></div>

    <transition name="el-fade-in-linear">
    <div
        class="transition-box" v-if="!registerFlag"
        style="position:absolute;
        min-width: 200px;
        width: 50%;
        max-width: 300px;
        top:45%;left:50%;transform:translate(-50%,-50%);">

      <el-card  style="max-width: 100%; height: 400px; border: #f9fafc;">
        <el-form ref="form" :model="form"  style="padding-top: 30px;float:left;width: 100%" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username">
              <template slot="prepend" style="font-size: 20px"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password">
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-checkbox style="float: left;cursor: pointer; color: #409EFF" v-model="rememberMe"> 记住我 </el-checkbox>
            <a style="float: right;cursor: pointer; color: #409EFF" @click="register"> 注册 </a>
          </el-form-item>
        </el-form>
        <el-footer>
          <div
              style="position:absolute;
              top:90%;left:50%;transform:translate(-50%,-50%);">
           <el-button
               :disabled="loginicon === 'el-icon-loading'"
               :circle="true"
               title="登录"
               @click="login('form')">
             <i :class="loginicon"></i>
           </el-button>
          </div>
        </el-footer>
      </el-card>
    </div>
    </transition>
    <transition name="el-fade-in-linear">
    <div
        class="transition-box" v-if="registerFlag"
        style="position:absolute;
        min-width: 200px;
        width: 50%;
        max-width: 300px;
        top:45%;left:50%;transform:translate(-50%,-50%);">
      <el-card style="max-width: 100%; height: 400px; border: #f9fafc;">
        <el-form ref="regForm" :model="regForm"  style="padding-top: 30px;float:left;width: 100%" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="regForm.userName">
              <template slot="prepend" style="font-size: 20px"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input type="password" v-model="regForm.passWord">
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="regForm.email" placeholder="邮箱">
              <template slot="prepend" style="font-size: 20px"><i class="el-icon-message"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="regForm.code" placeholder="验证码" style="width: 70%">
              <template slot="prepend" style="font-size: 20px"><i class="el-icon-message"></i></template>
            </el-input>
            <el-button :disabled="sendDis" style="width: 30%; text-align: left" @click="sendEmail(regForm.email)">{{regForm.time}}</el-button>
          </el-form-item>
          <el-form-item >
            <a style="float: right;cursor: pointer; color: #409EFF" @click="goLogin"> 返回 </a>
          </el-form-item>
        </el-form>
        <el-footer>
          <div style="position:absolute; left: 50%;
              top:90%;transform:translate(-50%,-50%);">
            <el-button title="注册" @click="registerAccount('regForm')" circle type="primary" size="small"
                       :icon="regicon"
                       :disabled="regicon === 'el-icon-loading'"
                       style="font-size:20px"></el-button>
          </div>
        </el-footer>
      </el-card>
    </div>
    </transition>
  </div>
</template>

<script>
import views from "@/utils/views";
import {encryptedData} from "@/utils/jsencrypt.ts"
import {login} from "@/api/index.js"
import { setToken,setLocalToken } from "@/utils/auth";
import Element from "element-ui";
import {checkEmail} from "@/utils/email";
import store from "@/store";
import { resetRouter } from "@/router";
import { registerAccount,getCode } from "@/api";
export default {
  name: "login",
  mixins: [views],
  component: {
  },
  data(){
    return {
      sendDis: false,
      count: 0,
      rememberMe: 0,
      regicon: 'el-icon-check',
      loginicon: 'el-icon-arrow-right',
      registerFlag: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'change' },
          // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]

      },
      form: {},
      regForm: {
      },
      timer: null
    }
  },
  created() {
    this.$nextTick(() =>{
      this.$set(this.regForm, 'time', '获取')
      this.timer = null;
    })
  },
  mounted() {
    const res = localStorage.getItem("user");
    if (res) {
      this.form = JSON.parse(res);
      this.rememberMe = !this.rememberMe;
    }
  },
  methods:{
    async sendEmail(email) {
      if (!email) {
        Element.Message.error("请输入邮箱")
        return;
      }
      if (!checkEmail(email)) {
        Element.Message.error("请输入正确的邮箱")
        return;
      }
      const res = await getCode(email);
      if (res && res.code === 200) {
        this.sendDis = true;
        this.regForm.time = 60;
        this.timer = setInterval(() =>{
          this.regForm.time -= 1;
          if (this.regForm.time === 0) {
            this.regForm.time = '获取'
            this.sendDis = false;
            if (this.timer != null) {
              clearInterval(this.timer)
              this.timer = null;
            }
          }
        },1000)
      }
    },
    goLogin() {
      this.registerFlag = false;
    },
    register() {
      this.registerFlag = true;
    },
    registerAccount(formName) {
      this.regicon = 'el-icon-loading';
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = Object.assign({},this.regForm)
          obj.passWord = encryptedData(obj.passWord);
          const loginRes = await registerAccount(obj);
          if (loginRes && loginRes.code && loginRes.code === 200) {
            this.registerFlag = false;
          }
        } else {
          console.log('error submit!!');
        }
      });
      this.regicon = 'el-icon-check';
      return false;
    },
    login(formName) {
      this.loginicon = 'el-icon-loading';
      try {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const obj = Object.assign({},this.form)
            obj.password = encryptedData(obj.password);
            const loginRes = await login(obj);
            if (loginRes && loginRes.code && loginRes.code === 200) {
              setToken(loginRes.data.sessionId)
              setLocalToken(loginRes.data.sessionId)
              if (this.rememberMe) {
                localStorage.setItem("user",JSON.stringify(this.form))
              }
              store.commit('SET_ROLE_LIST',loginRes.data.userMenuList);
              await resetRouter();
              this.goPage({routeName: "homePage"})
            }
          } else {
            console.log('error submit!!');
          }
        });
      }catch (e) {
        console.log(e)
      }
      this.loginicon = 'el-icon-arrow-right';
      return false;
    },
  },
  watch: {
    'rememberMe': {
      handler(newVal, oldVal) {
        // if(newVal && this.count === 0) {
        //   MessageBox.confirm(
        //       "您记住了账号密码，请确保客户端为私人使用",
        //       "系统提示",
        //       {
        //         confirmButtonText: "知道了",
        //         cancelButtonText: "取消",
        //         type: "warning"
        //       }
        //   ).then(() => {
        //     this.count++;
        //   }).catch(() =>{
        //     this.count++;
        //   });
        // }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.bg {
  /*图片地址 不重复 水平位置居中 垂直位置居中*/
  background: url("/public/img/bg.jpg") no-repeat center center;
  height: 100%;
  width: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size:cover;
  position:absolute;
  left:0;
  top:0;
}
</style>
