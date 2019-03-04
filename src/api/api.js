import axios from 'axios'
const baseurl = '/gp';
//请求数据
let request = (params,baseurl,url) => {
  axios({
    method: 'post',
    baseURL:baseurl,
    url: url,
    headers: {'Content-Type': 'application/json'},
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
      // console.log(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}
//获取token
let requsetToken = (params,baseurl,url) =>{
  axios({
    method: 'post',
    baseURL:baseurl,
    url: url,
    auth:params.loginParams,
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
      // console.log(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}
const Token = params => {//获取token
  requsetToken(params,baseurl,'/repair/token/getToken')
}
const repairMsg = params => { //表单基础信息
  request(params,baseurl,'/repair/forms/create')
}
const repairSave = params => { //表单提交
  request(params,baseurl,'/repair/forms/save')
}
const formList = params => { //表单列表
  request(params,baseurl,'/repair/forms/index')
}
const formItemEdit = params => { //表单编辑
  request(params,baseurl,'/repair/forms/edit')
}
const formItemDetail = params => { //表单详情
  request(params,baseurl,'/repair/forms/read')
}
const NOstatus = params => { //NO编号是否重复
  request(params,baseurl,'/repair/forms/checkNumber')
}
const seatSelect = params => { //席位号联动
  request(params,baseurl,'/repair/forms/snapRead')
}
const formItemUpdate = params => { //表单编辑更新
  request(params,baseurl,'/repair/forms/update')
}
const projectList = params => { //维修项目和品牌
  request(params,baseurl,'/repair/forms/re')
}
const projectAlter = params => { //维修项目和品牌修改
  request(params,baseurl,'/repair/forms/up')
}
const projectDelete = params => { //维修项目和品牌删除
  request(params,baseurl,'/repair/forms/de')
}
const projectAddone = params => { //维修项目和品牌增加
  request(params,baseurl,'/repair/forms/cr')
}
export default{
  Token,
  repairMsg,
  repairSave,
  formList,
  formItemEdit,
  formItemDetail,
  formItemUpdate,
  NOstatus,
  seatSelect,
  projectList,
  projectAlter,
  projectDelete,
  projectAddone
}
