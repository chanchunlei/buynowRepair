<template>
  <div v-loading="this.$store.state.loading" class="handle">
    <div class="defaulthandle">
      <div>
        <span>回访日期：</span>
        <el-date-picker
          v-model="times"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div>
          <span>维修销售凭证单号：</span>
          <el-input class="inp" v-model="order.orderid" placeholder="请输入内容" disabled></el-input>
      </div>
      <div>
        <span>席位号：</span>
        <el-input class="inp" v-model="order.seatid" placeholder="请输入内容" disabled></el-input>
      </div>
      <div>
        <span>商家简称：</span>
        <el-input class="inp" v-model="order.businessName" placeholder="请输入内容" disabled></el-input>
      </div>
    </div>
    <h2 class="title">《好汇修》消费者电话回访问卷调查</h2>
    <div class="Returnvisit">
      <p class="colorfont">回访情况*：
        <el-radio-group v-model="status">
          <el-radio v-for="item in statusList" :label="item.value" :key="item.value">{{item.label}}
            <el-input
              v-if="item.type == 1"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="statusmark">
            </el-input>
          </el-radio>
        </el-radio-group>
      </p>
    </div>
    <div class="firstStage">
      <h3>尊敬的{{order.buyerName}}先生/女士：</h3>
      <p class="stageContent">
        您好！我是百脑汇《好汇修》的维修达人，您是否在<span class="colors">{{order.orderDate}}</span>在百脑汇《好汇修》购买/维修产品，现我司对您做售后满意度调查，请您在百忙之中抽出一点时间，谢谢！
      </p>
      <div class="ageSelf">
        <p>
          受访者性别：
          <el-radio-group v-model="sex">
            <el-radio v-for="item in sexdata" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </p>
        <p>
          是否本人购买/维修：
          <el-radio-group v-model="local">
            <el-radio v-for="item in localdata" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </p>
      </div>
    </div>
    <!--1-->
    <div class="radioBox">
      <h2>体验满意度：</h2>
      <div v-for="item in list" class="contentBox">
        <p>
          {{item.rorqid}}.{{item.name}}
        </p>
        <p v-if="item.qtype == 1">
          <el-radio-group v-model="item.itemid">
            <el-radio class="handlechange" v-for="child in item.answer" :key="child.roraid" :label="child.roraid">
              {{child.detail}}
              <el-input
                v-if="child.atype == 1"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="child.mark">
              </el-input>
            </el-radio>
          </el-radio-group>
        </p>
        <p v-if="item.qtype == 2">
          <el-checkbox-group v-model="item.itemid">
            <el-checkbox class="handlechange" v-for="child in item.answer" :key="child.roraid" :label="child.roraid">
              {{child.detail}}
              <el-input
                v-if="child.atype == 1"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="child.mark">
              </el-input>
            </el-checkbox>
          </el-checkbox-group>
        </p>
        <p v-if="item.qtype == 3">
          <el-input
            v-for="child in item.answer"
            :key="child.roraid"
            v-if="child.atype == 1"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="child.mark">
          </el-input>
        </p>
      </div>
    </div>
    <!--提交-->
    <div class="btnSub">
      <el-button @click="submitBtn" :style="{height: '43px',fontSize: '16px', letterSpacing: '4px'}" size="medium" type="success">提交</el-button>
    </div>
    <!--确定提交-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>还有问题未回答，确认提交吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEnter">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import api from '../../api/api'
    export default {
        name: "returnVisitS",
      data() {
          return {
            times: '', //回访日期，默认今天日期
            sex: '',  //已选性别
            sexdata: [{value: 1, label: '男'},{value: 2, label: '女'}],
            local: '', //已选是否是本人
            localdata: [{value: 1, label: '是'},{value: 2, label: '否'}],
            order: {}, //默认数据
            list:[],     //处理好原始数据
            rorid: '',
            isDetail: false,
            status: '', //回访进度
            statusmark: '',
            statusList:[
              {value: 0, label: '完成', type: 0},
              {value: 1, label: '拒接', type: 0},
              {value: 2, label: '拒访', type: 0},
              {value: 3, label: '回答中断', type: 0},
              {value: 4, label: '其他', type: 1},
            ],
            dialogVisible: false
          }
      },
      created(){
          this.baseData();
          this.times = this.defaultDate();
      },
      beforeRouteUpdate (to, from, next) {
        next();
        this.baseData();
        this.times = this.defaultDate();
      },
      methods: {
        defaultDate() { //默认日期
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
        detailDatas() { //查看回访单
          api.QuestionDetail({
            query: {
              roid: this.$route.params.roid
            },
            success: res =>{
              if(res.data.data.sub.length == 0){
                this.isDetail = false;
              }else{
                this.isDetail = true;
                this.status = res.data.data.status;
                this.statusmark = res.data.data.explain;
                this.rorid = res.data.data.rorid;
                this.times = res.data.data.orderDate;
                this.sex = res.data.data.sex;
                this.local = res.data.data.local;
                let sub = res.data.data.sub;
                this.list.forEach(father => {
                  if(father.itemid instanceof Array) {
                    sub.forEach(item => {
                      father.answer.forEach(child => {
                        if(item.roraid == child.roraid) {
                          father.itemid.push(item.roraid);
                          child.mark = item.remark;
                        }
                      })
                    })
                  }else {
                    sub.forEach(item => {
                      father.answer.forEach(child => {
                        if(item.roraid == child.roraid) {
                          father.itemid = item.roraid;
                          child.mark = item.remark;
                        }
                      })
                    })
                  }
                })
              }
            }
          })
        },
        baseData() {//原始数据
          api.Questionnaire({
            query: {
              roid: this.$route.params.roid
            },
            success: res => {
              this.order = res.data.data.order;
              let answer = res.data.data.answer;
              let list = res.data.data.question;
              list.forEach(father => {
                let arr = [];
                answer.forEach(child => {
                  child.mark = '';  //加一个字段
                  if(father.rorqid == child.rorqid){
                    arr.push(child);
                    father.answer = arr;
                  }
                })
                if(father.qtype == 1){
                  father.itemid = '';
                }else if(father.qtype == 2){
                  father.itemid = [];
                }
                if(father.qtype == 3){ //填写题默认选中
                  father.itemid = father.answer[0].roraid;
                }
              })
              this.list = JSON.parse(JSON.stringify(list));//深拷贝
              this.detailDatas();
            }
          })
        },
        submitBtn() { //提交
          try{
            if(this.status.length == 0){ throw '回访情况必选！！！'; }
            this.answerStatus();
          }catch (e) {
            this.$message({
              message: e,
              type: 'error'
            });
          }
        },
        answerStatus(){ //判断题目是否全部答完
          try{
            this.list.forEach(father => {
              if(!father.itemid){ throw '还有问题未选择！！！'}
            })
            this.handleEnter();
          }catch (e) {
            this.dialogVisible = true;
          }
        },
        handleEnter() { //确定提交
          let query = {};
          query.roid = this.$route.params.roid;
          query.orderDate = this.times;
          query.sex = this.sex;
          query.local = this.local;
          query.status = this.status;
          query.explain = this.statusmark;
          let arr = [];
          this.list.forEach(father => {
            if(father.itemid instanceof Array){
              father.itemid.forEach(item => {
                let obj = {};
                father.answer.forEach(child => {
                  if(item == child.roraid){
                    obj.roraid = child.roraid;
                    obj.remark = child.mark;
                    arr.push(obj);
                  }
                })
              })
            }else {
              let obj = {};
              father.answer.forEach(child => {
                if(father.itemid == child.roraid){
                  obj.roraid = child.roraid;
                  obj.remark = child.mark;
                  arr.push(obj);
                }
              })
            }
          })
          query.sub = JSON.parse(JSON.stringify(arr));
          query.rorid = this.rorid;
          if(this.isDetail) {
            this.editEnter(query)
          }else{
            this.entering(query);
          }
          this.dialogVisible = false;
        },
        entering(query) { //录入
          api.Questionentering({
            query: query,
            success: res => {
              if(res.data.code == 201){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/formList' });
              }
            }
          })
        },
        editEnter(query) { //编辑回访单
          api.QuestionEdit({
            query: query,
            success: res => {
              if(res.data.code == 201){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/formList' });
              }
            }
          })
        }
      }
    }
</script>

<style scoped>
  .handle {
    padding: 20px;
    box-sizing: border-box;
  }
  .defaulthandle{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .defaulthandle>div {
    width: 50%;
    text-align: left;
    margin-bottom: 10px;
  }
  .inp {
    width: 70%;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 45px;
  }
  .firstStage,.radioBox {
    font-size: 16px;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
    color: #333;
  }
  .stageContent {
    text-indent:2em
  }
  .ageSelf {
    display: flex;
    justify-content: space-around;
    line-height: 45px;
  }
  .radioBox {
    line-height: 35px;
  }
  .contentBox {
    color: #333;
  }
  .btnSub {
    margin: 30px auto;
    text-align: center;
    width: 100%;
    font-size: 16px;
  }
  .handlechange {
    margin-right: 90px;
    color: #999;
  }
  .colors {
    color: orange;
  }
  .colorfont {
    color: #f10125;
    font-size: 16px;
  }
  .Returnvisit {
    line-height: 100px ;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
  }
</style>
