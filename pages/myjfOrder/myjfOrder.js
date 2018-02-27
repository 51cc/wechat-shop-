// pages/myjfOrder/myjfOrder.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    wuliuCompany:'',
    wuliuNum:'',
    dataAy: []
  },
  lingqujiangpin:function(e){

    console.log(e);

    var sdic = this.data.dataAy[e.currentTarget.dataset.id];
    //订单ID
    sdic.preOrderId = sdic.id;
    //产品ID
    sdic.id = sdic.proid;
    

    console.log(sdic);

    wx.setStorageSync('choujiang', sdic);

    wx.navigateTo({
      url: '../submiteJiFenOrder/submiteJiFenOrder?stype=1',
    })

  },
  shanchu:function(e){
//删除
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'delIntegralOrder',
      {
        'id':e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        console.log(res);

        that.requestData();

      });
  },

  querenshouhuo:function(e){
//确认收货
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'receive',
      {
        'id': e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        console.log(res);

        that.requestData();

      });

  },
  hiddenmask:function(){
    this.setData({ show: true });

  },
  chakanwuliu:function(e){
//查看物流
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'getOrderDetail',
      {
        'id': e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);
        that.setData({show:false});
        that.setData({ wuliuCompany: res.data.order.sendCompany});
        that.setData({ wuliuNum: res.data.order.sendNum });

      });

  },
  jumptojifendetail:function(e){
      wx.navigateTo({
        url: '../myjfOrderDetail/myjfOrderDetail?id='+e.currentTarget.id,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.requestData();

  },
  requestData:function(){
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'integralOrderList',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        console.log(res);

        that.setData({ dataAy: res.data.orderList });

      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})