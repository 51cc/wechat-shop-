// team-detail.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [],
    product:{},
    isHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.setStorageSync('groupId', options.id);


    this.setData({
      'teamId': options.id
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


    WxParse.wxParse('article', 'html', "", this, 5);

    var that = this;
    var code = wx.getStorageSync('code');
    var url = wx.getStorageSync('url');
    var groupId = wx.getStorageSync('groupId');

    var teamId = this.data.teamId;

    var param = {
      'id': teamId,
      'code': getApp().globalData.subCode//code
    };
    util.requestUrl(getApp().globalData.newBaseUrl + 'getDyProductById', param, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        var products = res.data.products;
        that.setData({ imgUrls:res.data.images});

        if (products.length > 0) {
          that.setData({
            'product': res.data.products[0],
            'productprice': res.data.products[0].price,
            'teamprice': res.data.products[0].teamprice,
            'proNum': 1,
            'sumPrice': res.data.products[0].price,
            'teamSumPrice': res.data.products[0].teamprice,
          });
          var str1 = res.data.products[0].detail;//res.data.data.detail;

          WxParse.wxParse('article', 'html', str1, that, 5);
        } else {
          that.setData({
            'product': {}
          });
        }
      }
    });

    var param1 = {
      'productId': teamId,
      'code': getApp().globalData.subCode//code
    };
    console.log("1", param1);
    util.requestUrl(getApp().globalData.newBaseUrl + 'getDyTeamById', param1, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        that.setData({
          'teams': res.data.teams
        });
      }
    });
  },

  //查看全部
  lookAll : function(){
    this.setData({
      'isHidden':false
    });
  },

  //单独购买
  buynowbuttom :function(e){
    var buyNowThings = [];
    var product = {};
    product.product = this.data.product;
    product.productprice = this.data.productprice;
    product.proNum = this.data.proNum;
    product.sumPrice = this.data.sumPrice;
    product.idStr = '';
    buyNowThings.push(product);
    wx.setStorageSync('buyNowThings', buyNowThings);
    wx.navigateTo({
      url: '../submit-order/submit-order?type=1'
    });
  },

  //一键拼单
  openGroup :function(e){
    var buyNowThings = [];
    var product = {};
    product.product = this.data.product;
    product.productprice = this.data.teamprice;
    product.proNum = this.data.proNum;
    product.sumPrice = this.data.teamSumPrice;
    product.idStr = '';
    buyNowThings.push(product);
    wx.setStorageSync('buyNowThings', buyNowThings);
    wx.navigateTo({
      url: "../group-order/group-order?id=''"
    });
  },

  //去凑团
  appointGroup :function(e){
    var id = e.currentTarget.id;//所凑团的id
    var buyNowThings = [];
    var product = {};
    product.product = this.data.product;
    product.productprice = this.data.teamprice;
    product.proNum = this.data.proNum;
    product.sumPrice = this.data.teamSumPrice;
    product.idStr = '';
    buyNowThings.push(product);
    wx.setStorageSync('buyNowThings', buyNowThings);
    wx.navigateTo({
      url: '../group-order/group-order?id='+id
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