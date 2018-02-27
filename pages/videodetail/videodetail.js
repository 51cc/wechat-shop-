// videodetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    dic:'',
    videoContext:''
      
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var paraDic = {
      'id': options.id,
      'CODE': getApp().globalData.subCode,
    };
    util.requestUrl(getApp().globalData.baseUrl + 'videoDetail', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        that.setData({ dic: res.data.data });

      }
    });
  },
  changeFull:function(){
    console.log('+++===++++');
    wx.createVideoContext('wgqvideo').requestFullScreen();
    this.videoContext.requestFullScreen();
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