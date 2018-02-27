var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({
  data: {
    imgUrls: [],
    proNum: 1,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    showRule: false,
    services: [],
    title: '',
    price: '',
    proNumber: '',
    proId: '',
    clientId: '',
    clientName: '',
    clientAddress: '',
    clientIcon: '',
    pingjiaScore: '',

    imgUrl: '',
    sumPrice: 0,

    commentsNum:'',
    startTime:'',
    endTime:'',
    saleCount:''


  },
  jumptoclientdetail: function () {
    console.log('----------------');
    var that = this;
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid=' + that.data.clientId,
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
  },
  jumptocomments: function (e) {
    wx.navigateTo({
      url: '../commentsList/commentsList',
    })
  },
  jumptokefu: function (e) {

  },
  jumptoshoucang: function (e) {
    var paraDic =
      {
        'USER_ID': wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
        'PRODUCT_ID': this.data.proId
      };
    util.requestUrl(getApp().globalData.baseUrl + 'prodCollect', paraDic, function (res) {
      console.log(res);
      console.log(paraDic);
      if (res.data.status == '200') {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })

      }
    });


  },
  jumptogouwuche: function (e) {
    // this.setData({showRule:true});
    wx.switchTab({
      url: '../gouwuche/gouwuche'
    })
  },
  jairugouwuche: function (e) {
    this.setData({ showRule: true });
  },
  add: function (e) {
    var num = this.data.proNum;
    num = num + 1;
    this.setData({ "proNum": num });
    this.jisuanMoney();
  },
  plus: function (e) {
    var num = this.data.proNum;
    if (num > 1)
      num = num - 1;
    this.setData({ "proNum": num });
    this.jisuanMoney();

  },
  buynow: function (e) {
    this.setData({ showRule: true });

  },
  selectrules: function (e) {
    this.setData({ showRule: true });
  },
  addshopcarbuttom: function (e) {

    var shopPros = wx.getStorageSync('shopCar');

    if (shopPros.length == 0) {
      shopPros = [];
    }

    console.log(shopPros);

    var mPros = shopPros;

    var has = false;

    for (var index in shopPros) {
      var dic = shopPros[index];
      if (dic.proid == this.data.proId) {
        var addNum = 0;
        addNum = parseInt(dic.num) + parseInt(this.data.proNum);
        singleDic = {
          'select': false,
          'imgUrl': this.data.imgUrl,
          'title': this.data.title,
          'proid': this.data.proId,
          'price': this.data.price.toString(),
          'sumMony': this.data.sumPrice.toString(),
          'id': index,
          'num': addNum.toString()
        };
        console.log(singleDic);
        shopPros.splice(index, 1, singleDic);
        has = true;
      }
    }
    if (!has) {
      var singleDic = {
        'select': false,
        'imgUrl': this.data.imgUrl,
        'title': this.data.title,
        'proid': this.data.proId,
        'id': shopPros.length,
        'price': this.data.price.toString(),
        'sumMony': this.data.sumPrice.toString(),
        'num': this.data.proNum.toString()
      };

      shopPros.push(singleDic);
    }
    wx.setStorageSync('shopCar', shopPros);

    wx.showLoading({
      title: '添加成功',
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

  },



  closeRuleView: function (e) {
    this.setData({ showRule: false });
  },
  buynowbuttom: function (e) {
    var singleDic = {
      'select': false,
      'imgUrl': this.data.imgUrl,
      'title': this.data.title,
      'proid': this.data.proId,
      'id': 0,
      'price': this.data.price.toString(),
      'sumMony': this.data.sumPrice.toString(),
      'num': this.data.proNum.toString()
    };
    console.log(singleDic);
    wx.setStorageSync('buyNowThings', singleDic);

    wx.navigateTo({
      url: '../submiteOrder/submiteOrder',
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
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载


  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    var that = this;
    console.log(wx.getStorageSync('productId'));
    var paraDic =
      {
        'USERS_ID': wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode, 'PRODUCT_ID': wx.getStorageSync('productId')
      };

    util.requestUrl(getApp().globalData.baseUrl + 'prodDetail', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        //图文
        var str1 = res.data.data.detail;

        WxParse.wxParse('article', 'html', str1, that, 20);

        that.setData({ commentsNum: res.data.data.commentCount });
        that.setData({ startTime: res.data.data.startDate });
        that.setData({ endTime: res.data.data.endDate });
        that.setData({ saleCount: res.data.data.saleCount });



        that.setData({ title: res.data.data.name });
        that.setData({ price: res.data.data.price });
        that.setData({ proNumber: res.data.data.totalCount });
        that.setData({ clientAddress: res.data.partner.address });
        that.setData({ clientName: res.data.partner.title });
        that.setData({ clientId: res.data.partner.id });
        that.setData({ clientIcon: res.data.partner.img });
        if (res.data.imgList.length > 0) {
          that.setData({ imgUrls: res.data.imgList });
          var picDic = res.data.imgList[0];
          that.setData({ imgUrl: picDic.img });
        }
        else {
          that.setData({ imgUrls: [] });
        }


        that.setData({ proId: res.data.data.productId });


        var sScore = [];
        sScore.push({ score: res.data.partner.swwg, sTitle: '实物外观' });
        sScore.push({ score: res.data.partner.spzl, sTitle: '商品质量' });
        sScore.push({ score: res.data.partner.fwzl, sTitle: '服务质量' });
        sScore.push({ score: res.data.partner.psxl, sTitle: '配送效率' });
        that.setData({ services: sScore });

        that.jisuanMoney();

        // that.setData({pingjiaScore:});
      }
    });


  },
  jisuanMoney: function () {
    var money = parseInt(this.data.proNum) * parseFloat(this.data.price);
    this.setData({ sumPrice: money });
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