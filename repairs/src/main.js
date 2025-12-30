import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;  
Vue.prototype.$axios = axios;



// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("admin_token");
    const studentToken = localStorage.getItem("student_token");

    // 管理端接口
   if (adminToken) {
      config.headers.token = adminToken; // 优先用管理员 token
    } else if (studentToken) {
      config.headers.token = studentToken;
    }

    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
