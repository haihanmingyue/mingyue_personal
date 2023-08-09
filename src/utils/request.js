import axios from "axios";
import qs from "qs";
import Config from "@/config";
import store from "@/store";
import router from "@/router"

import { MessageBox, Notification } from "element-ui";
import {removeLocalToken, removeToken} from "@/utils/auth";

const request = axios.create({
  baseURL:  Config.baseUrl,
  timeout: Config.timeout,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "client-type": 1
  },
  transformRequest: (data, headers) => {
    switch (headers["Content-Type"]) {
      case "application/x-www-form-urlencoded":
        return qs.stringify(data);
      case "multipart/form-data":
        return data;
      case "application/json":
        return JSON.stringify(data);
    }
  }
});

request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    const { data, status, headers, request, config } = response;
    const contentType = headers["content-type"];
    let { code, msg } = data;

    if (status < 200 || status > 300) {
      Notification.error({
        title: msg
      });
    } else {
      const res = contentType.match(/excel|image|octet/);
      if (res) {
        return data;
      }

      code = +code;
      switch (code) {
        case 200:
          if (msg !== "查询成功" && msg !== '登录成功' && msg !== 'noTips' && msg !== "0" && msg !== '') {
            if (config.url.indexOf("commonAttach") === -1) {
              Notification.success({
                title: msg
              });
            }
          }

          if (contentType.indexOf("json") !== -1) {
            return data;
          } else {
            return request.responseURL;
          }

        case 5:
          if (data.val) {
            Notification.success({
              title: data.val
            });
          }
          break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 6:
        case 7:
        case 500:
          Notification.error({
            title: msg
          });
          // return Promise.reject(new Error(msg));
        default:
          return data;
      }
    }
  },
  error => {
    let status = 0;
    try {
      status = error.response.status;
    } catch (error) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        Notification.error({
          title: "网络请求超时",
          duration: 2500
        });
        return Promise.reject(error);
      }

      if (error.toString().indexOf("Error: Network Error") !== -1) {
        Notification.error({
          title: "网络请求错误",
          duration: 2500
        });
        return Promise.reject(error);
      }
    }

    if (status === 401) {
      MessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        removeToken();
        removeLocalToken()
        router.push("/login")
      }).catch(() =>{

      });
    }
    else if (status === 500) {
      Notification.error({
        title: error
      });
    }
    else {
      return Promise.reject(error);
    }
    // 没有返回结果 !window.navigator.online 断网处理 跳转到断网页面
  }
);

export default request;
