// pages/myfabu/myfabu.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    htAy:[]
  },
  requesQuanDara: function () {

    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.newBaseUrl + 'mytopic',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {
        
          that.setData({ htAy: res.data.topicList });
        }
        else {

        }

        wx.hideLoading();

      });
  },
  zan: function (e) {
    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.newBaseUrl + 'postCollect',
      {
        'topicId': e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {
          that.requesQuanDara(that.data.ttId);
        }
        else {

        }

        wx.hideLoading();

      });
  },
  jumptodetail: function (e) {
    wx.navigateTo({
      url: '../huatidetail/huatidetail?hid=' + e.currentTarget.id,
    })
  },
  lookaddress: function (e) {
    console.log(e);
    var lan = e.currentTarget.dataset.lan;
    var lon = e.currentTarget.dataset.lon;
    var address = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: parseFloat(lan),
      longitude: parseFloat(lon),
      scale: 28,
      address: address
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requesQuanDara();
  },
  payNow:function(e){
    var  that = this;
    util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTopic', { 'orderNo': e.currentTarget.id }, function (res) {
      console.log(res.data);
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
            wx.showToast({
              title: '付款成功',
            });
            setTimeout(function () {
              that.requesQuanDara();


            }, 2000);
          },
          'fail': function (res) {
            console.log(res);
          }
        });
      } else {
        wx.showToast({
          title: res.data.info
        });
      }
    });

  },
  shanchu:function(e){
    var that = this;
    util.requestUrl(getApp().globalData.newBaseUrl + 'delTopic', { 
      'code': getApp().globalData.subCode,
      'userId': wx.getStorageSync('userInfo').usersId,
      'id': e.currentTarget.id }, function (res) {
      console.log(res.data);
      if (res.data.status == '200') {
        that.requesQuanDara();

      } else {
        wx.showToast({
          title: res.data.info
        });
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