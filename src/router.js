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
          component: () => import('./views/doc/homePage'),
        },
        {
          path: '/button',
          meta: {
            title: '按钮'
          },
          component: () => import('./views/doc/button'),
        },
        {
          path: '/radio',
          meta: {
            title: '单选框'
          },
          component: () => import('./views/doc/radio'),
        },
        {
          path: '/checkbox',
          meta: {
            title: '多选框'
          },
          component: () => import('./views/doc/checkbox'),
        },
        {
          path: '/switch',
          meta: {
            title: '开关'
          },
          component: () => import('./views/doc/switch'),
        },
        {
          path: '/select',
          meta: {
            title: '下拉选择'
          },
          component: () => import('./views/doc/select'),
        },
        {
          path: '/input',
          meta: {
            title: '输入框'
          },
          component: () => import('./views/doc/input'),
        },
        {
          path: '/picker',
          meta: {
            title: '拾取器'
          },
          component: () => import('./views/doc/picker'),
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
