// pages/mymaidanjilu/mymaidanjilu.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy:[]
  },
  jumptodetail:function(e){
    wx.navigateTo({
      url: '../mymaidandetail/mymaidandetail?oId='+e.currentTarget.id,
    })
  },
  requestData: function () {
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'getAllPayNote',
      {
        'userId': wx.getStorageSync('userInfo').usersId,
        'code': getApp().globalData.subCode
      },
      function (res) {
        console.log(res);
        if (res.data.status == '200') {

          that.setData({ dataAy: res.data.data });

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