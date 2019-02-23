import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../views/login.vue'],resolve)
    },
    {
      path: '/',
      redirect: '/default'
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../views/index.vue'],resolve),
      meta: {
        title: '自述文件',
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
        {
          path: '/default',
          component: resolve => require(['../components/alone/default.vue'],resolve),
          meta: {
            title: '表单录入',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'default',
        },
        {
          path: '/formList',
          component: resolve => require(['../components/alone/formlist.vue'],resolve),
          meta: {
            title: '表单查看',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'formlist',
        },
        {
          path: '/formList/detail/:roid',
          component: resolve => require(['../components/alone/detail.vue'],resolve),
          meta: {
            title: '详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'detail',
        },
        {
          path: '/defaultedit/:roid',
          component: resolve => require(['../components/alone/default.vue'],resolve),
          meta: {
            title: '表单编辑',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'defaultEdit',
        },
      ]
    },
    {
      path: '/404',
      name: 'NotFound',
      component: resolve => require(['../views/404.vue'],resolve)
    },

    {
      path: '*',
      redirect: '/404'
    }
  ]
})
