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
      children:[
        {
          path: '',
          meta: {
            title: '首页'
          },
          component: () => import('./views/homePage'),
        },
        {
          path: '/button',
          meta: {
            title: '按钮'
          },
          component: () => import('./views/doc/button/button'),
        },
      ]
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
