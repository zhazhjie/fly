/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-05 10:31:38
 * @version: 1.0
 */

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import {getStore} from 'js-utils'
import errorCode from './errorCode'

const API_ROOT = process.env.VUE_APP_API_ROOT;

axios.defaults.timeout = 30000;
axios.defaults.baseURL = API_ROOT;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// request拦截
axios.interceptors.request.use(config => {
  // if (!config.url.endsWith("/auth/form")) {
  //   config.headers['Authorization'] = "bearer " + (getStore('TAKEOUT_TOKEN', 'local') || "");
  // }
  return config;
}, error => {
  return Promise.reject(error);
});
// response拦截
axios.interceptors.response.use(res => {
  let code = res.data.code;
  switch (code) {
    case 0:
      return res.data;
    default:
      Vue.prototype.$msg.warning(res.data.message);
      return Promise.reject(res.data);

  }
}, error => {
  let {response = {}} = error;
  let {status, data = {}, code} = response;
  switch (status) {
    case 400:
      Vue.prototype.$msg.warning(data.message);
      return Promise.reject(data);
    case 401:
      store.commit("logout");
      return Promise.reject(error);
    default:
      Vue.prototype.$msg.error(data.message || errorCode[code] || errorCode['default']);
      return Promise.reject(error);
  }
});

export default axios
