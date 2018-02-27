// team-list.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

    wx.showLoading({
      title: '加载中',
    })


    var that = this;
    var code = wx.getStorageSync('code');
    var url = wx.getStorageSync('url');
    var param = {
      'isTeam':'1',
      'code': getApp().globalData.subCode//code
    };
    util.requestUrl(getApp().globalData.newBaseUrl + 'getDyProducts', param, function (res) {
      wx.hideLoading();
      
      console.log(res.data);
      if (res.data.flag) {
        that.setData({
          list: res.data.products
        });
      }
    });
  },

  //查看团购详情
  lookTeamDetail:function(e){
    wx.navigateTo({
      url: '../team-detail/team-detail?id=' + e.currentTarget.id
    });
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