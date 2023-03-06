// index.js
// 获取应用实例
const app = getApp()
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

const db=wx.cloud.database()
var utildata = require('../../utils/util');
console.log(utildata);
var time = new Date();
console.log(utildata.formatTime(time));

import { $wuxForm } from '../../dist/index'

Page({
  data:{
    orderlist:[''],
    datetime: utildata.formatTime(time),
    entry:"",
    edit:""
  },
  addrequest:function () {
    let orderlist = this.data.orderlist
    orderlist.push('')
    this.setData({
      orderlist:orderlist
    })
  },
  minusrequest:function (e) {
    let index = e.currentTarget.dataset.index
    let orderlist = this.data.orderlist
    orderlist.splice(index,1)
    console.log(index,orderlist)
    this.setData({
      orderlist:orderlist
    })
  },
  inputRequest:function (e) {
    let index = e.currentTarget.dataset.index
    let orderlist = this.data.orderlist
    orderlist[index] = e.detail.value
    this.setData({
      orderlist:orderlist
    })
  },
  onLoad() {
    
  },
  addList: function(){
    var  lists = this.data.lists;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })  
  },
  delList: function () {
    var lists = this.data.lists;
    lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      lists: lists,
    })
  },   
  onChange(e) {
    const { form, changedValues, allValues } = e.detail
    console.log('onChange \n',allValues.applytime, allValues.applyname, this.data.orderlist)
  },
  onChange1(e) {
    this.data.entry=e.detail.value
  },
  onChange2(e) {
    this.data.edit=e.detail.value
  },
  onSubmit() {
    /**
     * 先验证密码，成功提交，否则跳出密码不对
     * 然后提交表单
    **/
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()
    if(this.data.entry==""){
      wx.showToast({
        title: '请选择预约条目',
        icon: 'error',
        duration: 2000//持续的时间
      })
      return
    }
    if(this.data.edit==""){
      wx.showToast({
        title: '是否需要编辑',
        icon: 'error',
        duration: 2000//持续的时间
      })
      return
    }
    console.log(value.checkcode)
    db.collection("passwd").where({
      password: value.checkcode
    }).get().then(res=>{
      console.log(res.data)
      if(res.data.length == 1){
        //进行添加
        db.collection("missions").add({
          data:{
            applyname: value.applyname,
            applytime: value.applytime,
            depart: value.depart,
            remark: value.remark,
            subject: value.subject,
            entry: this.data.entry,
            edit: this.data.edit,
            subname: "待接单",
            Tel: "",
            status: "待接单项目"
          }
        }).then(res=>{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000//持续的时间
          })
        })
      }else{
        //报错
        wx.showToast({
          title: '密码错误',
          icon: 'error',
          duration: 2000//持续的时间
        })
      }
    })
    console.log('Wux Form Submit \n', value)
  }
})

