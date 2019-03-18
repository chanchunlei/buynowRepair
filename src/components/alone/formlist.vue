<template>
  <div v-loading="this.$store.state.loading">
    <!--导航-->
    <div class="handle-box">
      <div class="tagBoxSelect">
        <span class="titleSelected">展示字段：</span>
        <el-select class="tagSelect" @change="syllable" v-model="value" multiple placeholder="请选择要展示的字段">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="NumberSearch">
      编号查询：
      <el-input class="searchItem" v-model="orderid" placeholder="编号查询">
        <i class="el-icon-search el-input__icon" slot="suffix"></i>
      </el-input>
    </div>
    <div class="NumberSearch">
      席位查询：
      <el-input class="searchItem" v-model="seatid" placeholder="席位查询">
        <i class="el-icon-search el-input__icon" slot="suffix"></i>
      </el-input>
    </div>
    <div class="NumberSearch">
      手机号查询：
      <el-input class="searchItem" typeof="number" v-model="buyerMobile" placeholder="手机号查询">
        <i class="el-icon-search el-input__icon" slot="suffix"></i>
      </el-input>
    </div>
    <div class="dateBox">
      时间查询：
      <div class="dateWrapper">
        <el-date-picker
          class="dateItem"
          v-model="stime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      至
      <div class="dateWrapper">
        <el-date-picker
          class="dateItem"
          v-model="etime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>

    </div>
    <div class="btnS">
      <div class="btn">
        <el-button @click="searchSubmit" type="success">搜索</el-button>
      </div>
      <div class="btn">
        <el-button @click="file" type="success">导出列表</el-button>
      </div>
    </div>

    <!--表格-->
    <el-table class="box"
              :data="list"
              border
              style="width: 100%">
      <el-table-column
        prop="roid"
        fixed="left"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        v-for="item in optionList"
        width="150"
        :prop="item.value"
        :key="item.value"
        :label="item.label">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleRecord(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="success"
            @click="handleVisit(scope.$index, scope.row)">回访</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api';
    export default {
        name: "edit",
      data() {
          return{
            page: 1,  //当前页
            pageCount: 0, //总页数
            handleList: [], //列表数据
            list: [], //列表数据
            optionList: [], //选定
            value: [],//已选字段
            options: [{//默认显示字段
              value: 'orderid',
              label: 'NO.编号'
            }, {
              value: 'seatid',
              label: '席位号'
            }, {
              value: 'businessName',
              label: '商家名称'
            }, {
              value: 'orderDate',
              label: '开单日期'
            }, {
              value: 'salerName',
              label: '工程师/销售员'
            },{
              value: 'salerMobile',
              label: '销售员手机号'
            },{
              value: 'buyerName',
              label: '顾客姓名'
            },{
              value: 'buyerMobile',
              label: '顾客手机号'
            },{
              value: 'createAdmin',
              label: '录入人'
            },{
              value: 'createDate',
              label: '录入时间'
            },{
              value: 'updateAdmin',
              label: '更新人'
            },{
              value: 'updateDate',
              label: '更新时间'
            }],
            orderid: '', //维修单号
            seatid: '',  //席位编号
            stime: '',   //开始时间
            etime: '',    //结束时间
            buyerMobile: '' //手机号码
          }
      },
      created() {
          this.optionList = this.options;//最开始所有数据都显示
          this.defaultData(this.page);
      },
      methods:{
        defaultData(page) { //默认数据
          api.formList({
            query:{
              page: page,
              orderid: this.orderid,
              seatid: this.seatid,
              stime: this.stime,
              etime: this.etime,
              buyerMobile: this.buyerMobile
            },
            success: res => {
              this.pageCount = res.data.data.pageCount;
              this.handleList = res.data.data.dataList;
              this.list = res.data.data.dataList;
            }
          })
        },
        syllable(val) { //选择要显示的字段
          let selected = [];
          let optionsArr = [];
          this.handleList.forEach((child,index)=>{
            selected[index] = {};
            selected[index].roid = child.roid;
            for(let key in child){
              val.forEach(father=>{
                if(father == key){
                  selected[index][key] = child[key];
                }
              })
            }
          })
          val.forEach(father=>{
            this.options.forEach((item)=>{
              if(father == item.value){
                optionsArr.unshift(item);
              }
            })
          })
          this.list = selected;
          this.optionList = optionsArr;
        },
        searchSubmit() { //搜索
          this.defaultData(1);
        },
        handleRecord(index,row) { //详情
          this.$router.push({ name: 'detail', params: {roid: row.roid}});
        },
        handleEdit(index,row) { //编辑
          this.$router.push({ name: 'defaultEdit', params: {roid: row.roid}});
        },
        handleCurrentChange(val) { //分页
          this.page = val;
        },
        handleVisit(index,row) { //回访
          this.$router.push({ name: 'returnVisit', params: {roid: row.roid}});
        },
        file(){ //导出列表
          api.downloadFormFile({
            success:res=>{
              const isEXCLE = res.headers["content-type"] === ("application/vnd.ms-excel" || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
              if(!isEXCLE){
                let reader = new FileReader();
                reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
                reader.readAsText(res.data);
              }else {
                let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                const fileName = `维修表格${Date.parse(new Date())}.xls`;
                if ('download' in document.createElement('a')) { // 非IE下载
                  const elink = document.createElement('a');
                  elink.download = fileName;
                  elink.style.display = 'none';
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);
                } else { // IE10+下载
                  navigator.msSaveBlob(blob, fileName);
                }
              }
            }
          })
        }
      },
      watch:{
        page(val) {//监听分页
          this.defaultData(val);
        }
      }
    }
</script>

<style scoped>
  .handle-box {
    padding-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
  }
  .tagBoxSelect{
    width: 37%;
    padding-left: 20px;
    text-align: left;
  }
  .tagSelect{
    width: 80%;
  }
  .NumberSearch {
    width: 80%;
    text-align: left;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .searchItem {
    width: 80%;
  }
  .dateBox {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    margin-right: 5px;
    margin-bottom: 20px;
    padding-left: 20px;
  }
  .dateWrapper {
    width: 37% !important;
  }
  .dateItem {
    width: 100% !important;
  }
  .pages{
    padding: 15px 0;
  }
  .btn {
    margin-left: 80px;
  }
  .btnS {
    display: flex;
    justify-content: space-around;
    padding-left: 200px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
</style>
