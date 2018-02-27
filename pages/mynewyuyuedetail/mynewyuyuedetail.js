// pages/mynewyuyuedetail/mynewyuyuedetail.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maincolor:'',
    orderId:'',
    mDic:{}
  },
  makePhone: function () {
    var that = this;

    wx.makePhoneCall({
      phoneNumber: this.data.mDic.MOBILE,
    })
  },
  jumptoclientmap: function () {
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.mDic.MAPX),
      longitude: Number(that.data.mDic.MAPY),
      name: that.data.mDic.title
    })
  },
  paynow:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatAppoint', { 'orderNo': this.data.mDic.order_no}, function (res) {

      wx.hideLoading();

      if (res.data.status == '200') {

        var dic = JSON.parse(res.data.wechat);

        wx.requestPayment({
          timeStamp: dic.timeStamp,
          nonceStr: dic.nonceStr,
          package: dic.package,
          signType: 'MD5',
          paySign: dic.paySign,
          'success': function (res) {
            console.log(res);
            wx.navigateBack({
              delta:1
            })

          },
          'fail': function (res) {
            console.log(res);
          }
        });


      }
    });

  },
  quxiao:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    });

    util.requestUrl(getApp().globalData.newBaseUrl + 'updateOneAppoint',
      {
        'id': this.data.mDic.id
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {
          wx.navigateBack({
            delta:1
          })
        }


      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({ orderId: options.oId});

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) 
      {

        console.log(res);
        that.setData({ maincolor: res.data.color });
      });


    this.requestData();

    console.log(options.oId);
  },
  requestData: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });

    util.requestUrl(getApp().globalData.newBaseUrl + 'selectAllAppoints',
      {
        'id': this.data.orderId,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId,
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          that.setData({ mDic: res.data.data[0]});
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