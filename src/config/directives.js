/**
 * @author: zzj
 * @date: 2020-03-12 10:32:33
 * @version: 1.0
 */
import Vue from 'vue'

const OSS_URL = process.env.VUE_APP_OSS_URL;
const defaultImg = require('../img/defaultImg.png');
const defaultAvatar = require('../img/avatar.png');

Vue.directive('loading', {
  bind: function (el, binding) {
    if (binding.value) Vue.prototype.showLoading();
  },
  update: function (el, binding) {
    if (binding.value) {
      Vue.prototype.showLoading();
    } else {
      Vue.prototype.hideLoading();
    }
  },
  unbind: function () {
    Vue.prototype.hideLoading();
  }
});
(function () {
  let winHeight = window.innerHeight;
  let elList = [];

  function handleResize() {
    let curHeight = window.innerHeight;
    let show = curHeight <= winHeight + 150 && curHeight >= winHeight - 150;
    elList.forEach(el => {
      el.style.display = show ? el.display : "none";
    });
  }

  Vue.directive('fixed', {
    bind: function (el, binding) {
      Vue.nextTick(() => {
        let {top} = el.getBoundingClientRect();
        if (top > (winHeight >> 1)) {
          el.display = binding.arg || "block";
          elList.push(el);
        }
      });
      addEventListener("resize", handleResize);
    },
    unbind: function (el) {
      let index = elList.indexOf(el);
      if (index > -1) elList.splice(index, 1);
    }
  });
})();

const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let el = entry.target;
      loadImg(el, el.src);
      intersectionObserver.unobserve(el);
    }
  });
});

function loadImg(el, initImg) {
  let src = el.dataset.src + el.dataset.suffix;
  let newImg = new Image();
  el.src = initImg;
  newImg.onload = function () {
    el.src = this.src;
  };
  newImg.src = src;
}

//图片模式mode详见：https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.1181.e3803168l0gWII
Vue.directive('src', {
  bind: function (el, binding) {
    let size = Object.keys(binding.modifiers);
    let {value, arg} = binding;
    let isImg = el.tagName === "IMG";
    let isFullPath = /^http/ig.test(value);
    let src = (isFullPath ? "" : OSS_URL) + value;
    el.dataset.src = src;
    if (isImg) {
      let isAvatar = arg === 'avatar';
      let suffix = (!isImg || !arg || isFullPath) ? "" : `?x-oss-process=image/resize,m_${(isAvatar ? "fill" : arg) || 'pad'},${size[0] || 'w_100'},${size[1] || 'h_100'}`;
      let initImg = isAvatar ? defaultAvatar : defaultImg;
      let lazy = el.getAttribute("lazy");
      let isLazy = lazy === "" || lazy === "true";
      el.dataset.suffix = suffix;
      if (isLazy) {
        el.src = initImg;
        intersectionObserver.observe(el);
      } else {
        loadImg(el, initImg);
      }
    } else {
      el.src = src;
    }
  },
  update: function (el, binding) {
    let {value, arg} = binding;
    let isFullPath = /^http/ig.test(value);
    let src = (isFullPath ? "" : OSS_URL) + value;
    if (el.dataset.src !== src) {
      el.dataset.src = src;
      let isImg = el.tagName === "IMG";
      if (isImg) {
        let initImg = arg === 'avatar' ? defaultAvatar : defaultImg;
        loadImg(el, initImg);
      } else {
        el.src = src;
      }
    }
  },
  unbind: function (el) {
    intersectionObserver.unobserve(el);
  }
});
