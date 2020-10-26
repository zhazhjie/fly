/**
 *
 * @author zzhijie
 * @date 2020-10-23
 */
import Vue from "vue";

export function getInstance(component){
  let Constructor = Vue.extend(component);
  let instance = new Constructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
  return instance;
}
