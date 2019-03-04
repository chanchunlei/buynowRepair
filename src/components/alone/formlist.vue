<template>
  <div v-loading="this.$store.state.loading">
    <!--导航-->
    <!--<div class="handle-box">-->
      <!--<div class="tagBoxSelect">-->
        <!--<span class="titleSelected">展示字段：</span>-->
        <!--<el-select class="tagSelect" @change="syllable" v-model="value" multiple placeholder="请选择要展示的字段">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
          <!--&gt;-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="NumberSearch">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-input v-model="input" placeholder="编号查询">&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="el-icon-search el-input__icon" slot="suffix"></i>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="NumberSearch">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-input v-model="input" placeholder="席位查询">&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="el-icon-search el-input__icon" slot="suffix"></i>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="dateBox">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="dateWrapper">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
            <!--&lt;!&ndash;class="dateItem"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="value1"&ndash;&gt;-->
            <!--&lt;!&ndash;type="date"&ndash;&gt;-->
            <!--&lt;!&ndash;placeholder="选择日期">&ndash;&gt;-->
          <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
         <!--&lt;!&ndash;至&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="dateWrapper">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
            <!--&lt;!&ndash;class="dateItem"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="value1"&ndash;&gt;-->
            <!--&lt;!&ndash;type="date"&ndash;&gt;-->
            <!--&lt;!&ndash;placeholder="选择日期">&ndash;&gt;-->
          <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="success">搜索</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--表格-->
    <el-table class="box"
              :data="handleList"
              border
              style="width: 100%">
      <el-table-column
        prop="roid"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="NO.编号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="seatid"
        label="席位号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="businessName"
        label="商家名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="开单日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="salerName"
        label="工程师/销售员"
        width="80">
      </el-table-column>
      <el-table-column
        prop="salerMobile"
        label="销售员手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="buyerName"
        label="顾客姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="buyerMobile"
        label="顾客手机号"
        width="110">
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
          }
      },
      created() {
          this.defaultData(this.page);
      },
      methods:{

        defaultData(page) {
          api.formList({
            query:{
              page: page
            },
            success: res => {
              //console.log(res);
              this.pageCount = res.data.data.pageCount;
              this.handleList = res.data.data.dataList;
            }
          })
        },
        syllable() {

        },
        handleRecord(index,row) {
          this.$router.push({ name: 'detail', params: {roid: row.roid}});
        },
        handleEdit(index,row) {
          this.$router.push({ name: 'defaultEdit', params: {roid: row.roid}});
        },
        handleCurrentChange(val) { //分页
          this.page = val;
        }
      },
      watch:{
        page(val) {
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
</style>
