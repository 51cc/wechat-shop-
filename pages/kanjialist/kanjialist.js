// pages/kanjialist/kanjialist.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheight: 0.0,
    swidth: 0.0,
    dataAy: []
  },
  jumptodetail:function(e){
    console.log(e);

    wx.navigateTo({
      url: '../kanjiadetail/kanjiadetail?kId='+e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    this.requestData();

  },
  requestData:function(){

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.requestUrl(getApp().globalData.newBaseUrl + 'getBargainList',
     {'code': getApp().globalData.subCode}, function (res) {
      
      console.log(res);
      
      wx.hideLoading();

      if (res.data.status=='200') 
      {
        that.setData({ dataAy:res.data.bargainList});
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
  
  }
})