/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import Loading from './loading-1.vue';
import {getInstance} from "../util";

let instance = getInstance(Loading);
Vue.prototype.showLoading = function (text) {
  instance.text = text || "加载中...";
  instance.showFlag = true;
};
Vue.prototype.hideLoading = function () {
  instance.showFlag = false;
};
