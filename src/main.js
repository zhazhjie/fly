import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import flyUI from './components'
import './config'
import imgPreview from 'js-utils/imgPreview'
import flyConfig from './config/common'

Vue.config.productionTip = false;
Vue.use(flyUI, flyConfig);
Vue.use(imgPreview);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
