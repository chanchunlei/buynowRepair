<template>
  <div class="editBox" v-loading="this.$store.state.loading">
    <el-card class="box-card" :body-style="{ width: '100%', display: 'flex',flexWrap: 'wrap', padding: '0 10px 15px', boxSizing: 'border-box' }">
      <div class="inpBox">
        <p>席位号：</p>
        <p>
          <el-autocomplete
          class="inline-input"
          v-model="seatDone"
          :fetch-suggestions="querySearch1"
          @select="baseSelect"
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
          :fetch-suggestions="querySearch2"
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
        <p><el-input @change="NOchange" v-model="orderid" placeholder="请输入NO.编号(必填)"></el-input></p>
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
            <el-input type="number" @change="footingRepair" v-model="scope.row.moneyNum" placeholder=""></el-input>
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
        <el-table-column
          label="操作"
          width="70">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleDeleteReapir(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="remarks">
        <div class="remarksInpBox">备注：<el-input class="remarksInp" v-model="repairremark" placeholder="请输入备注信息"></el-input></div>
        <div class="repairMoney">维修小计：<span class="money">¥{{ repairMoney }}</span></div>
        <div @click="addRepairListItem" class="addOne"><el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button> 新增</div>
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
            <el-input type="number" @change="footingSell" v-model="scope.row.moneyNum" placeholder=""></el-input>
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
        <el-table-column
          label="操作"
          width="70">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleDeleteSell(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="remarks">
        <div class="remarksInpBox">备注：<el-input class="remarksInp" v-model="sellremark" placeholder="请输入备注信息"></el-input></div>
        <div class="repairMoney">销售小计：<span class="money">¥{{sellMoney}}</span></div>
        <div @click="addSellListItem" class="addOne"><el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button> 新增</div>
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
    <div class="btnSub">
      <el-button @click="submitBtn" :style="{height: '43px',fontSize: '16px', letterSpacing: '4px'}" size="medium" type="success">提交</el-button>
    </div>
  </div>

</template>

<script>
  import api from '../../api/api'
    export default {
        name: "defaultS",
      data(){
          return {
            pickerOptions: {}, //设置原始日期
            seat: [], //原始席位号列表
            business: [], //原始商家列表
            baseArr1: [],  //基础数据席位号列表
            baseArrWran1: [],  //席位号提示列表
            baseArr2: [],  //基础数据商家列表
            baseArrWran2: [],  //商家提示列表
            allMoney: 0,   //总金额
/*******************分割线***********************/
            seatDone: '',  //已填席位号
            businessDone: '', //已填商家名称
            seatMobile: '', //已填商家席位电话
            receiptNo: '', //已填小票编号
            salerName: '',//已填销售员姓名
            salerMobile: '',//已填销售员电话
            orderid: '',//已填维修单号
            orderidStatus: false,//维修单号是否重复,true重复、false不重复
            orderDate: '',//已选开单时间
/*******************分割线***********************/
            repairTableData: [], //处理维修列表数据
            tableData1: {    //默认维修列表数据
              reapirProject: [], //维修项目
              brandProject: [],  //品牌
              rtid: [],          //已选维修项目
              btid: [],           //已选品牌
              modelNum: '',  //型号
              description: '',   //故障描述
              num: '',           //数量
              detailMethod: '',  //维修方式
              moneyNum: '',      //金额
              defects: '',     //保修期
              exchange: '',    //保换期
              defectsunit: '', //保修期已选单位
              exchangeunit: '',//保换期已选单位
              unit: [{value: 1, label: '天'},{value: 2, label: '周'},{value: 3, label: '月'},{value: 4, label: '年'}]
            },
            repairremark: '',//维修备注
            repairMoney: 0,  //维修小计
/*******************分割线***********************/
            sellTableData: [], //处理销售列表
            tableData2: {    //默认维修列表数据
              sellKinds: '', //销售品类
              brandProject: [],  //品牌
              btid: [],           //已选品牌
              modelNum: '',      //产品型号
              serialNum: '',     //产品序列号
              num: '',           //数量
              exchangeGoods: '', //置换物品
              moneyNum: '',      //金额
              defects: '',     //保修期
              exchange: '',    //保换期
              defectsunit: '', //保修期已选单位
              exchangeunit: '',//保换期已选单位
              unit: [{value: 1, label: '天'},{value: 2, label: '周'},{value: 3, label: '月'},{value: 4, label: '年'}]
            },
            sellremark: '',  //销售备注
            sellMoney: 0,    //销售小计
/*******************分割线***********************/
            clientName: '',  //顾客姓名
            clientNumber: '',//顾客手机号
            payOptions: [],  //支付方式列表
            pay: [],         //已选支付方式
            evaluate: [{value: 5, label: '很好'},{value: 4, label: '好'},{value: 3, label: '普通'},{value: 2, label: '差'},{value: 1, label: '很差'}],    //评价
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: ''
          }
      },
      methods:{
        defaultDate() {
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
        clearAll(){  //从编辑页面进来，重新定义原始数据
            this.seat = []; //原始席位号列表
            this.business = []; //原始商家列表
            this.baseArr1 = [];  //基础数据席位号列表
            this.baseArrWran1 = [];  //基础数据席位号提示列表
            this.baseArr2 = [];  //基础数据商家列表
            this.baseArrWran2 = [];  //基础数据商家提示列表
            this.allMoney = 0;  //总金额
            /*******************分割线***********************/
            this.seatDone = '';  //已填席位号
            this.businessDone = ''; //已填商家名称
            this.seatMobile = ''; //已填商家席位电话
            this.receiptNo = ''; //已填小票编号
            this.salerName = '';//已填销售员姓名
            this.salerMobile = '';//已填销售员电话
            this.orderid = '';//已填维修单号
            this.orderidStatus = false;//维修单号是否重复,true重复、false不重复
            this.orderDate = this.defaultDate();
            /*******************分割线***********************/
            this.repairTableData = []; //处理维修列表数据
            this.tableData1 = {    //默认维修列表数据
              reapirProject: [], //维修项目
              brandProject: [],  //品牌
              rtid: [],          //已选维修项目
              btid: [],           //已选品牌
              modelNum: '',  //型号
              description: '',   //故障描述
              num: '',           //数量
              detailMethod: '',  //维修方式
              moneyNum: '',      //金额
              defects: '',     //保修期
              exchange: '',    //保换期
              defectsunit: '', //保修期已选单位
              exchangeunit: '',//保换期已选单位
              unit: [{value: 1, label: '天'},{value: 2, label: '周'},{value: 3, label: '月'},{value: 4, label: '年'}]
          };
          this.repairremark = '';//维修备注
          this.repairMoney = 0;  //维修小计
          /*******************分割线***********************/
          this.sellTableData = []; //处理销售列表
          this.tableData2 = {    //默认维修列表数据
            sellKinds: '', //销售品类
            brandProject: [],  //品牌
            btid: [],           //已选品牌
            modelNum: '',      //产品型号
            serialNum: '',     //产品序列号
            num: '',           //数量
            exchangeGoods: '', //置换物品
            moneyNum: '',      //金额
            defects: '',     //保修期
            exchange: '',    //保换期
            defectsunit: '', //保修期已选单位
            exchangeunit: '',//保换期已选单位
            unit: [{value: 1, label: '天'},{value: 2, label: '周'},{value: 3, label: '月'},{value: 4, label: '年'}]
          };
          this.sellremark = '';  //销售备注
          this.sellMoney = 0;    //销售小计
          /*******************分割线***********************/
          this.clientName = '';  //顾客姓名
          this.clientNumber = '';//顾客手机号
          this.payOptions = [];  //支付方式列表
          this.pay = [];         //已选支付方式
          this.evaluate = [{value: 5, label: '很好'},{value: 4, label: '好'},{value: 3, label: '普通'},{value: 2, label: '差'},{value: 1, label: '很差'}];    //评价1
          this.question1 = '';
          this.question2 = '';
          this.question3 = '';
          this.question4 = '';
          this.question5 = '';
          this.repairMsg();
        },
        repairMsg() { //请求表单数据
          api.repairMsg({
            success: res =>{
              this.seat = res.data.data.seat;
              this.business  = res.data.data.business;
              this.baseArr1 = this.loadAll(this.seat);
              this.baseArrWran1 = JSON.parse(JSON.stringify(this.baseArr1));
              this.baseArr2 = this.loadAll(this.business);
              this.baseArrWran2 = JSON.parse(JSON.stringify(this.baseArr2));
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
              this.tableData1.reapirProject = this.filtration(res.data.data.repair_type, res.data.data.repair);
              this.tableData1.brandProject = this.filtration(res.data.data.brand_type, res.data.data.brand);
              this.tableData2.brandProject = this.filtration(res.data.data.brand_type, res.data.data.brand);
              this.repairTableData.push(JSON.parse(JSON.stringify(this.tableData1)));
              this.sellTableData.push(JSON.parse(JSON.stringify(this.tableData2)));
              this.payOptions = res.data.data.pay;//支付方式
              if(this.$route.params.roid) { //判断是否是编辑状态
                this.editData();
              }
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
        /********分割线**********/
        footingRepair() {  //维修小计
          this.repairMoney = 0;
          this.repairTableData.forEach(item => {
             this.repairMoney += Number(item.moneyNum);
          })
        },
        handleDeleteReapir(index, row) { //删除此条维修列表
          this.repairTableData.splice(index,1);
        },
        addRepairListItem() { //增加一条维修列表
          this.repairTableData.push(JSON.parse(JSON.stringify(this.tableData1)));
        },
        /********分割线**********/
        footingSell() { //销售小计
          this.sellMoney = 0;
          this.sellTableData.forEach(item => {
            this.sellMoney += Number(item.moneyNum);
          })
        },
        handleDeleteSell(index, row) { //删除此条销售列表
          this.sellTableData.splice(index,1);
        },
        addSellListItem() { //增加一条销售列表
          this.sellTableData.push(JSON.parse(JSON.stringify(this.tableData2)));
        },
        /********分割线**********/
        NOchange(val) {
          let roid = '';
          if(this.$route.params.roid){
            roid = this.$route.params.roid;
          }
          api.NOstatus({
            query: {
              roid: roid,
              orderid: val
            },
            success: res => {
              this.orderidStatus = res.data.data.status;
              if(res.data.data.status){
                this.$message({
                  message: `NO编号${res.data.msg}`,
                  type: 'warning'
                });
              }
            }
          })
        },
        /********分割线**********/
        editData() { //编辑
          api.formItemEdit({
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
              this.pay = [];
              res.data.data.order_pay.forEach(item => {
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
                obj.reapirProject =  this.tableData1.reapirProject;
                obj.brandProject = this.tableData1.brandProject;
                obj.modelNum = item.model;
                obj.description = item.description;
                obj.num = item.number;
                obj.detailMethod = item.detail;
                obj.moneyNum = item.money;
                obj.unit = this.tableData1.unit;
                obj.defects = item.guarantee_value;
                obj.defectsunit = Number(item.guarantee_bit);
                obj.exchange = item.preservation_value;
                obj.exchangeunit = Number(item.preservation_bit);
                this.repairTableData = [];
                this.repairTableData.push(JSON.parse(JSON.stringify(obj)));
                this.repairMoney += Number(item.money);
              });
              res.data.data.order_sale.forEach(item => {
                let obj = {};
                let arr = [];
                arr[0] = item.btid;
                arr[1] = item.bid;
                obj.btid = arr;
                obj.brandProject = this.tableData2.brandProject;
                obj.sellKinds = item.saleType;
                obj.modelNum = item.model;
                obj.serialNum = item.description;
                obj.num = item.number;
                obj.exchangeGoods = item.detail;
                obj.moneyNum = item.money;
                obj.unit = this.tableData2.unit;
                obj.defects = item.guarantee_value;
                obj.defectsunit = item.guarantee_bit;
                obj.exchange = item.preservation_value;
                obj.exchangeunit = item.preservation_bit;
                this.sellTableData = [];
                this.sellTableData.push(JSON.parse(JSON.stringify(obj)));
                this.sellMoney += Number(item.money);
              })
              this.allMoney = this.sellMoney + this.repairMoney;
            }
          })
        },
        /********分割线**********/
        submitBtn() { //提交表单
          //console.log(this.pay);
          try{
            let query = {};
            let order_repair = [];
            let order_sale = [];
            let order_pay = [];
            if(!this.orderid){ throw 'NO.编号必填！！！'; }
            if(this.orderidStatus){ throw 'NO.编号重复！！！'; }
            query.orderid = this.orderid;  //必填
            query.seatid = this.seatDone;
            query.businessName = this.businessDone;
            query.seatMobile = this.seatMobile;
            query.receiptNo = this.receiptNo;
            query.salerName = this.salerName;
            query.salerMobile = this.salerMobile;
            query.buyerName = this.clientName;
            query.buyerMobile = this.clientNumber;
            query.orderDate = this.orderDate;
            query.repairRemark = this.repairremark;
            query.saleRemark = this.sellremark;
            query.question1 = this.question1;
            query.question2 = this.question2;
            query.question3 = this.question3;
            query.question4 = this.question4;
            query.question5 = this.question5;
            //维修表数据
            this.repairTableData.forEach(item => {
              let obj = {};
              if(item.rtid.length != 0){
                obj.rtid = item.rtid[0];
                obj.rid = item.rtid[1];
              }else {
                obj.rtid = '';
                obj.rid = '';
              }
              if(item.btid.length != 0){
                obj.btid = item.btid[0];
                obj.bid = item.btid[1];
              }else {
                obj.btid = '';
                obj.bid = '';
              }
              obj.rtName = '';
              obj.model = item.modelNum;
              obj.description = item.description;
              obj.number = item.num;
              obj.detail = item.detailMethod;
              obj.money = item.moneyNum;
              obj.guarantee_value = item.defects;
              obj.guarantee_bit = item.defectsunit;
              obj.preservation_value = item.exchange;
              obj.preservation_bit = item.exchangeunit;
              obj.remark = '';
              order_repair.push(JSON.parse(JSON.stringify(obj)));
            })
            query.order_repair = order_repair;
            //销售表数据
            this.sellTableData.forEach(item => {
              let obj = {};
              obj.saleType = item.sellKinds;
              if(item.btid.length != 0){
                obj.btid = item.btid[0];
                obj.bid = item.btid[1];
              }else {
                obj.btid = '';
                obj.bid = '';
              }
              obj.bName = '';
              obj.model = item.modelNum;
              obj.description = item.serialNum;
              obj.number = item.num;
              obj.detail = item.exchangeGoods;
              obj.money = item.moneyNum;
              obj.guarantee_value = item.defects;
              obj.guarantee_bit = item.defectsunit;
              obj.preservation_value = item.exchange;
              obj.preservation_bit = item.exchangeunit;
              obj.remark = '';
              order_sale.push(JSON.parse(JSON.stringify(obj)));
            })
            query.order_sale = order_sale;
            //支付方式
            this.pay.forEach(item => {
              let obj = {};
              obj.pid = item;
              obj.paySum = '';
              order_pay.push(JSON.parse(JSON.stringify(obj)));
            })
            query.order_pay = order_pay;
            if(this.$route.params.roid) {
              query.roid = this.$route.params.roid;
              this.listUpdate(query);
            }else{
              this.listSubmit(query);
            }
          }catch (e) {
            this.$message({
              message: e,
              type: 'error'
            });
          }
        },
        listSubmit(query) { //提交接口
          api.repairSave({
            query: query,
            success: res => {
              if(res.data.code == 201) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/formList' });
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            }
          })
        },
        listUpdate(query) { //更新数据
          api.formItemUpdate({
            query: query,
            success: res => {
              if(res.data.code == 201) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/formList' });
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            }
          })
        },
        baseSelect(val) { //席位号联动效果
          api.seatSelect({
            query: {
              seatid: val.value
            },
            success: res => {
              console.log(res);
              if(res.data.data) {
                this.businessDone = res.data.data.businessName;
                this.salerMobile = res.data.data.salerMobile;
                this.salerName = res.data.data.salerName;
                this.seatMobile = res.data.data.seatMobile;
              }else {
                this.businessDone = '';
                this.salerMobile = '';
                this.salerName = '';
                this.seatMobile = '';
              }
            }
          });
        }
      },
      beforeRouteEnter  (to, from, next) {//导航守卫进入此路由触发
        next(vm => {
          vm.clearAll();
        });
      },
      beforeRouteUpdate (to, from, next) {
        next();
        this.clearAll();
      },
      watch:{
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
        repairTableData(val) {  //维修表数据变化
          this.repairMoney = 0;
          val.forEach(item => {
            this.repairMoney += Number(item.moneyNum);
          })
        },
        sellTableData(val) {   //销售表数据变化
          this.sellMoney = 0;
          val.forEach(item => {
            this.sellMoney += Number(item.moneyNum);
          })
        },
        repairMoney(val) {    //总额跟随变化
          this.allMoney = val + this.sellMoney;
        },
        sellMoney(val) {      //总额跟随变化
          this.allMoney = val + this.repairMoney;
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
  @media screen and (max-width: 915px) {
    .remarks {
      background-color: #fff;
      text-align: left;
      line-height: 60px;
      font-size: 16px;
      padding: 0 20px;
      box-sizing: border-box;
      display: block;
      overflow: hidden;
    }
    .remarksInpBox {
      width: 100%;

    }
    .remarksInp {
      width: 90%;
    }
    .repairMoney {
      width: 50%;
      float: left;
    }
    .addOne {
      width: 50%;
      float: right;
    }
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
