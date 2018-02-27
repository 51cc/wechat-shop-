// pages/huatiquans/huatiquans.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasContent:true,
    item: { 'icon': '../../Asset/q_shangpin.png', 'title': '加载中...' },
    maincolor: '',
    ttId:'',
    htAy:[]
  },
  requesQuanDara: function (tId) {


    console.log(tId);

    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {

        console.log(res);

        that.setData({ maincolor: res.data.color });
      }
    );
    util.requestUrl(getApp().globalData.newBaseUrl + 'topiceList',
      {
        'id':tId,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {

          if(res.data.dataList.length>0)
          {
            that.setData({ hasContent:true});

            
          }
          else
          {
            that.setData({ hasContent:false });   

            that.setData({
              item: { 'icon': '../../Asset/q_shangpin.png', 'title': '暂无数据...' }
            });         
          }

          that.setData({ htAy: res.data.dataList });

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
    this.setData({ ttId:options.tid});
    this.requesQuanDara(options.tid);

    wx.setNavigationBarTitle({
      title: options.name,
    })
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
    return {
      title: '我的话题圈',
      path: '/pages/huatidetail/huatidetail?hid=' + e.target.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
  jumptofabu: function () {
    var that = this;

    console.log(that.data.ttId);
    
    wx.navigateTo({
      url: '../huatifabu/huatifabu?hasFenLei=1&tid=' + that.data.ttId,
    })
  },
  jumptotel: function (e) {
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