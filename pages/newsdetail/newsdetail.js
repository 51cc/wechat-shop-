// newsdetail.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id);

    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'newsDetail', { 'CODE': getApp().globalData.subCode,
      'ID': options.id}, function (res) {
      console.log(res);
      that.setData({ title: res.data.dataList.title});
      that.setData({ time: res.data.dataList.createtime });

      WxParse.wxParse('article', 'html', res.data.dataList.detail, that, 5);
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