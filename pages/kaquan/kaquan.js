// kaquan.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy: [],
    hasContent: false,
    item: { 'icon': '../../Asset/q_shoucang.png', 'title': '暂时没有卡券' }
  },
  openTheMap:function(e){

  },
  callTheClient:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  openMap: function (e) {
    var dic = this.data.dataAy[e.currentTarget.id];
    console.log(dic);
    var that = this;
    wx.openLocation({
      latitude: Number(dic.mapx),
      longitude: Number(dic.mapy),
      name: dic.title
    })
  },
  jumptolingqu: function (e) {
    console.log(e.currentTarget.id);
    var that = this;

    util.requestUrl(getApp().globalData.baseUrl + 'getCardExt', {
      'card_id': e.currentTarget.id,'CODE': getApp().globalData.subCode, }, function (res) {
        console.log(res.data.cardExt);
      if (res.data.status == '200') {
        // var str = '{"code": "", "openid": "","timestamp": ' + '"'+res.data.cardExt.timestamp + '"'+',' + '"signature":' + '"'+res.data.cardExt.signature+'"'+'}';
          //  console.log('======'+str+'---------');
            wx.addCard({
              cardList: [{
                cardId: e.currentTarget.id,
                cardExt: res.data.cardExt
               }],
              success: function (res) {
                console('+++++++++++++++++++');
                console.log(res.cardList);
              },
              complete: function (res) {
                console.log('_____-------------_______');
                console.log(res);
              }
            })

      }
    });




    

    // wx.openCard({
    //   cardList: [{ 'cardId	': e.currentTarget.id }],
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.requestUrl(getApp().globalData.baseUrl + 'cashList', { 'CODE': getApp().globalData.subCode, }, function (res) {
      console.log(res);
      wx.hideLoading();
      
      if (res.data.status == '200') {
        that.setData({ dataAy: res.data.dataList });
      }

      
      if(that.data.dataAy.length>0)
      {
        that.setData({ hasContent:true});
      }
      else
      {
        that.setData({ hasContent: false });
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