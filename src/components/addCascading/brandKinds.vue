<template>
  <div v-loading="this.$store.state.loading">
    <h2 class="title">品牌分类：</h2>
    <div class="inpBox">
      <div class="inpItem" v-for="item in projectData" :key="item.btid">
        <el-input class="inp" disabled v-model="item.brandTypeName" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="projectChange(item)" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteItem(item)" circle></el-button>
      </div>
    </div>
    <div>
      <el-button size="medium" class="btnAdd" @click="addOne" type="success">新增</el-button>
    </div>
    <el-dialog title="编辑：" :visible.sync="dialogFormVisible">
      <el-input class="inp" v-model="input.brandTypeName" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensure">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增：" :visible.sync="dialogFormVisible2">
      <el-input class="inp" v-model="addone" placeholder="请输入维修分类"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="ensureAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认删除此分类？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureDelete">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api/api'
  export default {
    name: "brandKinds",
    data() {
      return {
        projectData: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogVisible: false,
        input: {},
        addone: ''
      }
    },
    created() {
      this.baseData();
    },
    methods:{
      baseData() { //基础数据
        api.projectList({
          query:{
            type: 'bt'
          },
          success: res => {
            this.projectData = res.data.data;
          }
        })
      },
      projectChange(item) { //点击编辑
        this.dialogFormVisible = true;
        this.input = item; //浅拷贝直接修改原始值
      },
      deleteItem(item) {  //点击删除
        this.dialogVisible = true;
        this.input = item;
      },
      ensure() { //确定修改
        this.dialogFormVisible = false;
        api.projectAlter({
          query: {
            id: this.input.btid,
            type: 'bt',
            name: this.input.brandTypeName
          },
          success: res => {
            if(res.data.code == 201) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }
        })
      },
      ensureDelete() { //确认删除
        this.dialogVisible = false;
        api.projectDelete({
          query: {
            id: this.input.btid,
            type: 'bt',
          },
          success: res => {
            if(res.data.code == 201) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.baseData();
            }else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }
        })
      },
      addOne() { //新增
        this.addone = '';
        this.dialogFormVisible2 = true;
      },
      ensureAdd() { //确定增加
        this.dialogFormVisible2 = false;
        api.projectAddone({
          query: {
            type: 'bt',
            name: this.addone
          },
          success: res => {
            if(res.data.code == 201) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.baseData();
            }else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 16px;
    font-weight: 700;
    padding-left: 20px;
    padding-top: 10px;
    line-height: 35px;
    text-align: left;
    color: #666;
  }
  .inpBox {
    padding: 20px 0;
    padding-top: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .inpItem {
    width: 30%;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .inp {
    width: 68%;
  }
  .btnAdd {
    letter-spacing: 3px;
    font-size: 16px;
  }
</style>
