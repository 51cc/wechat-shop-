// pages/myjfduihuandetail/myjfduihuandetail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mDic: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    dhJiFen:0,
    sumJiFen:0,
    canDuiHuan:true,
    proNum:1
  },
  duhuaNow:function(){

    this.data.mDic.num= this.data.proNum;

    this.data.mDic.sumJiFen = this.data.dhJiFen;

    wx.setStorageSync('duihuan', this.data.mDic);

    wx.navigateTo({
      url: '../submiteJiFenOrder/submiteJiFenOrder?stype=2',
    })
  },
plus:function(){
  if(this.data.proNum>1)
  {
    this.data.proNum--;
    this.setData({ dhJiFen: this.data.mDic.integral * this.data.proNum });
    this.setData({proNum:this.data.proNum});
  }

  if (this.data.sumJiFen >= this.data.dhJiFen) {
    this.setData({ canDuiHuan: true });
    if (this.data.mDic.stock >= this.data.proNum)
    {

    }
    else
    {
      this.setData({ canDuiHuan: false });

    }
  }
  else {
    this.setData({ canDuiHuan: false });
  }

},
add:function(){
  this.data.proNum++;


  this.setData({ dhJiFen: this.data.mDic.integral * this.data.proNum });

  this.setData({ proNum: this.data.proNum });

  if (this.data.sumJiFen >= this.data.dhJiFen)
  {
    this.setData({ canDuiHuan:true});
    if (this.data.mDic.stock >= this.data.proNum) {

    }
    else {
      this.setData({ canDuiHuan: false });

    }
  }
  else
  {
    this.setData({ canDuiHuan: false });
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);

    this.setData({ sumJiFen: options.sumJiFen});

    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'integralWareDetail',
      {
        'code': getApp().globalData.subCode,
        'id': options.id
      },
      function (res) {

        console.log(res);
        if (res.data.flag) {


          that.setData({ mDic: res.data.integralWare });

          if (that.data.mDic.stock >= that.data.proNum) {

          }
          else {
            that.setData({ canDuiHuan: false });

          }

          that.setData({ dhJiFen: (parseFloat(res.data.integralWare.integral) * parseInt(that.data.proNum))});

          WxParse.wxParse('article', 'html', res.data.integralWare.detail, that, 20);
        }
        else {
          wx.showToast({
            title: res.data.msg,
          })
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