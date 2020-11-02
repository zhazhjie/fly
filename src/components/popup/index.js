/**
 * @author: zzj
 * @date: 2019-07-23 11:54:59
 * @version: 1.0
 */

import Vue from 'vue';
import Popup from './popup.vue';
import {getInstance} from "../util";

function destroy(instance) {
  instance.showFlag = false;
  setTimeout(_ => {
    document.body.removeChild(instance.$el);
    instance = null;
  }, 250);
}

function formatProp(type, defaultValue) {
  return {
    type: type,
    default: defaultValue
  }
}

function toString(value) {
  return Object.prototype.toString.call(value);
}

Vue.prototype.$confirm = function (data) {
  let options = {props: {}};
  let loading = false;
  if (toString(data) === "[object Object]") {
    for (let key in data) {
      let value = data[key];
      if (key === "loading") {
        loading = value
      } else {
        options.props[key] = formatProp(value.__proto__.constructor, value);
      }
    }
  } else if (toString(data) === "[object String]") {
    options.props.content = formatProp(String, data);
  } else {
    throw new Error("options must be a string or object.");
  }
  return new Promise((resolve, reject) => {
    let instance = getInstance(Popup, options);
    instance.$on("submit", function () {
      if (loading) {
        this.loading = true;
        let hideLoading = () => {
          this.loading = false;
        };
        let done = () => {
          this.loading = false;
          destroy(this);
        };
        resolve({hideLoading, done});
      } else {
        resolve();
        destroy(instance);
      }
    });
    instance.$on("update:showFlag", function () {
      destroy(instance);
    });
    instance.showFlag = true;
  });
};

export default Popup;
