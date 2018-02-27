var util = require('../../utils/util.js');
Page({
  data: {
    forms: [
      { 'title': '姓名', 'placeholder': '输入姓名', 'id': '0' },
      { 'title': '电话', 'placeholder': '输入电话', 'id': '1' },
      // { 'title': '地址', 'placeholder': '输入详细地址', 'id': '2' }
    ],

    products: [],//商品集合  因为有可能来自购物车
    sumMoney: '',//商品总价
    shifufei: '',//实际付费  sumMoney+youfei+dazhejian
    name: '请选择收获地址',//姓名
    phone: '',//电话
    // address: '',//地址

    youfei: '',//邮费
    dazhejian: ''//打折减多少
  },

  bindKeyInput: function (e) {
    if (e.currentTarget.id == '0') {
      this.setData({ name: e.detail.value });
    } 
    else if (e.currentTarget.id == '1') {
      this.setData({ phone: e.detail.value });
    } 
    // else if (e.currentTarget.id == '2') {
    //   this.setData({ address: e.detail.value });
    // }
  },
  jumpToAddress:function(){
    var that = this;
    wx.chooseAddress({
      success: function (res) {

        that.setData({ name: res.userName });
        that.setData({ phone: res.telNumber });
        that.setData({ shoujianrenAddress: (res.provinceName + res.cityName + res.countyName + res.detailInfo) });
        that.setData({ provice: res.provinceName });
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
        }
      });

  },
  // huoqukeyongyouhuiquan: function (e) {
  //   var tAy = wx.getStorageSync('jiesuanThing');
  //   var jStr;
  //   if (tAy.length > 0 && !this.data.isBuyNow) {
  //     var ay = [];
  //     for (var index in tAy) {
  //       var dic = tAy[index];
  //       ay.push({ 'id': dic.proid, 'num': dic.num });
  //     }
  //     jStr = JSON.stringify(ay);
  //   }else {
  //     var ay = [{
  //       'id': this.data.proId,
  //       'num': this.data.num
  //     }];
  //     jStr = JSON.stringify(ay);
  //   }
  //   wx.navigateTo({
  //     url: '../youhuiquanselect/youhuiquanselect?jstr=' + jStr,
  //   });
  // },

  //删除购物车
  deleteTheSelectThing: function () {
    var tAy = wx.getStorageSync('jiesuanThing');
    for (var index in tAy) {
      var dic = tAy[index];
      var sAy = wx.getStorageSync('shopCar');
      for (var indexx in sAy) {
        var ddic = sAy[indexx];
        if (ddic.product.id == dic.product.id) {
          sAy.splice(indexx, 1);
        }
      }
      wx.setStorageSync('shopCar', sAy);
    }
  },

  //提交订单
  submiteTheOrder: function (e) {
    var that = this;
    var typez = this.data.type;//1为直接购买 2为来自购物车

    var name = util.trim(this.data.name);
    var phone = util.trim(this.data.phone);
    // var address = util.trim(this.data.address);

    if (name == '') {
      wx.showToast({
        title: '请选择联系人',
      });
      this.setData({
        'name':''
      });
      return;
    }
    if (phone == '') {
      wx.showToast({
        title: '请选择联系人电话',
      });
      this.setData({
        'phone': ''
      });
      return;
    }
    // if (address == '') {
    //   wx.showToast({
    //     title: '请收入联系人地址',
    //   });
    //   return;
    // }

    var tAy = this.data.products;
    var ay = [];
    for (var index in tAy) {
      var dic = tAy[index];
      ay.push({
        'id': dic.product.id,
        'num': '' + dic.proNum,
        'standid':'',
        'standName':''
      });
    }
    var order = {
      'USER_ID': wx.getStorageSync('userInfo').usersId,
      //wx.getStorageSync('userId'),
      'CODE': getApp().globalData.subCode,
      'LINKMAN': this.data.name,
      'MOBILE': this.data.phone,
      'ADDRESS': this.data.shoujianrenAddress,
      'JSON': JSON.stringify(ay),
      'MONEY': this.data.shifufei
    };
    console.log('------');
    console.log(order);
    util.requestUrl(getApp().globalData.baseUrl + 'addPtOrder', order, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        if (typez==2){
          
          that.deleteTheSelectThing();
        }
        var param = {
          'CODE': getApp().globalData.subCode,
          'ORDERNUM': res.data.order.ordernum,
          'STATUS':'NEW'
        };
        console.log(param);
        util.requestUrl(getApp().globalData.baseUrl + 'preWechat', param, function (res) {
          console.log(res.data);
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
                wx.showToast({
                  title: '付款成功',
                });
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 5
                  });
                }, 2000);
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
      }
    });
  },

  //初始化数据
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var type = options.type;//1是页面提交  2是购物车提价
    if (type == 2) {
      var tAy = wx.getStorageSync('jiesuanThing');
      var sum = 0.0;
      for (var index in tAy) {
        var obj = tAy[index];
        sum += (parseFloat(obj.productprice) * parseInt(obj.proNum));
      }
      this.setData({ youfei: '0' });
      this.setData({ dazhejian: '0' });
      this.setData({ type: '2' });
      // this.setData({ shoujianrenName: '请选择收货地址' });
      this.setData({ sumMoney: sum });
      // this.setData({ single: false });
      this.setData({ products: tAy });
      this.setData({ shifufei: (parseFloat(this.data.sumMoney) - parseFloat(this.data.dazhejian) + parseFloat(this.data.youfei)) });
    } else if (type == 1) {
      var tAy = wx.getStorageSync('buyNowThings');
      this.setData({ products: tAy });
      this.setData({ sumMoney: tAy[0].sumPrice });
      this.setData({ dazhejian: '0' });
      this.setData({ youfei: '0' });
      this.setData({ type: '1' });
      // this.setData({ shoujianrenName: '请选择收货地址' });
      this.setData({ shifufei: (parseFloat(this.data.sumMoney) - parseFloat(this.data.dazhejian) + parseFloat(this.data.youfei)) });
    }
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