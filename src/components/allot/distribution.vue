<template>
  <div v-loading="this.$store.state.loading">
    <el-card class="box-card" :body-style="{ width: '100%', display: 'flex',flexWrap: 'wrap', padding: '0 10px 15px', boxSizing: 'border-box' }">
      <div class="inpBoxItme">
        <h3 class="wran">当前单号已发放至：<span>{{lastOrderid}}</span></h3>
      </div>
      <div class="inpBoxItme">
        <p class="colors">*单据前缀*：</p>
        <p><el-input v-model="prefix" placeholder="请输入单据前缀"></el-input></p>
      </div>
      <div class="inpBox">
        <p class="colors">*起始编号*：</p>
        <p><el-input type="number" v-model="stNumber" placeholder="请输入起始编号"></el-input></p>
      </div>
      <div class="inpBox">
        <p class="colors">*结束编号*：</p>
        <p><el-input type="number" v-model="endNumber" placeholder="请输入结束编号"></el-input></p>
      </div>
      <div class="inpBox">
        <p class="colors">*席位号*：</p>
        <p>
          <el-autocomplete
            class="inline-input"
            v-model="seatDone"
            :fetch-suggestions="querySearch1"
            placeholder="请输入席位号">
          </el-autocomplete>
        </p>
      </div>
      <div class="inpBox">
        <p class="colors">*商家名称*：</p>
        <p>
          <el-autocomplete
            class="inline-input"
            v-model="businessDone"
            :fetch-suggestions="querySearch2"
            placeholder="请输入商家名称">
          </el-autocomplete>
        </p>
      </div>
      <div class="inpBox">
        <p>领取日期：</p>
        <p><el-date-picker
          class="times"
          v-model="orderDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker></p>
      </div>
    </el-card>
    <div class="btnSub">
      <el-button @click="submitBtn" :style="{height: '43px',fontSize: '16px', letterSpacing: '4px'}" size="medium" type="success">提交</el-button>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
    export default {
        name: "distributionS",
      data() {
          return {
            lastOrderid: '', //当前发至单号
            seat: [], //原始席位号列表
            business: [], //原始商家列表
            baseArr1: [],  //基础数据席位号列表
            baseArrWran1: [],  //席位号提示列表
            baseArr2: [],  //基础数据商家列表
            baseArrWran2: [],  //商家提示列表
            /*******************分割线***********************/
            prefix: '',    //前缀
            seatDone: '',  //已填席位号
            businessDone: '', //已填商家名称
            orderDate: '',//已选领取时间
            stNumber: '', //起始编号
            endNumber: '',//起始结束
          }
      },
      created() {
        this.repairMsg();
        this.orderDate = this.defaultDate();
      },
      methods:{
        defaultDate() { //默认时间
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
        },
        repairMsg() { //请求表单数据
          api.allotMsg({
            success: res => {
              this.lastOrderid = res.data.data.lastOrderid;
              this.seat = res.data.data.seat;
              this.business  = res.data.data.business;
              this.baseArr1 = this.loadAll(this.seat);
              this.baseArrWran1 = JSON.parse(JSON.stringify(this.baseArr1));
              this.baseArr2 = this.loadAll(this.business);
              this.baseArrWran2 = JSON.parse(JSON.stringify(this.baseArr2));
            }
          })
        },
        querySearch1(queryString, cb) { //席位号输入建议
          // 调用 callback 返回建议列表的数据
          cb(this.baseArrWran1);
        },
        querySearch2(queryString, cb) { //商家名称输入建议
          // 调用 callback 返回建议列表的数据
          cb(this.baseArrWran2);
        },
        loadAll(data) { //输入建议数据处理
          let arr = [];
          let obj = {};
          data.forEach(item => {
            obj.value = item;
            arr.push(JSON.parse(JSON.stringify(obj)));//深拷贝存起
          })
          return arr;
        },
        submitBtn() { //提交
          try {
            let query = {};
            if(this.prefix == ''){throw '前缀不可为空！！！';}
            query.prefix = this.prefix;
            if(this.stNumber == ''){throw '起始编号不可为空！！！';}
            query.min = this.stNumber;
            if(this.endNumber == ''){throw '结束编号不可为空！！！';}
            query.max = this.endNumber;
            if(this.seatDone == ''){throw '席位编号不可为空！！！';}
            query.seatid = this.seatDone;
            if(this.businessDone == ''){throw '商家名称不可为空！！！';}
            query.businessName = this.businessDone;
            if(this.orderDate == ''){throw '领取日期不可为空！！！';}
            query.receiveDate = this.orderDate;
            this.billSave(query);
          }catch (e) {
            this.$message({
              message: e,
              type: 'error'
            });
          }
        },
        billSave(query) {
          api.allotMsgSave({
            query: query,
            success: res => {
              if(res.data.code == 201) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/distributionList' });
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            }
          })
        }
      },
      watch: {
        seatDone(val) {
          this.baseArrWran1 = this.baseArr1.filter(item => { //监听席位号输入
            return item.value.indexOf(val.toUpperCase()) >= 0;
          })
        },
        businessDone(val) {
          this.baseArrWran2 = this.baseArr2.filter(item => { //监听商家名称输入
            return item.value.indexOf(val) >= 0;
          })
        },
      }
    }
</script>

<style scoped>
  .box-card {
    text-align: left;
  }
  .wran {
    font-size: 16px;
    color: #333;
  }
  .wran>span {
    color: orangered;
  }
  .inpBox {
    width: 50%;
    padding: 15px 15px 0;
    box-sizing: border-box;
  }
  .inpBox>p {
    line-height: 25px;
  }
  .inpBoxItme {
    width: 80%;
    padding: 15px 15px 0;
    box-sizing: border-box;
  }
  .times,.inline-input {
    width: 100%;
  }
  .fixedBox>h2,.salesBox>h2 {
    font-size: 22px;
    line-height: 55px;
    text-align: left;
  }
  .btnSub {
    margin: 30px auto;
    text-align: center;
    width: 100%;
    font-size: 16px;
  }
  .colors {
    color: #f10125;
  }
</style>
