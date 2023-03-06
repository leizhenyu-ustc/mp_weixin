// pages/schedule/schedule.js

var utildata = require('../../utils/util');
console.log(utildata);
var time = new Date();
console.log(utildata.formatTime(time));
const db=wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        datetime: utildata.formatTime(time),
        weekdate: "",
        test:[1,2,3,4,5],
        order2take:[],
        order2do:[],
        order2check:[],
        today2do:[]
    },

    jumpDetails:function(e){
        var info=e.currentTarget.dataset.info;
        wx.navigateTo({
          url: "../details/details?info=" + info,
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var today=new Date();
        var currentDate=today.getDay();//获取存储当前日期
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        this.setData({
            weekdate:weekday[currentDate]
        })
        //获取数据
        db.collection("missions").where({
            status:"待接单项目"
        }).get().then(res=>{
            //不用this.setData而用=会造成数据更新不一致问题
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            this.setData({
                order2take:res.data
            })
        })
        db.collection("missions").where({
            status:"待处理项目"
        }).get().then(res=>{
            this.setData({
                order2do:res.data
            })
        })
        db.collection("missions").where({
            status:"已完成项目"
        }).get().then(res=>{
            this.setData({
                order2check:res.data
            })
        })
        db.collection("missions").where({
            applytime:this.data.datetime,
            status:db.command.in(["待接单项目","待处理项目"])
        }).get().then(res=>{
            this.setData({
                today2do:res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})