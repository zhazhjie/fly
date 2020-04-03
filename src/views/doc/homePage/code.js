/**
 * @author: zzj
 * @date: 2020-04-03 09:02:14
 * @version: 1.0
 */
export const install =
  `
  cnpm install git+http://git.tigoyun.com/zzhijie/fly-components.git
  `;
export const code =
  `
  import Vue from 'vue';
  import Fly from 'fly-components';
  import App from './App.vue';

  Vue.use(Fly);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
  `;
export const config =
  `
  Vue.use(Fly, {size: "mini"});
  `;
