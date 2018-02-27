// orderdetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dic:{},
    userDic:{},
    maincolor:'',
    dataAy: ['', '', '', '', '', '']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);
    var that = this;


    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
      });






    util.requestUrl(getApp().globalData.baseUrl + 'orderDetail', 
    { 'CODE': getApp().globalData.subCode, 
      'USER_ID': wx.getStorageSync('userInfo').usersId,
      'ID':options.id}, 
    function (res) {
      console.log(res);
      if(res.data.status=='200')
      {
        that.setData({dic:res.data.order});

        that.setData({ userDic: res.data.userAddress});
        that.setData({ dataAy: res.data.proList});
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