<template>
  <div id="top">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
      维修 / 销售系统录入系统
    </div>
    <ul class="menus">
      <li>
        <el-select v-model="value" @change="changeShop" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.lngshopid"
            :label="item.lngshopName"
            :value="item.lngshopid">
          </el-option>
        </el-select>
      </li>
      <li class="admin_logo">
        <p>
          <img src="../assets/logo.png" alt="">
        </p>
        <el-dropdown class="user_name">
          <span class="el-dropdown-link">
            {{this.$store.state.userName}}<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '../api/api.js'
  export default {
    name: "top",
    data() {
      return {
        activeIndex: '1',
        list: [
          {
            path:'/default',
            title: '导航',
          },
          {
            path: '/set',
            title: '设置',
          },
        ],
        options: [],
        value: ''
      }
    },
    created:function(){
      this.changeRoute(this.$route);
      this.baseData();
    },
    methods:{
      baseData() { //基础数据
        api.shopName({
          query: {
            username: this.$store.state.userName
          },
          success: res => {
            this.value = res.data.data.lngshopid;
            if(res.data.data.lngshopid != 0){
              let obj = {};
              obj.lngshopid = res.data.data.lngshopid;
              obj.lngshopName = res.data.data.lngshopName;
              this.options.push(obj);
            }else {
              this.options = res.data.data.shopList;
            }
          }
        })
      },
      changeRoute:function(Route){//改变路由
        const nowPath = Route.path;
        this.$store.commit('NAV_SHOW',nowPath);
      },
      logout:function(){//登出
        this.$store.commit('LOGOUT');
      },
      changeShop(val) {
        api.shopChange({
          query: {
            lngshopid: val
          },
          success: res => {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success',
              duration: 1000
            });
            this.$router.push('/');
          }
        })
      }
    },
    watch:{
      $route(newRoute,oldRoute){//监听路由改变
        this.changeRoute(newRoute);
      }
    }

  }
</script>

<style scoped>
  #top{
    width: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    height: 70px;
    line-height: 70px;
    background-color: #FFF;
    border-bottom: 1px solid #ececec;
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    top: 0;
    left: 0;
  }
  .logo{
    margin: 0 20px;
  }
  .logo>img{
    width: 50px;
    height: 50px;
  }
  .menus{
    list-style-type: none;
    overflow: hidden;
  }
  .menus>li{
    display: block;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .menus>.admin_logo{
    cursor: auto;
  }
  .admin_logo>p{
    height: 70px;
    margin: 0 10px;
    float: left;
  }
  .admin_logo>p>img{
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
  }
  .user_name{
    float: left;
    height: 50px;
    cursor: pointer;
  }
  .el-dropdown-link,.run{
    color: #333;
  }
  .run:hover,.router-link-exact-active{
    color: #e2e2e2;
  }
</style>
