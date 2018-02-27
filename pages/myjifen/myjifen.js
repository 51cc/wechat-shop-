// pages/myjifen/myjifen.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isQD:true,
    sumJiFen:0,
    singleJiFen:2,
    choujiangAy:[],
    duihuanAy:[],
    dataAy:['','',''],
    maincolor:'#ffffff'
  },
  jumptochoujiang:function(){
      wx.navigateTo({
        url: '../wheel/wheel',
      })
  },
  jumptochoujiangdetail:function(e){
    console.log(e);
    var dic = this.data.choujiangAy[e.currentTarget.dataset.id];
    if (dic.integral > this.data.sumJiFen)
    {
      wx.showToast({
        title: '当前积分不足',
      })
    }
    else
    {
      wx.navigateTo({
        url: '../myjfchoujiangdetail/myjfchoujiangdetail?id='+e.currentTarget.id,
      })
    }
  },
  jumptoproductdetail:function(e){

    var dic = this.data.duihuanAy[e.currentTarget.dataset.id];

    if (dic.integral > this.data.sumJiFen) {
      wx.showToast({
        title: '当前积分不足',
      })
    }
    else {
    
    wx.navigateTo({
      url: '../myjfduihuandetail/myjfduihuandetail?id=' + e.currentTarget.id + '&sumJiFen=' + this.data.sumJiFen,
    })
    
    }
  },
  jumptojifenorder:function(){
//积分订单
    wx.navigateTo({
      url: '../myjfOrder/myjfOrder',
    })
  },
  jumptojifenmingxi:function(){
//积分明细
      wx.navigateTo({
        url: '../myjfMingXi/myjfMingXi',
      })
  },
  jumptojifenguize:function(){
//积分规则
    wx.navigateTo({
      url: '../myjfGuiZe/myjfGuiZe',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
        // that.setData({ rows: res.data.myList });
      });



    util.requestUrl(getApp().globalData.newBaseUrl + 'integralList',
      { 'code': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
        that.setData({ choujiangAy: res.data.integralLuckList });
        that.setData({ duihuanAy: res.data.integralChangeList });
      });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  qianDao: function (e) {

    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'signIntegral',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        
        console.log(res);

        if (res.data.flag) {
          that.setData({ isQD: true });
          that.setData({ sumJiFen: res.data.bqUser.credit });
          wx.showToast({
            title: res.data.msg,
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'usable',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        console.log(res);
        that.setData({ singleJiFen: res.data.integralPz.qdIntegral});
        that.setData({sumJiFen:res.data.bqUser.credit});
        that.setData({ isQD: res.data.isSign });

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