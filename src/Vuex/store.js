import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
Vue.use(Vuex);
const state = {
  pathName: '/default',//导航显示部分
  loading: true,  //加载动画
  menu: false, //侧边栏的状态
  userName:'',//用户名
  token: '', //登录token
  isLogin: false, //登录状态
  cache: []  //缓存页面
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
})
