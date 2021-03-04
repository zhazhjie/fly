/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-12-12 19:06:36
 * @version: 1.0
 */
import Vue from 'vue'
import router from '../router'
import {Formatter} from "js-utils/formatter";

Vue.prototype.routeTo = function (path, replace) {
  if (replace) {
    router.replace(path).catch(() => {});
  } else {
    router.push(path).catch(() => {});
  }
};

Vue.prototype.routeBack = function () {
  history.go(-1);
};

Vue.prototype.formatAmount = Formatter.amount;
Vue.prototype.formatPhone = Formatter.phone;
