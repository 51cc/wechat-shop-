// pages/mynewyuyue/mynewyuyue.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy: []
  },
  jumptoyuyueorderdetail:function(e){
    console.log(e);

    wx.navigateTo({
      url: '../mynewyuyuedetail/mynewyuyuedetail?oId='+e.currentTarget.id,
    })

  },
  pingjia:function(e){
    console.log(e);
    
    wx.navigateTo({
      url: '../yyaddcomment/yyaddcomment?sId=' + e.currentTarget.id + '&oId=' + e.currentTarget.dataset.oid,
    })
  },
  quxaio:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });

    util.requestUrl(getApp().globalData.newBaseUrl + 'updateOneAppoint',
      {
        'id': e.currentTarget.id
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {
          that.requestData();
        }


      });
  },
  deleteOrder:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });

    util.requestUrl(getApp().globalData.newBaseUrl + 'delOneAppoint',
      {
        'id': e.currentTarget.id
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          that.requestData();
        }


      });
  },
  payNow:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatAppoint', { 'orderNo': e.currentTarget.id}, function (res) {

      wx.hideLoading();

      if (res.data.status == '200') {

        var dic = JSON.parse(res.data.wechat);

        wx.requestPayment({
          timeStamp: dic.timeStamp,
          nonceStr: dic.nonceStr,
          package: dic.package,
          signType: 'MD5',
          paySign: dic.paySign,
          'success': function (res) {
            console.log(res);
            that.requestData();


          },
          'fail': function (res) {
            console.log(res);
          }
        });


      }
    });

  },
  requestData:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });

    util.requestUrl(getApp().globalData.newBaseUrl + 'selectAllAppoints',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId,
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

            that.setData({dataAy:res.data.data});
        }


      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.requestData();
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
    this.requestData();

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