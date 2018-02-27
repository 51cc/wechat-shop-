// pages/submiteJiFenOrder/submiteJiFenOrder.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stype:1,
    mDic:{},
    num:1,
    shoujianrenName: '请选择地址',
    shoujianrenPhone: '',
    shoujianrenAddress: '',
  },
  jumpToAddress: function (e) {
  
  var that = this;
  
  wx.chooseAddress({
    success: function (res) {

      that.setData({ shoujianrenName: res.userName });
      that.setData({ shoujianrenPhone: res.telNumber });
      that.setData({ shoujianrenAddress: (res.provinceName + res.cityName + res.countyName + res.detailInfo) });


      that.setData({ provice: res.provinceName });
      console.log(res.userName)
      console.log(res.postalCode)
      console.log(res.provinceName)
      console.log(res.cityName)
      console.log(res.countyName)
      console.log(res.detailInfo)
      console.log(res.nationalCode)
      console.log(res.telNumber)
      }
    })
  },
  submiteTheOrder:function()
  {
    var that = this;

    if (this.data.shoujianrenName.length > 0 && this.data.shoujianrenPhone.length > 0 && this.data.shoujianrenAddress.length > 0 )
    {

        if(this.data.stype==1)
        {
//抽奖下单  
          util.requestUrl(getApp().globalData.newBaseUrl + 'addIntegralLuckOrder',
            {
              'code': getApp().globalData.subCode,
              'userId': wx.getStorageSync('userInfo').usersId,
              'id': this.data.mDic.preOrderId,
              'proid':this.data.mDic.id,
              'num':1,
              'buyerLinkman':this.data.shoujianrenName,
              'buyerMobile':this.data.shoujianrenPhone,
              'buyerAddress':this.data.shoujianrenAddress
            },
            function (res) {

              console.log(res);
              if (res.data.flag) {
                wx.showToast({
                  title: '抽奖成功',
                })
                wx.navigateTo({
                  url: '../myjfOrder/myjfOrder',
                })
              
              }
              else {
                wx.showToast({
                  title: res.data.msg,
                })
              }
            });

        }
        else if(this.data.stype==2)
        {
//兑换下单
          util.requestUrl(getApp().globalData.newBaseUrl + 'addIntegralChangeOrder',
            {
              'code': getApp().globalData.subCode,
              'userId': wx.getStorageSync('userInfo').usersId,
              'proid': this.data.mDic.id,
              'num': this.data.mDic.num,
              'buyerLinkman': this.data.shoujianrenName,
              'buyerMobile': this.data.shoujianrenPhone,
              'buyerAddress': this.data.shoujianrenAddress
            },
            function (res) {

              console.log(res);
              if (res.data.flag) {
                wx.showToast({
                  title: '兑换成功',
                })
                wx.navigateTo({
                  url: '../myjfOrder/myjfOrder',
                })

              }
              else {
                wx.showToast({
                  title: res.data.msg,
                })
              }
            });

        }

    }
    else
    {
      wx.showToast({
        title: '选择收获地址',
      })

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({ stype: options.stype});

    if(options.stype==1)
    {
      this.setData({ mDic:wx.getStorageSync('choujiang')});
    }
    else
    {
      this.setData({ mDic: wx.getStorageSync('duihuan')});
    }
  // options.stype   兑换 2    抽奖 1
    console.log(options.stype);


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