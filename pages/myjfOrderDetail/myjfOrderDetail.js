// pages/myjfOrderDetail/myjfOrderDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maincolor:'#ffffff',
    mDic:{},
    dataAy:['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id);

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
        // that.setData({ rows: res.data.myList });
      });


    util.requestUrl(getApp().globalData.newBaseUrl + 'getOrderDetail',
      { 
        'code': getApp().globalData.subCode,
        'id':options.id,
        'userId': wx.getStorageSync('userInfo').usersId

      },
      function (res) {
        console.log(res);
        that.setData({ mDic: res.data.order });
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