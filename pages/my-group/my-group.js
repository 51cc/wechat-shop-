var util = require('../../utils/util.js');
Page({
  data: {
    orders: [],
    quesheng: { 'icon': '../../Asset/dingdan.png', 'title': '暂无订单，快去逛逛吧', isHidden: false }
  },
  onLoad: function (options) {
    this.requestData();
  },
  requestData() {
    var that = this;
    this.setData({ orders: [] });
    var url = wx.getStorageSync('url');
    var code = getApp().globalData.subCode;
    var userId = wx.getStorageSync('userInfo').usersId;//wx.getStorageSync('userInfo').usersId ;//wx.getStorageSync('userId');
    var param = {
      'userId': userId,
      'code': code
    };
    console.log(param);
    util.requestUrl(getApp().globalData.newBaseUrl + 'getAllTeamOrder', param, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        if (res.data.teamOrders.length > 0) {
          var quesheng = that.data.quesheng;
          var orders = res.data.teamOrders;
          quesheng.isHidden = true;
          that.setData({
            'orders': orders,
            'quesheng': quesheng
          });
        } else {
          var quesheng = that.data.quesheng;
          quesheng.isHidden = false;
          that.setData({
            'quesheng': quesheng
          });
        }
      } else {
        var quesheng = that.data.quesheng;
        quesheng.isHidden = false;
        that.setData({
          'quesheng': quesheng
        });
      }
    });
  },

  //删除团购订单
  deleteOrder: function (e) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      success: function (res) {
        if (res.confirm) {

          var id = e.currentTarget.id;
          var url = wx.getStorageSync('url');
          var code = getApp().globalData.subCode;//wx.getStorageSync('code');
          var param = {
            'code': code,
            'id': id
          };
          util.requestUrl(getApp().globalData.newBaseUrl + 'delTeamOrderById', param, function (res) {
            if (res.data.flag) {
              wx.showToast({
                title: '删除成功',
              });
              that.requestData();
            }
          });
        } else if (res.cancel) {
        }
      }
    })

    
  },

  //取消 退款
  quxiao:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var url = wx.getStorageSync('url');
    var code = getApp().globalData.subCode;//wx.getStorageSync('code');
    var param = {
      'code': code,
      'id': id
    };
    console.log(param);
    util.requestUrl(getApp().globalData.newBaseUrl + 'refund', param, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        wx.showToast({
          title: res.data.msg,
        });
        that.requestData();
      }else{
        wx.showToast({
          title: res.data.msg,
        });
      }
    });
  },
  // 确认收货
  querenshouhuo:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var code = getApp().globalData.subCode;//wx.getStorageSync('code');
    var param = {
      'code': code,
      'id': id
    };
    console.log(param);
    util.requestUrl(getApp().globalData.newBaseUrl + 'confirm', param, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        wx.showToast({
          title: res.data.msg,
        });
        that.requestData();
      } else {
        wx.showToast({
          title: res.data.msg,
        });
      }
    });
  },
  //再次购买
  goumaiagin : function(e){
    var id = e.currentTarget.id;
    var orders = this.data.orders;
    var shareTeamId = '';
    var shareProductId = '';
    for (var i = 0; i < orders.length; i++) {
      if (id == orders[i].id) {
        shareTeamId = orders[i].teamId;
        shareProductId = orders[i].productId;
        break;
      }
    }
    wx.navigateTo({
      url: '../group/group?state=2&teamid=' + shareTeamId + "&productid=" + shareProductId
    });
  },

  //付款
  payNow: function (e) {
    var that = this;
    var orderNo = e.currentTarget.id;
    var url = wx.getStorageSync('url');
    var code = getApp().globalData.subCode;//wx.getStorageSync('code');
    var param = {
      'code':code,
      'orderNo':orderNo
    };
    util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTeam',param, function (res) {
      console.log(res.data);
      if (res.data.status == '200') {
        var dic = JSON.parse(res.data.wechat);
        console.log(dic);
        wx.requestPayment({
          timeStamp: dic.timeStamp,
          nonceStr: dic.nonceStr,
          package: dic.package,
          signType: 'MD5',
          paySign: dic.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '付款成功',
            });
            setTimeout(function(){
              that.requestData();
            },2000);
          },
          'fail': function (res) {
            console.log(res);
          }
        });
      } else {
        wx.showToast({
          title: res.data.info
        });
      }
    });
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
  },
  yaoqing:function(e){
    var id = e.target.id;
    var orders = this.data.orders;
    var shareName = '';
    var shareTeamId = '';
    var shareProductId = '';
    for (var i = 0; i < orders.length; i++) {
      if (id == orders[i].id) {
        shareName = orders[i].name;
        shareTeamId = orders[i].teamId;
        shareProductId = orders[i].productId;
        break;
      }
    }
    wx.navigateTo({
      url: '../group/group?state=1&teamid=' + shareTeamId + "&productid=" + shareProductId,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var id = e.target.id;
    var orders = this.data.orders;
    var shareName = '';
    var shareTeamId = '';
    var shareProductId = '';
    for (var i = 0; i < orders.length; i++) {
      if (id == orders[i].id) {
        shareName = orders[i].name;
        shareTeamId = orders[i].teamId;
        shareProductId = orders[i].productId;
        break;
      }
    }
    return {
      title: shareName + ' 团购活动分享',
      path: 'pages/group/group?state=2&teamid=' + shareTeamId + "&productid=" + shareProductId
    }
  }
})