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
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="searchBox">
      <div class="inps">
        编号查询：
        <el-input class="inpitem" v-model="orderid" placeholder="编号查询">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <div class="inps">
        席位查询：
        <el-input class="inpitem" v-model="seatid" placeholder="席位查询">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <div class="inps">
        商家名称：
        <el-input class="inpitem" v-model="businessName" placeholder="商家名称">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <div class="inps">
        开单日期：
        <el-date-picker
          class="inpitem"
          v-model="orderDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="inps">
        回访日期：
        <el-date-picker
          class="inpitem"
          v-model="createDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="inps">
        回访人：
        <el-input class="inpitem" v-model="createAdmin" placeholder="回访人">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <div class="inps">
        完成状态：
        <el-select class="inpitem" v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="inps">
        修改日期：
        <el-date-picker
          class="inpitem"
          v-model="updateDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="inps">
        其他说明：
        <el-input class="inpitem" v-model="explain" placeholder="请输入其他说明">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
    </div>
    <div class="btn">
      <el-button @click="searchSubmit" type="success">搜索</el-button>
      <el-button class="download" @click="file" type="success">导出表格</el-button>
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
        width="80"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    name: "visitScheduleS",
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
          value: 'createDate',
          label: '回访日期'
        },{
          value: 'createAdmin',
          label: '回访人'
        },{
          value: 'status',
          label: '完成状态'
        },{
          value: 'updateDate',
          label: '修改日期'
        },{
          value: 'explain',
          label: '其他说明'
        }],
        orderid: '', //维修单号
        seatid: '',  //席位编号
        businessName: '', //商家名称
        orderDate: '',    //开单日期
        createDate: '',   //回访日期
        createAdmin: '',  //回访人
        status: '',       //完成状态
        statusList: [{value: 0, label: '完成'},{value: 1, label: '拒接'},{value: 2, label: '拒访'},{value: 3, label: '回答中断'},{value: 4, label: '其他'}],
        updateDate: '',   //修改日期
        explain: ''       //其他说明
      }
    },
    created() {
      this.optionList = this.options;//最开始所有数据都显示
      this.defaultData(this.page);
    },
    methods:{
      defaultData(page) { //默认数据
        api.visitScheduleList({
          query:{
            page: page,
            orderid: this.orderid,
            seatid: this.seatid,
            businessName: this.businessName,
            orderDate: this.orderDate,
            createDate: this.createDate,
            createAdmin: this.createAdmin,
            status: this.status,
            updateDate: this.updateDate,
            explain: this.explain
          },
          success: res => {
            this.pageCount = res.data.data.pageCount;
            res.data.data.dataList.forEach(item => {
              if(item.status == 0){
                item.status = '完成';
              }else if(item.status == 1){
                item.status = '拒接';
              }else if(item.status == 2){
                item.status = '拒访';
              }else if(item.status == 3){
                item.status = '回答中断';
              }else if(item.status == 4){
                item.status = '其他';
              }
            })
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
      handleEdit(index,row) { //编辑
        this.$router.push({ name: 'returnVisit', params: {roid: row.roid}});
      },
      handleCurrentChange(val) { //分页
        this.page = val;
      },
      file(){ //导出列表
        api.downloadReturnFile({
          success:res=>{
            const isEXCLE = res.headers["content-type"] === ("application/vnd.ms-excel" || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            if(!isEXCLE){
              let reader = new FileReader();
              reader.onload = e => this.$message.error(JSON.parse(e.target.result).msg);
              reader.readAsText(res.data);
            }else {
              let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
              const fileName = `回访表格${Date.parse(new Date())}.xls`;
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
    width: 16%;
    margin-right: 5px;
  }
  .dateBox {
    width: 30%;
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    margin-right: 5px;
  }
  .dateWrapper {
    width: 47%;
  }
  .dateItem {
    width: 100%;
  }
  .pages{
    padding: 15px 0;
  }
  .searchBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .inps {
    width: 50%;
    text-align: left;
  }
  .inpitem {
    width: 80% !important;
    line-height: 55px;
  }
  .btn {
    margin-bottom: 15px;
  }
  .download {
    float: right;
  }
</style>
