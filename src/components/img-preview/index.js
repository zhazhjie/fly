/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import ImgPreview from './img-preview.vue';
import {getInstance} from "../util";

let instance = getInstance(ImgPreview);
Vue.prototype.imgPreview = function (data) {
  instance.init(data);
  return instance;
};

export default ImgPreview;
