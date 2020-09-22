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
          component: () => import('./views/doc/home-page'),
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
        {
          path: '/date-picker',
          meta: {
            title: '日期选择器'
          },
          component: () => import('./views/doc/date-picker'),
        },
        {
          path: '/area-picker',
          meta: {
            title: '地区选择器'
          },
          component: () => import('./views/doc/area-picker'),
        },
        {
          path: '/carousel',
          meta: {
            title: '轮播图'
          },
          component: () => import('./views/doc/carousel'),
        },
        {
          path: '/img-clip',
          meta: {
            title: '图片裁切'
          },
          component: () => import('./views/doc/img-clip'),
        },
        {
          path: '/loading',
          meta: {
            title: '加载'
          },
          component: () => import('./views/doc/loading'),
        },
        {
          path: '/msg',
          meta: {
            title: '消息提示'
          },
          component: () => import('./views/doc/msg'),
        },
        {
          path: '/popup',
          meta: {
            title: '弹出层'
          },
          component: () => import('./views/doc/popup'),
        },
        {
          path: '/dialog',
          meta: {
            title: '对话框'
          },
          component: () => import('./views/doc/dialog'),
        },
        {
          path: '/infinite-load',
          meta: {
            title: '无限加载'
          },
          component: () => import('./views/doc/infinite-load'),
        },
        {
          path: '/list',
          meta: {
            title: '列表'
          },
          component: () => import('./views/doc/list'),
        },
        {
          path: '/number',
          meta: {
            title: '加减'
          },
          component: () => import('./views/doc/number'),
        },
        {
          path: '/number-keyboard',
          meta: {
            title: '数字小键盘'
          },
          component: () => import('./views/doc/number-keyboard'),
        },
        {
          path: '/rate',
          meta: {
            title: '评分'
          },
          component: () => import('./views/doc/rate'),
        },
        {
          path: '/sort',
          meta: {
            title: '排序'
          },
          component: () => import('./views/doc/sort'),
        },
        {
          path: '/skeleton',
          meta: {
            title: '骨架'
          },
          component: () => import('./views/doc/skeleton'),
        },
        {
          path: '/pay-box',
          meta: {
            title: '支付选择框'
          },
          component: () => import('./views/doc/pay-box'),
        },
        {
          path: '/title',
          meta: {
            title: '标题'
          },
          component: () => import('./views/doc/title'),
        },
        {
          path: '/view',
          meta: {
            title: '页面'
          },
          component: () => import('./views/doc/view'),
        },
        {
          path: '/upload',
          meta: {
            title: '上传'
          },
          component: () => import('./views/doc/upload'),
        },
        {
          path: '/empty',
          meta: {
            title: '空'
          },
          component: () => import('./views/doc/empty'),
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
