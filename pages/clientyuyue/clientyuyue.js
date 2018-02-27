// clientyuyue.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'请选择',
    beizhu:'',
    name: '',
    phone: '',
    maincolor:'',
    pId:''
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value);
    if (e.currentTarget.id == 1) {

    }
    else if (e.currentTarget.id == 2) {
      this.setData({ phone: e.detail.value });

    }
    else if (e.currentTarget.id == 3) {
      this.setData({ name: e.detail.value });

    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ time: e.detail.value });

  },
  selectCar:function(){
      this.data.time
      this.data.beizhu
      this.data.name
      this.data.phone


      util.requestUrl(getApp().globalData.baseUrl + 'parAppo',
        {
          'user_id': wx.getStorageSync('userInfo').usersId,
          'name': this.data.name,
          'CODE': getApp().globalData.subCode,
          'dates': this.data.time,
          'mobile': this.data.phone,
          'partner_id':this.data.pId,
          'remark': this.data.beizhu,

        }, function (res) {
          console.log(res);
          if (res.data.status == '200') {
            wx.showLoading({
              title: '预约成功',
            })

            setTimeout(function () {
              wx.hideLoading()
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
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
            }, 2000)

          }
        });
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({ beizhu: e.detail.value });
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
      });



      this.setData({pId:options.pid});
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
  
  }
})