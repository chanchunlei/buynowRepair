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
const formItemDetail = params => { //表单详情
  request(params,baseurl,'/repair/forms/read')
}
const formItemUpdate = params => { //表单编辑更新
  request(params,baseurl,'/repair/forms/update')
}
export default{
  Token,
  repairMsg,
  repairSave,
  formList,
  formItemDetail,
  formItemUpdate
}
