var util = require('../../utils/util.js');
Page({
  data: {
    products: [],//商品集合  因为有可能来自购物车
    sumMoney: '',//商品总价
    shifufei: '',//实际付费  sumMoney+youfei+dazhejian
    name: '请选择收获地址',//姓名
    phone: '',//电话
    youfei: '',//邮费
    dazhejian: ''//打折减多少
  },
  bindKeyInput: function (e) {
    if (e.currentTarget.id == '0') {
      this.setData({ name: e.detail.value });
    }else if (e.currentTarget.id == '1') {
      this.setData({ phone: e.detail.value });
    }
  },

  submiteTheOrder : function(){
    var that = this;
    var name = util.trim(this.data.name);
    var phone = util.trim(this.data.phone);
    if (name == '') {
      wx.showToast({
        title: '请选择收获地址',
      });
      this.setData({
        'name': ''
      });
      return;
    }
    if (phone == '') {
      wx.showToast({
        title: '请选择收获地址',
      });
      this.setData({
        'phone': ''
      });
      return;
    }
    var id = this.data.id;
    if(id=="''"){
      this.submiteOrder();
    }else{
      this.submiteCouOrder();
    }
  },
  jumpToAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {

        that.setData({ name: res.userName });
        that.setData({ phone: res.telNumber });
        that.setData({ shoujianrenAddress: (res.provinceName + res.cityName + res.countyName + res.detailInfo) });
        that.setData({ provice: res.provinceName });
       
      }
    });

  },
  //提交订单 凑团使用
  submiteCouOrder: function (e) {
    var that = this;
    var tAy = this.data.products;
    var ay = [];
    var productid = "";

    console.log(wx.getStorageSync('userInfo').usersId);

    wx.getUserInfo({
      success: function (res) {
      
     
    for (var index in tAy) {
      var dic = tAy[index];
      productid = dic.product.id;
      ay.push({
        'code': getApp().globalData.subCode,//wx.getStorageSync('code'),
        'userId': wx.getStorageSync('userInfo').usersId,
        'userIcon': res.userInfo.avatarUrl,//wx.getStorageSync("userInfo").icon,
        'linkMan': that.data.name,
        'tel': that.data.phone,
        'buyerAddress': that.data.shoujianrenAddress,
        'totalPrice': that.data.shifufei,
        'state': '0',
        'productId': dic.product.id,
        'teamId': that.data.id,
        'img': dic.product.icon
      });
    }
    var order = ay[0]
    console.log('-------------++++++++++++++');
    console.log(order);
    util.requestUrl(getApp().globalData.newBaseUrl + 'addDyTeamsOrder', order, function (res) {
      console.log(res);
      var teamid = res.data.teamid;
      if (res.data.flag) {
        wx.showToast({
          title: res.data.msg
        });
        var param = {
          'code': getApp().globalData.subCode,//wx.getStorageSync('code'),
          'orderNo': res.data.orderNo
        };
        util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTeam',param, function (res) {
          console.log(res);
          if (res.data.status == '200') {
            var dic = JSON.parse(res.data.wechat);
            wx.requestPayment({
              timeStamp: dic.timeStamp,
              nonceStr: dic.nonceStr,
              package: dic.package,
              signType: 'MD5',
              paySign: dic.paySign,
              'success': function (res) {
                console.log(res);
                wx.redirectTo({
                  url: '../group/group?state=1&teamid=' + teamid + "&productid=" + productid
                });
              },
              'fail': function (res) {
                console.log(res);
              }
            });
          }else{
            wx.showToast({
              title: res.data.info
            });
          }
        });
      } else {
        wx.showToast({
          title: res.data.msg
        });
      }
    });

      }
    })
  },

  //提交订单 开团使用
  submiteOrder: function (e) {
    var that = this;

    wx.getUserInfo({
      success: function (res) {
    var tAy = that.data.products;
    var ay = [];
    var teamNum = 0;
    var productid = "";
    for (var index in tAy) {
      var dic = tAy[index];
      teamNum = dic.product.teamnum;
      productid = dic.product.id;
      ay.push({
        'code': getApp().globalData.subCode,//wx.getStorageSync('code'),
        'userId': wx.getStorageSync('userInfo').usersId,//wx.getStorageSync('userId'),
        'userIcon': wx.getStorageSync("userInfo").icon,
        'linkMan': that.data.name,
        'tel': that.data.phone,
        'buyerAddress': that.data.shoujianrenAddress,
        'totalPrice': that.data.shifufei,
        'state': '0',
        'productId': dic.product.id,
        'img': dic.product.icon,
      });
    }
    var order = {
      'openUserId': wx.getStorageSync('userInfo').usersId,
      'code': getApp().globalData.subCode,//wx.getStorageSync('code'),
      'teamNum': teamNum,
      'state': '0',
      'teamOrder': JSON.stringify(ay[0])
    };
    console.log('-------------++++++++++++++');

    console.log(order);
    util.requestUrl(getApp().globalData.newBaseUrl + 'addDyTeam', order, function (res) {
      console.log('-----拼团--------');

      console.log(res);
      var teamid = res.data.teamid;
      if (res.data.flag) {
        wx.showToast({
          title: res.data.msg
        });
        var param = {
          'code': getApp().globalData.subCode,//wx.getStorageSync('code'),
          'orderNo': res.data.orderNo
        };
        util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTeam', param, function (res) {
          console.log(res);
          if (res.data.status == '200') {
            var dic = JSON.parse(res.data.wechat);
            wx.requestPayment({
              timeStamp: dic.timeStamp,
              nonceStr: dic.nonceStr,
              package: dic.package,
              signType: 'MD5',
              paySign: dic.paySign,
              'success': function (res) {
                console.log(res);
                wx.redirectTo({
                  url: '../group/group?state=1&teamid=' + teamid + "&productid=" + productid
                });
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
      }else{
        wx.showToast({
          title: res.data.msg
        });
      }
    });

      }
    })
  },

  //初始化数据
  onLoad: function (options) {
    console.log("options", options.id);
    this.setData({
      'id':options.id
    });
    var tAy = wx.getStorageSync('buyNowThings');
    this.setData({ products: tAy });
    this.setData({ sumMoney: tAy[0].sumPrice });
    this.setData({ dazhejian: '0' });
    this.setData({ youfei: '0' });
    this.setData({ shifufei: (parseFloat(this.data.sumMoney) - parseFloat(this.data.dazhejian) + parseFloat(this.data.youfei)) });
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
  }
})