// myyuyue.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy:[],
    hasContent: false,
    item: { 'icon': '../../Asset/q_yuyue.png', 'title': '暂无预约' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.showLoading({
      title: '加载中',
    })

    var that = this;

    util.requestUrl(getApp().globalData.baseUrl + 'appoList',
      {
        'user_id': wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
      }, function (res) {
        console.log(res);
        wx.hideLoading();
        
        if (res.data.status == '200') {

          that.setData({dataAy:res.data.dataList});

        }
        if (that.data.dataAy.length > 0) {
          that.setData({ hasContent: true });
        }else
        {
          that.setData({ hasContent: false });          
        }

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