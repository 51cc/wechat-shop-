// pages/yaoqing/yaoqing.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');

Page({


  /**
   * 页面的初始数据
   */
  data: {
    renWu:'',
    wDic:{},
    lp:0,
    name:'',
    phone:'',
    address:'',
    mDic:{},
    islingqu:false,
    sheight: 0.0,
    swidth: 0.0,
    dataAy:['','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  xiugaidizhi:function(){
    var that = this;

    wx.chooseAddress({
      success: function (res) {

        that.setData({ islingqu: true });

        that.setData({ name: res.userName});
        that.setData({ phone: res.telNumber });
        that.setData({ address: (res.provinceName+''+res.cityName+''+''+res.countyName+''+res.detailInfo)});

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
  querenlingqu:function(){
    this.setData({ islingqu: false });
    this.requestLingQuLiPin();

  },
  closeTheMask:function(){
    this.setData({ islingqu: false });

  },
  lingqulipin:function(e){
    var that = this;

    this.setData({renWu:e.currentTarget.id});
    wx.chooseAddress({
      success: function (res) {

        that.setData({islingqu:true});
        that.setData({ name: res.userName });
        that.setData({ phone: res.telNumber });
        that.setData({ address: (res.provinceName + '' + res.cityName + '' + '' + res.countyName + '' + res.detailInfo) });





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
  requestLingQuLiPin:function(){
    var that = this;

    var paraDic = {
      'code': getApp().globalData.subCode,
      'userId': wx.getStorageSync('userInfo').usersId,
      'invitenoteId': this.data.wDic.invitenote.id,
      'userName': wx.getStorageSync('userInfo').nickname,
      'renwu': (parseInt(this.data.renWu)+1),
      'linkPhone':this.data.phone,
      'linkAddress':this.data.address
    };
    
    console.log(paraDic);

    util.requestUrl(getApp().globalData.newBaseUrl + 'addInviteOrder', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {

        wx.showToast({
          title: '领取成功',
        })
        that.requestData();

      }
    });

  },
  onLoad: function (options) {

    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })

    this.requestData();
  },
  requestData:function(){
    var that = this;
    var paraDic = {
      'code': getApp().globalData.subCode,
      'userId': wx.getStorageSync('userInfo').usersId,
    };

    util.requestUrl(getApp().globalData.newBaseUrl + 'inviteIsStop', paraDic, function (res) {

      console.log(res);
      if (res.data.status == '200') {

        if (res.data.data.isstop == '0') {

          util.requestUrl(getApp().globalData.newBaseUrl + 'getInvite', paraDic, function (res) {
            console.log(res);
            if (res.data.status == '200') {

              that.setData({ mDic: res.data.data });

              that.setData({ wDic: res.data });

              that.setData({ lp: res.data.orderListC });

              that.setData({ dataAy: res.data.data.products });

              WxParse.wxParse('article', 'html', res.data.data.detail, that, 20);
            }

          });
        }
        else {

          wx.showModal({
            title: '提示',
            content: '活动结束',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          })

        }
      }

    });

  },
  jumptoyaoqing:function(){
    console.log(wx.getStorageSync('userInfo'));
    wx.navigateTo({
      url: '../yaoqingyouli/yaoqingyouli?userId=' + wx.getStorageSync('userInfo').usersId + '&name=' + wx.getStorageSync('userInfo').nickname + '&actId=' + this.data.mDic.id,
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
  onShareAppMessage: function () {
    var that = this;
    return {
      title: getApp().globalData.appName, // 分享标题
      desc:'邀请有礼', // 分享描述
      path:'pages/yaoqingyouli/yaoqingyouli?userId='+wx.getStorageSync('userInfo').usersId+'&name='+wx.getStorageSync('userInfo').nickname+'&actId='+that.data.mDic.id, // 分享路径
    }
  }
})