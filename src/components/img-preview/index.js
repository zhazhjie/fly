/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import ImgPreview from './img-preview.vue';

let ImgPreviewConstructor = Vue.extend(ImgPreview);
let instance = new ImgPreviewConstructor();
instance.$mount();
document.body.appendChild(instance.$el);
Vue.prototype.imgPreview = function (data) {
  instance.init(data);
};

export default ImgPreview;
