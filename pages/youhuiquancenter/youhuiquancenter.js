// youhuiquancenter.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy: [],
    hasContent: false,
    item: { 'icon': '../../Asset/q_dingdan.png', 'title': '加载中' }
  },
  jumptodetail: function (e) {
    wx.navigateTo({
      url: '../youhuiquanDetail/youhuiquanDetail?id=' + e.currentTarget.id,
    })
  },
  
  lingqu:function(e){
    console.log(e.currentTarget.id);
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'userDoleCoupon', 
    { 'CODE': getApp().globalData.subCode,
      'USER_ID': wx.getStorageSync('userInfo').usersId, 
      'COUPON_ID': e.currentTarget.id}, function (res) {
        wx.showLoading({
          title: res.data.info

          ,
        })

        setTimeout(function () {
          wx.hideLoading()
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function (res) {
              // success
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        }, 2000)

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'couponList', {'CODE': getApp().globalData.subCode,
      'USER_ID': wx.getStorageSync('userInfo').usersId,}, function (res) {
        wx.hideLoading()

      if (res.data.status == '200') {
        console.log(res);
        that.setData({ dataAy:res.data.dataList});
      }
      if (that.data.dataAy.length > 0) {
        that.setData({ hasContent: true });
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