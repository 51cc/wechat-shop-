// pages/yynewdetail/yynewdetail.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maincolor:'',
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    mDic:{},
    imgUrls: []
  },
  jumptocommentlist:function(){
    wx.navigateTo({
      url: '../yycommentlist/yycommentlist?sId=' + this.data.mDic.data.id,
    })
  },
  jumptosubmite:function(){
    var that = this;
    
    that.data.mDic.data.DETAIL = "";
    that.data.mDic.data.detail = "";
    that.data.mDic.data.time_slot="";
    that.data.mDic.data.IMG = "";
    that.data.mDic.data.img = "";
    that.data.mDic.data.TIME_SLOT = "";


    that.setData({mDic:that.data.mDic});



    wx.navigateTo({
      url: '../yysubmite/yysubmite?sDic=' + JSON.stringify(that.data.mDic),
    })
  },
  makePhone:function(){
    var that = this;

    wx.makePhoneCall({
      phoneNumber: this.data.mDic.data.MOBILE,
    })
  },
  jumptoclientmap:function(){
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.mDic.data.MAPX),
      longitude: Number(that.data.mDic.data.MAPY),
      name: that.data.mDic.data.title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var str1 = res.data.data.detail;
    // WxParse.wxParse('article', 'html', str1, that, 20);
    console.log(options);
    var that = this;

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {

        console.log(res);
        that.setData({ maincolor: res.data.color });
    
      });

    wx.showLoading({
      title: '加载中',
    })
    util.requestUrl(getApp().globalData.newBaseUrl + 'getAppointById',
      {
      'code':getApp().globalData.subCode,
      'id':options.yId
      },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          that.setData({mDic:res.data});

          that.setData({ imgUrls:[{'img':res.data.data.img}]});

          var str1 = res.data.data.detail;
          
           WxParse.wxParse('article', 'html', str1, that, 20);
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