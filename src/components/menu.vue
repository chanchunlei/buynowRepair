<template>
  <div id="menus">
    <div @click="collapseChange" class="retract">
      <i class="el-icon-more"></i>
    </div>
    <!--默认导航-->
    <el-menu class="el-menu-vertical-demo" :collapse="this.$store.state.menu" v-if="showName=='default'? true:false">
      <!--2-->
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-huiyuan"></i>
          <span slot="title">表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="/default" active-class>表单录入</router-link></el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-2"><router-link to="/formList" active-class>表单查看</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "menus",
    data() {
      return{
        showName: 'default'
      }
    },
    methods:{
      collapseChange(){//伸缩menu
        this.$store.commit('MENU');
      },
    }
  }
</script>

<style scoped>
  #menus{
    height: calc(100% - 70px);
    position: absolute;
    top: 70px;
    left: 0;
    background-color: #e6e6e6;
  }
  .retract{
    background-color: #fff;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #e2e2e2;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #999;
  }
  .el-icon-menu{
    cursor: pointer;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    text-align: left;
    width: 250px;
  }
  .el-menu-vertical-demo a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .el-menu-vertical-demo a:hover{
    color: #4BA2FC;
  }
  .router-link-exact-active i{
    color: #4BA2FC;
  }
  .router-link-exact-active{
    color: #4BA2FC;
  }
</style>
