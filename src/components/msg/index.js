/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import Msg from './msg.vue';
import {getInstance} from "../util";

let instance = getInstance(Msg);
Vue.prototype.showMsg = function (data) {
  instance.showMsg(data);
};
Vue.prototype.$msg = {
  info(text) {
    instance.showMsg({text: text, type: 0});
  },
  success(text) {
    instance.showMsg({text: text, type: 1});
  },
  warning(text) {
    instance.showMsg({text: text, type: 2});
  },
  error(text) {
    instance.showMsg({text: text, type: 3});
  },
  waiting(text) {
    instance.showMsg({text: text, type: 4});
  }
};
