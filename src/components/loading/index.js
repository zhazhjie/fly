/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import Loading from './loading-1.vue';

let LoadingConstructor = Vue.extend(Loading);
let instance = new LoadingConstructor();
instance.$mount();
document.body.appendChild(instance.$el);
Vue.prototype.showLoading = function () {
  instance.showFlag = true;
};
Vue.prototype.hideLoading = function () {
  instance.showFlag = false;
};
