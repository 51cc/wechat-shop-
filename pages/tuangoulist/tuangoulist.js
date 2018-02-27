// tuangoulist.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    hasContent: false,
    item: { 'icon': '../../Asset/q_shangpin.png', 'title': '暂无相关的商品' }
  },
  jumptodetail:function(e){
    wx.setStorageSync('productId', e.currentTarget.id);
    wx.navigateTo({
      url: '../tuangoudetail/tuangoudetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var paraDic = { 
      'CODE': getApp().globalData.subCode,
    'isTeam':1};
    util.requestUrl(getApp().globalData.baseUrl + 'prodList', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        var listData = [];
        for (var index in res.data.dataList) {
          var dic = res.data.dataList[index];
          listData.push(dic);
        }
        that.setData({ products: listData });

        if (that.data.products.length > 0) {
          that.setData({ hasContent: true });
        }

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