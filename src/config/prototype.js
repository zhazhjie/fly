/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-12-12 19:06:36
 * @version: 1.0
 */
import Vue from 'vue'
import router from '../router'
import {formatAmount, formatPhone, isEmpty} from "js-utils";

const getVal = (exp) => new Function("root", exp);

Vue.prototype.$val = function (key, root = this) {
  let lang = this.$i18n.locale;
  if (lang === 'zh') {
    return getVal("return root." + key)(root);
  } else {
    return getVal(`var val=root.${key}En;return val!==undefined?val:root.${key}`)(root);
  }
};
Vue.prototype.routeTo = function (path, replace) {
  if (replace) {
    router.replace(path)
  } else {
    router.push(path)
  }
};
Vue.prototype.routeBack = function () {
  window.history.length > 1
    ? router.go(-1)
    : router.replace('/')
};
Vue.prototype.formatAmount = formatAmount;
Vue.prototype.formatPhone = formatPhone;
Vue.prototype.isEmpty = isEmpty;
