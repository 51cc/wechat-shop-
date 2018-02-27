var util = require('../../utils/util.js');

Page({
  data: {
    shops: [],
    hasContent: false,
    item: { 'icon': '../../Asset/q_shangpu.png', 'title': '暂无没有品牌商铺' }
  },
  jumptoshopdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid=' + e.currentTarget.id,
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
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //latitude: 36.651216, longitude: 117.12,
        // succes
        util.requestUrl(getApp().globalData.baseUrl + 'getCityCodeByBd', {
          'CODE': getApp().globalData.subCode,
          'lng': res.latitude,
          'lat': res.longitude
        }, function (res) {
          console.log(res);
          if (res.data.status == '200') {
            wx.setStorageSync('cityCode', res.data.city.code);

            util.requestUrl(getApp().globalData.baseUrl + 'partnerList', { 'CITY_ID': wx.getStorageSync('cityCode'), 'CODE': getApp().globalData.subCode, 'MAPX': res.latitude, 'MAPY': res.longitude}, function (res) {
              console.log(res);
              if (res.data.status == '200') {
                that.setData({ shops: res.data.dataList });
                if (that.data.shops.length > 0) {
                  that.setData({ hasContent: true });
                }
              }
            });



          }

        });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })


    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})