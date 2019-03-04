<template>
  <div class="editBox" v-loading="this.$store.state.loading">
    <el-card class="box-card" :body-style="{ width: '100%', display: 'flex',flexWrap: 'wrap', padding: '0 10px 15px', boxSizing: 'border-box' }">
      <div class="inpBox">
        <p>席位号：</p>
        <p>
          <el-autocomplete
            class="inline-input"
            v-model="seatDone"
            placeholder="请输入席位号">
          </el-autocomplete>
        </p>
      </div>
      <div class="inpBox">
        <p>商家名称：</p>
        <p>
          <el-autocomplete
            class="inline-input"
            v-model="businessDone"
            placeholder="请输入商家名称">
          </el-autocomplete>
        </p>
      </div>
      <div class="inpBox">
        <p>商家席位电话：</p>
        <p><el-input type="number" v-model="seatMobile" placeholder="请输入商家席位电话"></el-input></p>
      </div>
      <div class="inpBox">
        <p>小票编号：</p>
        <p><el-input v-model="receiptNo" placeholder="填写时，每个小票间请用“逗号”隔开"></el-input></p>
      </div>
      <div class="inpBox">
        <p>工程师/销售员姓名 ：</p>
        <p><el-input v-model="salerName" placeholder="请输入姓名"></el-input></p>
      </div>
      <div class="inpBox">
        <p>销售员电话号码：</p>
        <p><el-input type="number" v-model="salerMobile" placeholder="请输入电话号码"></el-input></p>
      </div>
      <div class="inpBox">
        <p>NO.编号：</p>
        <p><el-input v-model="orderid" placeholder="请输入NO.编号(必填)"></el-input></p>
      </div>
      <div class="inpBox">
        <p>开单日期：</p>
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
    <!--维修-->
    <div class="fixedBox">
      <h2>维修</h2>
      <el-table
        border
        :data="repairTableData"
        style="width: 100%">
        <el-table-column
          label="维修项目"
          width="150">
          <template slot-scope="scope">
            <el-cascader
              :options="scope.row.reapirProject"
              v-model="scope.row.rtid"
            >
            </el-cascader>
          </template>
        </el-table-column>
        <el-table-column
          label="品牌"
          width="150">
          <template slot-scope="scope">
            <el-cascader
              :options="scope.row.brandProject"
              v-model="scope.row.btid"
            >
            </el-cascader>
          </template>
        </el-table-column>
        <el-table-column
          label="型号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.modelNum" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="故障描述"
          width="150">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.description" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          width="80">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.num" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="维修方式">
          <template slot-scope="scope">
            <el-input v-model="scope.row.detailMethod" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="金额">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.moneyNum" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="保修期"
          width="150">
          <template slot-scope="scope">
            <el-input style="width: 40%" type="number" v-model="scope.row.defects" placeholder=""></el-input>
            <el-select style="width: 56%" v-model="scope.row.defectsunit" placeholder="单位">
              <el-option
                v-for="item in scope.row.unit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="保换期"
          width="150">
          <template slot-scope="scope">
            <el-input style="width: 40%" type="number" v-model="scope.row.exchange" placeholder=""></el-input>
            <el-select style="width: 56%" v-model="scope.row.exchangeunit" placeholder="单位">
              <el-option
                v-for="item in scope.row.unit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="remarks">
        <div class="remarksInpBox">备注：<el-input class="remarksInp" v-model="repairremark" placeholder="请输入备注信息"></el-input></div>
        <div>维修小计：<span class="money">¥{{ repairMoney }}</span></div>
      </div>
    </div>
    <!--销售-->
    <div class="salesBox">
      <h2>销售</h2>
      <el-table
        :data="sellTableData"
        border>
        <el-table-column
          label="销售品类">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sellKinds" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="品牌"
          width="150">
          <template slot-scope="scope">
            <el-cascader
              :options="scope.row.brandProject"
              v-model="scope.row.btid">
            </el-cascader>
          </template>
        </el-table-column>
        <el-table-column
          label="型号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.modelNum" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="产品序列号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.serialNum" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          width="80">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.num" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="置换物品">
          <template slot-scope="scope">
            <el-input v-model="scope.row.exchangeGoods" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="金额">
          <template slot-scope="scope">
            <el-input type="number"  v-model="scope.row.moneyNum" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="保修期"
          width="150">
          <template slot-scope="scope">
            <el-input style="width: 40%" type="number" v-model="scope.row.defects" placeholder=""></el-input>
            <el-select style="width: 56%" v-model="scope.row.defectsunit" placeholder="单位">
              <el-option
                v-for="item in scope.row.unit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="保换期"
          width="150">
          <template slot-scope="scope">
            <el-input style="width: 40%" type="number" v-model="scope.row.exchange" placeholder=""></el-input>
            <el-select style="width: 56%" v-model="scope.row.exchangeunit" placeholder="单位">
              <el-option
                v-for="item in scope.row.unit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="remarks">
        <div class="remarksInpBox">备注：<el-input class="remarksInp" v-model="sellremark" placeholder="请输入备注信息"></el-input></div>
        <div>销售小计：<span class="money">¥{{sellMoney}}</span></div>
      </div>
    </div>
    <!--支付方式，满意度-->
    <el-card :body-style="{ width: '100%',flexWrap: 'wrap', padding: '0' }">
      <div class="customer">
        <div>
          <p>顾客姓名：</p>
          <p><el-input v-model="clientName" placeholder="请输入顾客姓名"></el-input></p>
        </div>
        <div>
          <p>顾客联系方式：</p>
          <p><el-input type="number" v-model="clientNumber" placeholder="请输入顾客手机号码"></el-input></p>
        </div>
      </div>
      <!--内容-->
      <div class="radioWappper">
        <div>
          <p>请选择支付方式：</p>
          <div>
            <span>
              <el-checkbox-group v-model="pay">
                <el-checkbox v-for="item in payOptions" :key="item.pid" :label="item.pid">{{item.payName}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </div>
        </div>
        <div>
          <p>维修<b> / </b>销售满意度调查：</p>
          <p>1.您对本次维修工程师或者销售人员的服务态度（热情、亲切、耐心）</p>
          <div>
            <el-radio-group v-model="question1">
              <el-radio v-for="item in evaluate" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
          <p>2.您对本次维修或销售的服务质量（速度、专业度、问题解决）</p>
          <div>
            <el-radio-group v-model="question2">
              <el-radio v-for="item in evaluate" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
          <p>3.您对本次维修或销售商的服务环境评价</p>
          <div>
            <el-radio-group v-model="question3">
              <el-radio v-for="item in evaluate" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
          <p>4.您对本次维修的价格评价</p>
          <div>
            <el-radio-group v-model="question4">
              <el-radio v-for="item in assess" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
          <p>5.您对本次维修的总体印象</p>
          <div>
            <el-radio-group v-model="question5">
              <el-radio v-for="item in evaluate" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="collect">
        <div>
          维修小计：<span class="money">¥{{ repairMoney }}</span>
        </div>
        <div>
          销售小计：<span class="money">¥{{ sellMoney }}</span>
        </div>
        <div>
          总计金额：<span class="money">¥{{ allMoney }}</span>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
  import api from '../../api/api'
  export default {
    name: "defaultS",
    data(){
      return {
        seat: [], //原始席位号列表
        business: [], //原始商家列表
        baseArr1: [],  //基础数据席位号列表
        baseArr2: [],  //基础数据商家列表
        allMoney: 0,   //总金额
        /*******************分割线***********************/
        seatDone: '',  //已填席位号
        businessDone: '', //已填商家名称
        seatMobile: '', //已填商家席位电话
        receiptNo: '', //已填小票编号
        salerName: '',//已填销售员姓名
        salerMobile: '',//已填销售员电话
        orderid: '',//已填维修单号
        orderDate: '',//已选开单时间
        /*******************分割线***********************/
        repairTableData: [], //处理维修列表数据
        reapirProject: [], //维修项目
        brandProject: [],  //品牌
        repairremark: '',//维修备注
        repairMoney: 0,  //维修小计
        /*******************分割线***********************/
        sellTableData: [], //处理销售列表
        sellremark: '',  //销售备注
        sellMoney: 0,    //销售小计
        /*******************分割线***********************/
        clientName: '',  //顾客姓名
        clientNumber: '',//顾客手机号
        payOptions: [],  //支付方式列表
        pay: [],         //已选支付方式
        evaluate: [{value: 1, label: '很差'},{value: 2, label: '差'},{value: 3, label: '普通'},{value: 4, label: '好'},{value: 5, label: '很好'}],    //评价1
        assess: [{value: 1, label: '低'},{value: 2, label: '偏低'},{value: 3, label: '适中'},{value: 4, label: '偏高'},{value: 5, label: '高'}],      //评价2
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: ''
      }
    },
    created() {
      this.defaultmsg();
    },
    beforeRouteUpdate (to, from, next) {//导航守卫组件复用
      next();
      this.defaultmsg();
    },
    methods:{
      defaultmsg() {
        api.repairMsg({
          success: res =>{
            res.data.data.repair.forEach(item => {
              item['value'] = item.rid;
              item['num'] = item.rtid;
              item['label'] = item.repairName;
            })
            res.data.data.repair_type.forEach(item => {
              item['value'] = item.rtid;
              item['label'] = item.repairTypeName;
            })
            res.data.data.brand.forEach(item => {
              item['value'] = item.bid;
              item['num'] = item.btid;
              item['label'] = item.brandName;
            })
            res.data.data.brand_type.forEach(item => {
              item['value'] = item.btid;
              item['label'] = item.brandTypeName;
            })
            //处理成二级联动所需数据格式
            this.reapirProject = this.filtration(res.data.data.repair_type, res.data.data.repair);
            this.brandProject = this.filtration(res.data.data.brand_type, res.data.data.brand);
            this.formItemDetail();
          }
        })
      },
      filtration(father,children) { // 处理二级联动数据方法
        father.forEach(fatheritem => {
          let arr = [];
          children.forEach(childrenitem => {
            if(fatheritem.value == childrenitem.num) {
              arr.push(JSON.parse(JSON.stringify(childrenitem)));
              fatheritem.children = arr;
            }
          })
        })
        return father;
      },
      formItemDetail() {
        api.formItemDetail({
          query:{
            roid: this.$route.params.roid
          },
          success: res =>{
            //console.log(res);
            this.orderid = res.data.data.orderid;  //必填
            this.seatDone = res.data.data.seatid;
            this.businessDone = res.data.data.businessName;
            this.seatMobile = res.data.data.seatMobile;
            this.receiptNo = res.data.data.receiptNo;
            this.salerName = res.data.data.salerName;
            this.salerMobile = res.data.data.salerMobile;
            this.clientName = res.data.data.buyerName;
            this.clientNumber = res.data.data.buyerMobile;
            this.orderDate = res.data.data.orderDate;
            this.repairremark = res.data.data.repairRemark;
            this.sellremark = res.data.data.saleRemark;
            this.question1 = res.data.data.question1;
            this.question2 = res.data.data.question2;
            this.question3 = res.data.data.question3;
            this.question4 = res.data.data.question4;
            this.question5 = res.data.data.question5;
            this.payOptions = [];
            this.pay = [];
            res.data.data.order_pay.forEach(item => {
              let obj = {};
              obj.pid = item.pid;
              obj.payName = item.payName;
              this.payOptions.push(JSON.parse(JSON.stringify(obj)));
              this.pay.push(JSON.parse(JSON.stringify(item.pid)));
            });
            res.data.data.order_repair.forEach(item => {
              let obj = {};
              let arr = [];
              let arr1 = [];
              arr[0] = item.rtid;
              arr[1] = item.rid;
              obj.rtid = arr;
              arr1[0] = item.btid;
              arr1[1] = item.bid;
              obj.btid = arr1;
              obj.reapirProject =  this.reapirProject;
              obj.brandProject = this.brandProject;
              obj.modelNum = item.model;
              obj.description = item.description;
              obj.num = item.number;
              obj.detailMethod = item.detail;
              obj.moneyNum = item.money;
              obj.defects = item.guarantee_value;
              obj.defectsunit = item.guarantee_bit;
              obj.exchange = item.preservation_value;
              obj.exchangeunit = item.preservation_bit;
              this.repairTableData.push(JSON.parse(JSON.stringify(obj)));
              this.repairMoney += Number(item.money);
            });
            res.data.data.order_sale.forEach(item => {
              let obj = {};
              let arr = [];
              arr[0] = item.btid;
              arr[1] = item.bid;
              obj.btid = arr;
              obj.brandProject = this.brandProject;
              obj.sellKinds = item.saleType;
              obj.modelNum = item.model;
              obj.serialNum = item.description;
              obj.num = item.number;
              obj.exchangeGoods = item.detail;
              obj.moneyNum = item.money;
              obj.defects = item.guarantee_value;
              obj.defectsunit = item.guarantee_bit;
              obj.exchange = item.preservation_value;
              obj.exchangeunit = item.preservation_bit;
              this.sellTableData.push(JSON.parse(JSON.stringify(obj)));
              this.sellMoney += Number(item.money);
            })
            this.allMoney = this.sellMoney + this.repairMoney;
          }
        })
      }
    }

  }
</script>

<style scoped>
  .editBox {
    margin: 5px 15px;
    width: calc(100% - 30px);
    color: #666;
  }
  .box-card {
    text-align: left;
  }
  .inpBox {
    width: 50%;
    padding: 15px 15px 0;
    box-sizing: border-box;
  }
  .inpBox>p {
    line-height: 25px;
  }
  .times,.inline-input {
    width: 100%;
  }
  .fixedBox>h2,.salesBox>h2 {
    font-size: 22px;
    line-height: 55px;
    text-align: left;
  }
  .salesBox {
    margin-bottom: 30px;
  }
  .remarks {
    background-color: #fff;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .remarksInpBox {
    width: 62%;
  }
  .remarksInp {
    width: 90%;
  }
  .money {
    color: #ff5e00;
    font-weight: 700;
  }
  .addOne {
    color: #409EFF;
    cursor: pointer;
  }
  .customer {
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #ececec;
    box-sizing: border-box;
    text-align: left;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  .customer>div {
    width: 48%;
  }
  .customer>div>p {
    line-height: 25px;
  }
  .radioWappper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 20px;
    font-size: 16px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #ececec;
  }
  .radioWappper>div {
    width: 48%;
  }
  .radioWappper>div>p {
    line-height: 36px;
  }
  .collect {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    font-weight: 700;
    line-height: 80px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .collect>div {
    margin-right: 30px;
  }
  .btnSub {
    margin: 30px auto;
    text-align: center;
    width: 100%;
    font-size: 16px;
  }
</style>
