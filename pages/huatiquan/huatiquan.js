// pages/huatiquan.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maincolor:'',
    categoryAy:[],
    htAy:[]
  
  },

  requesQuanDara:function(){

    var that = this;
    
    wx.showLoading({
      title: '加载中',
    })

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {

        console.log(res);

        that.setData({ maincolor: res.data.color });
      }
    );


    util.requestUrl(getApp().globalData.newBaseUrl + 'topiceIndex',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        
        console.log(res);

        if (res.data.status=='200') {
          if (res.data.typeList.length>0)
          {
            that.setData({ categoryAy: res.data.typeList});
          }
          else
          {
            that.setData({ categoryAy:[]});
          }

          that.setData({ htAy: res.data.topicList});
        }
        else {
          
        }

        wx.hideLoading();
      
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.requesQuanDara();

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
  onShareAppMessage: function (e) {

    console.log(e);

    return {
      title: '我的话题圈',
      path: '/pages/huatidetail/huatidetail?hid='+e.target.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  zan:function(e){
    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.newBaseUrl + 'postCollect',
      {
        'topicId':e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {
          that.requesQuanDara();
        }
        else {

        }

        wx.hideLoading();

      });
  },
  huatiquans :function(e){
    console.log(e);
    wx.navigateTo({
      url: '../huatiquans/huatiquans?tid=' + e.currentTarget.id+'&name='+e.currentTarget.dataset.tname,
    })
  },
  jumptodetail :function(e){
    console.log(e);
    wx.navigateTo({
      url: '../huatidetail/huatidetail?hid=' + e.currentTarget.id,
    })
  },
  jumptofabu : function(){
    wx.navigateTo({
      url: '../huatifabu/huatifabu',
    })
  },
  jumptotel:function(e){
    console.log(e);
    var tel = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: tel
    });
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
  }
})