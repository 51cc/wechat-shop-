var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');

function countdown(that) {

  var EndTime = new Date('2017/09/29 00:00:00');

  var NowTime = new Date();
  

  var second = EndTime.getTime() - NowTime.getTime();

  // var second = that.data.second

  var sText = that.data.sText

  if (second == 0) {
    // console.log("Time Out...");
    that.setData({
      sText: "00:00:00"
    });
    return;
  }
  var time = setTimeout(function () {
    
    var d = 0;
    var h = 0;
    var m = 0;
    var s = 0;
    if (second > 0) {
      d = Math.floor(second / 1000 / 60 / 60 / 24);
      h = Math.floor(second / 1000 / 60 / 60 % 24);
      m = Math.floor(second / 1000 / 60 % 60);
      s = Math.floor(second / 1000 % 60);
    }

    console.log(d+'天:'+h + '小时:' + m + '分:' + s+'秒');
    

    that.setData({
      sText: (d + '天:' + h + '小时:' + m + '分:' + s + '秒')
    });
    countdown(that);
  }
    , 1000)
}
Page({
  data: {
    second: 3000,
    sText: '',
    imgUrls: [],
    oldPrice: 0.0,
    proNum: 1,
    indicatorDots: true,
    autoplay: true,
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
    commentsNum: '',
    isMoreRules: false,//判断是不是多规格  非多规格处理不一样
    selectRulesId: [],//所选规格的ID  数组
    selectIds: '',
    selectRulesName: [],//所选规格的名称 数组
    selectNames: '',
    moreRulesPrice: [],
    moreLastId: '',
    rules: [],
    nodes: '',
    youfei: '',
    xiaoliang: '',
    wpId:'',
    isMianYi: true,//如果是面议 隐藏购买等
    phone: ''//商家电话



  },
  callclient: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    });
  },
  selectTheItem: function (e) {

    // console.log(e.currentTarget.id.substr(32));
    // console.log(e.currentTarget.id.substring(0,32));

    var index = e.currentTarget.id.substr(32);
    var pId = e.currentTarget.id.substring(0, 32);

    var iDic = this.data.rules[index];

    for (var j in iDic.items) {
      var jDic = iDic.items[j];
      if (jDic.id == pId) {
        jDic.selected = true;
      }
      else {
        jDic.selected = false;
      }
      iDic.items.splice(j, 1, jDic);
    }
    this.data.rules.splice(index, 1, iDic);
    this.setData({ rules: this.data.rules });
    this.theRulesId();
  },

  theRulesId: function () {
    for (var i in this.data.rules) {
      var mDic = this.data.rules[i];
      for (var j in mDic.items) {
        var nDic = mDic.items[j];
        if (nDic.selected) {
          this.data.selectRulesId.splice(i, 1, nDic.id);
          this.data.selectRulesName.splice(i, 1, nDic.name);

        }
      }
    }

    this.setData({ selectIds: this.data.selectRulesId.join("_") });
    this.setData({ selectNames: this.data.selectRulesName.join("_") });



    for (var i in this.data.moreRulesPrice) {
      var dic = this.data.moreRulesPrice[i];

      // console.log(dic.standardId);

      // console.log(this.data.selectIds);

      if (dic.standardId == this.data.selectIds) {
        this.setData({ price: dic.price });
        this.setData({ proNumber: dic.stock });
        this.setData({ moreLastId: dic.id }); this.jisuanMoney();
      }
    }


  },




  jumptoclientdetail: function () {
    // console.log('----------------');
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
      url: '../commentsList/commentsList?id=' + this.data.proId,
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

    console.log(this.data.clientId);
    console.log(this.data.clientName);



    var shopPros = wx.getStorageSync('shopCar');


    if (shopPros.length == 0) {
      shopPros = [];
    }

    var mPros = shopPros;

    var has = false;

    for (var index in shopPros) {
      var dic = shopPros[index];
      if (dic.proid == this.data.proId && dic.standid == this.data.moreLastId) {
        var addNum = 0;
        addNum = parseInt(dic.num) + parseInt(this.data.proNum);
        singleDic = {
          'clientId': this.data.clientId,
          'clientName': this.data.clientName,
          'select': false,
          'imgUrl': this.data.imgUrl,
          'title': this.data.title,
          'proid': this.data.proId,
          'price': this.data.price.toString(),
          'sumMony': this.data.sumPrice.toString(),
          'id': index,
          'standid': this.data.moreLastId,
          'standName': this.data.selectNames,
          'num': addNum.toString()
        };
        shopPros.splice(index, 1, singleDic);
        has = true;
      }
    }
    if (!has) {
      var singleDic = {
        'clientId': this.data.clientId,
        'clientName': this.data.clientName,
        'select': false,
        'imgUrl': this.data.imgUrl,
        'title': this.data.title,
        'proid': this.data.proId,
        'id': shopPros.length,
        'standid': this.data.moreLastId,
        'standName': this.data.selectNames,
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
      'clientId': this.data.clientId,
      'clientName': this.data.clientName,
      'standid': '',
      'standName': '',
      'select': false,
      'imgUrl': this.data.imgUrl,
      'title': this.data.title,
      'proid': this.data.proId,
      'id': 0,
      'price': this.data.price.toString(),
      'sumMony': this.data.sumPrice.toString(),
      'num': this.data.proNum.toString()
    };

    if (this.data.isMoreRules) {
      var singleDic = {
        'clientId': this.data.clientId,
        'clientName': this.data.clientName,
        'standid': this.data.moreLastId,
        'standName': this.data.selectNames,
        'select': false,
        'imgUrl': this.data.imgUrl,
        'title': this.data.title,
        'proid': this.data.proId,
        'id': 0,
        'price': this.data.price.toString(),
        'sumMony': this.data.sumPrice.toString(),
        'num': this.data.proNum.toString()
      };
    }
    // console.log('===============');
    // console.log(singleDic);

    wx.setStorageSync('buyNowThings', singleDic);

    wx.navigateTo({
      url: '../submiteOrder/submiteOrder?id=' + 2,
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
  onReady: function () {
    // 生命周期函数--监听页面加载
    // countdown(this);


  },
  onShow: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onLoad: function (options) {
    var that = this;

    this.setData({ wpId:options.id});
    // var productID = '04fb12cf946d43dd9f6a3534b8f97858';

    // console.log(wx.getStorageSync('productId'));
    var paraDic =
      {
        'USERS_ID': wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
        'PRODUCT_ID':options.id //wx.getStorageSync('productId')
      };

    util.requestUrl(getApp().globalData.baseUrl + 'prodlimitDetail', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {

        var timer = setInterval(function () {

          var arr = res.data.data.endDate.split(/[- : \/]/),
            
          enddate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
          
          console.log(enddate);

          var EndTime = new Date(enddate);

            var NowTime = new Date();

            var second = EndTime.getTime() - NowTime.getTime();

            second = second / 1000;

            if (second == 0) {
              dic.time = "00:00:00"
              that.setData({ sText:'00:00:00'});
            }
            else {

              var h = 0;
              var m = 0;
              var s = 0;
              if (second > 0) {
                var h = Math.floor(second / 60 / 60);
                var m = Math.floor((second - h * 60 * 60) / 60);
                var s = Math.floor(second - h * 60 * 60 - m * 60);
              }
              
              that.setData({ sText: h + ':' + m + ':' + s });

              if (h > 24) {
                var d = 0;
                var h = 0;
                var m = 0;
                var s = 0;
                if (second > 0)
                {
                  var d = Math.floor(second / 60 / 60 / 24)
                  var h = Math.floor((second - d * 24 * 60 * 60) / 60 / 60);
                  var m = Math.floor((second - d * 24 * 60 * 60 - h * 60 * 60) / 60);
                  var s = Math.floor(second - d * 24 * 60 * 60 - h * 60 * 60 - m * 60);
                }
                that.setData({ sText: d + '天' + h + ':' + m + ':' + s });
              }
          }
        }, 1000);





        //图文
        var str1 = res.data.data.detail;

        // that.setData({nodes:str1});
        WxParse.wxParse('article', 'html', str1, that, 20);


        that.setData({ commentsNum: res.data.data.commentCount });
        that.setData({ title: res.data.data.name });
        that.setData({ youfei: res.data.data.expenses });
        that.setData({ xiaoliang: res.data.data.buyNum });
        that.setData({ price: res.data.data.price });
        that.setData({ oldPrice: res.data.data.oldPrice });

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


        if (res.data.data.tradeWay == '1') {
          that.setData({ price: '面议' });
          that.setData({ phone: res.data.partner.mobile });

          that.setData({ isMianYi: false });
        }

        //多规格判断-------
        if (res.data.data.isStandard == '1') {

          that.setData({ moreRulesPrice: res.data.standField });
          var bigAy = [];

          for (var i in res.data.standardInfo) {
            var mDic = res.data.standardInfo[i];
            var smallAy = [];
            for (var j in mDic.standardInfoList) {
              var nDic = mDic.standardInfoList[j];
              var nnDic = { 'id': nDic.id, 'name': nDic.name, 'selected': (j == 0 ? true : false) };
              smallAy.push(nnDic);
            }
            bigAy.push({ 'title': mDic.typeName, 'items': smallAy });
          }


          that.setData({ rules: bigAy });
          that.setData({ isMoreRules: true });

          for (var i in that.data.rules) {
            var mDic = that.data.rules[i];
            for (var j in mDic.items) {
              if (j == 0) {
                var nDic = mDic.items[0];
                that.data.selectRulesId.push(nDic.id);
                that.data.selectRulesName.push(nDic.name);
              }
            }
          }
          that.setData({ selectIds: that.data.selectRulesId.join("_") });
          that.setData({ selectNames: that.data.selectRulesName.join("_") });

          for (var i in that.data.moreRulesPrice) {
            var dic = that.data.moreRulesPrice[i];

            // console.log(dic.standardId);

            // console.log(that.data.selectIds);

            if (dic.standardId == that.data.selectIds) {
              that.setData({ price: dic.price });
              that.setData({ proNumber: dic.stock });
              that.setData({ moreLastId: dic.id });
              that.jisuanMoney();
            }
          }


        }





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

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    var that = this;
    return {
      title: this.data.title, // 分享标题
      desc: '', // 分享描述
      path: 'pages/xsqgDetail/xsqgDetail?id=' + that.data.wpId// 分享路径
    }
  }
})