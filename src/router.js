import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      meta: {
        title: '首页'
      },
      component: () => import('./views/index'),
    },
    {
      path: '/preview',
      meta: {
        title: '预览'
      },
      component: () => import('./views/preview'),
    },
    {
      path: '*',
      meta: {
        title: '404'
      },
      component: () => import('./views/404'),
    },
  ]
})
