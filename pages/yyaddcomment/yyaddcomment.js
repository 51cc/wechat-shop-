// pages/yyaddcomment/yyaddcomment.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oId:'',
    maincolor:'',
    cId:'',
    content:''
  },
  submite:function(){
    if(this.data.content.length>0)
    {
      var paraDic = {
        'orderId':this.data.oId,
        'code': getApp().globalData.subCode,
        'serviceId':this.data.cId,
        'img': wx.getStorageSync('userInfo').icon,
        'nickname': wx.getStorageSync('userInfo').nickname,
        'assess': this.data.content
      }
      wx.showLoading({
        title: '加载中',
      })
      util.requestUrl(getApp().globalData.newBaseUrl + 'addAppointAssess',
        paraDic,
        function (res) {

          console.log(res);

          wx.hideLoading();

          if (res.data.status == '200') {

           wx.navigateBack({
             delta:1
           })

          }


        });
    }
    else
    {
      wx.showToast({
        title: '输入内容',
      });
    }
  },
  bindinput: function (e) {
    
      this.setData({ content: e.detail.value });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.sId);
    this.setData({cId:options.sId});
    this.setData({oId:options.oId });


    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {

        console.log(res);
        that.setData({ maincolor: res.data.color });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})