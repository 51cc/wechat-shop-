// fenxiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headicon: "",
    nickName: "昵称",
    cateAy: [
      { 'title': '分销佣金', 'icon':'../../Asset/fenxiao_yj.png','id':0},
      { 'title': '分销订单', 'icon': '../../Asset/fenxiao_dd.png','id':1 },
      { 'title': '提现明细', 'icon': '../../Asset/fenxiao_mx.png', 'id': 2 },
      { 'title': '我的下线', 'icon': '../../Asset/fenxiao_xx.png', 'id': 3 },
      { 'title': '推广二维码', 'icon': '../../Asset/fenxiao_ew.png', 'id': 4 }]
  },
  jumptonext:function(e){
    console.log(e);
    if (e.currentTarget.id==0)
    {
      wx.navigateTo({
        url: '../fenxiaoYongjin/fenxiaoYongjin',
      })
    }
    else if (e.currentTarget.id==1)
    {
      wx.navigateTo({
        url: '../fenxiaoDingdan/fenxiaoDingdan',
      })
    }
    else if (e.currentTarget.id == 2) 
    {
      wx.navigateTo({
        url: '../fenxiaoMingxi/fenxiaoMingxi',
      })

    }
    else if (e.currentTarget.id == 3) 
    {
      wx.navigateTo({
        url: '../fenxiaoxiaxian/fenxiaoxiaxian',
      })
    }
    else if (e.currentTarget.id == 4) 
    {
      wx.navigateTo({
        url: '../fenxiaoerweima/fenxiaoerweima',
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            that.setData({ headicon: res.userInfo.avatarUrl });
            that.setData({ nickName: res.userInfo.nickName });

          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
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
  
  }  
})