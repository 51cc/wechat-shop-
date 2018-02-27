// pages/myjfchoujiangdetail/myjfchoujiangdetail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    explain:'',
    mDic:{}
  },
  duhuaNow:function(){
    wx.setStorageSync('choujiang', this.data.mDic);
    wx.navigateTo({
      url: '../submiteJiFenOrder/submiteJiFenOrder?stype=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);

    var that = this;
    
    util.requestUrl(getApp().globalData.newBaseUrl + 'integralWareDetail',
      { 
        'code': getApp().globalData.subCode,
        'id':options.id
      },
      function (res) {
        
        console.log(res);
        if(res.data.flag)
        {
          that.setData({ mDic:res.data.integralWare});

          WxParse.wxParse('article1', 'html', res.data.integralWare.explains, that, 20);

          WxParse.wxParse('article', 'html', res.data.integralWare.detail, that, 20);
        }
        else
        {
          wx.showToast({
            title: res.data.msg,
          })
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