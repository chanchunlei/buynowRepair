// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './Vuex/store'  //使用vuex
import  ElementUI from 'element-ui' //引入elementUI
import 'element-ui/lib/theme-chalk/index.css'  //饿了么ui样式
import http from './api/http' //拦截器
Vue.use(ElementUI);
Vue.config.productionTip = false

//导航守卫
router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth){//判断该路由是否需要登录权限
      if(sessionStorage.getItem("isLogin")){//判断登录状态
        next();
      }else{
        next({
          path: '/login',
        })
      }
    }else{
      next();
    }
  }
)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    //console.log(sessionStorage.getItem("isLogin"));
    if(sessionStorage.getItem("isLogin")){//判断登录状态是否失效
      store.dispatch('login');//在组件中分发Action
    }
  }
}).$mount('#app');
