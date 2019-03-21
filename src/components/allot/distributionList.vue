<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="seatid"
        label="席位编号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="businessName"
        label="商家名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createAdmin"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="receiveDate"
        width="150"
        label="领取时间">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="minOrderid"
        label="开始编号">
      </el-table-column>
      <el-table-column
        prop="maxOrderid"
        label="结束编号">
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
  import api from '@/api/api'
    export default {
        name: "distributionListS",
      data() {
          return {
            tableData: [],
            page: 1,
            pageCount: 0
          }
      },
      created() {
        this.baseData(this.page);
      },
      methods: {
        baseData(page) { //基础数据
          api.allotMsgList({
            query: {
              page: page
            },
            success: res => {
              this.pageCount = res.data.data.count;
              this.tableData = res.data.data.list;
            }
          })
        },
        handleCurrentChange(val) {//分页
          this.page = val;
        }
      },
      watch:{
        page(val) {//监听分页
          this.baseData(val);
        }
      }
    }
</script>

<style scoped>
  .pages{
    padding: 15px 0;
  }
</style>
