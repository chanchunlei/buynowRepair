<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tagsList: []
      }
    },
    methods: {
      isActive(path) {
        return path === this.$route.path;
      },
      // 关闭单个标签
      closeTags(index) {
        const delItem = this.tagsList.splice(index, 1)[0];
        //console.log(delItem);
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
        if (item) {
          delItem.path === this.$route.path && this.$router.push(item.path);
        }else{
          this.$router.push('/');
        }
      },
      // 关闭全部标签
      closeAll(){
        this.tagsList = [];
        this.$router.push('/');
      },
      // 关闭其他标签
      closeOther(){
        const curItem = this.tagsList.filter(item => {
          return item.path === this.$route.path;
        })
        this.tagsList = curItem;
      },
      // 设置标签
      setTags(route){
        const isExist = this.tagsList.some(item => {
          return item.path === route.path;
        })//判断路径是否已经存在,返回的是true或者false
        !isExist && this.tagsList.push({
          title: route.meta.title,
          path: route.path,
          name: route.name
        })
      },
      handleTags(command){
        command === 'other' ? this.closeOther() : this.closeAll();
      }
    },
    computed: {
      showTags() {
        return this.tagsList.length > 0;
      }
    },
    watch:{
      $route(newValue, oldValue){//监听路由改变
        this.setTags(newValue);
        if(newValue.name=='NoPower'){
          this.closeOther();
        }
        //console.log(newValue);
      },
      tagsList(val){
        let cache = [];
        val.forEach(item=>{
          cache.push(item.name);
        })
        this.$store.commit('TAGS_LIST',cache);
      }
    },
    created(){
      this.setTags(this.$route);
    }
  }
</script>

<style scoped>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
  }
  .tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }
  .tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
  }
  .active>.tags-li-title{
    color: #fff;
  }
  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }
  .tags-li .active .tags-li-title {
    color: #fff;
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }
</style>
