// pages/mymaidandetail/mymaidandetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jMoney:0.0,
    mDic:{}
  },
  requestData: function (sId) {
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'getPayNoteById',
      {
        'id': sId,
        'code': getApp().globalData.subCode
      },
      function (res) {
        console.log(res);
        if (res.data.status == '200') {

          that.setData({ mDic: res.data.data });

          var jm = parseFloat(res.data.data.allPrice) - parseFloat(res.data.data.totalPrice);

          that.setData({ jMoney: jm.toFixed(2) });

        }
        else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData(options.oId);
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