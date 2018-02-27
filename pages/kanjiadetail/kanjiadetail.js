var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kId:'',
    partner:{},
    stimer:'',
    mDic:{},
    scrolltop:0,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showTwo:true,
    animationData: {},

    friendAy: []
  },

  jumptodangqianjiagemai:function(){
// 当前价格购买
    var singleDic = {
      'yunfei': 0,
      'clientId': this.data.partner.id,
      'clientName': this.data.partner.title,
      'standid': '',
      'standName': '',
      'select': false,
      'imgUrl': this.data.imgUrls[0].img,//mDic.icon,
      'title': this.data.mDic.name,
      'proid': this.data.mDic.id,
      'id': 0,
      'price': this.data.mDic.presentprice.toString(),
      'sumMony': this.data.mDic.presentprice.toString(),
      'num': 1
    };

    wx.setStorageSync('buyNowThings', singleDic);

    wx.navigateTo({
      url: '../submiteOrder/submiteOrder?id=' + 2+'&isKj=1',
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
  yaoqing:function(){
    wx.navigateTo({
      url: '../shake/shake?proid=' + this.data.kId + '&userId=' + wx.getStorageSync('userInfo').usersId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 

    this.setData({ kId:options.kId});

    console.log(options.kId);

    this.requestData();
  },


  requestData: function () {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(wx.getStorageSync('userInfo').usersId );

    util.requestUrl(getApp().globalData.newBaseUrl + 'getBargainDetail',
      { 
      'code': getApp().globalData.subCode,
      'id':that.data.kId,
      'userId': wx.getStorageSync('userInfo').usersId }, function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {
          that.setData({ mDic:res.data.bargainDetail});

          that.setData({ partner: res.data.partner});

          that.setData({ friendAy: res.data.bargainDetail.bqbargains});

          that.setData({ imgUrls: res.data.bargainDetail.bqImageList});

          var str1 = res.data.bargainDetail.detail;

          WxParse.wxParse('article', 'html', str1, that, 20);
          
          that.gundongView();
          if (res.data.bargainDetail.presentprice == res.data.bargainDetail.lowestPrice)
          {
            that.setData({ showTwo:false});

          }
          that.getJinDuTiao(res.data.bargainDetail.oldPrice, res.data.bargainDetail.presentprice, res.data.bargainDetail.lowestPrice);
        }

      });

  },
// 进度条
  getJinDuTiao:function(oldPrice,dangqianJia,diJia)
  {

    var pcent = (oldPrice - dangqianJia)/(oldPrice-diJia);
    

    console.log('pcent');
    console.log(pcent);

    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });
    console.log(res.windowWidth);
    console.log(res.windowHeight);

    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。  
    cxt_arc.setLineWidth(10 * (res.windowHeight / 603.0));
    cxt_arc.setStrokeStyle('#f5f5f5');
    cxt_arc.setLineCap("round")
    cxt_arc.moveTo(10, 10)
    cxt_arc.lineTo(350 * (res.windowWidth / 375.0), 10)
    cxt_arc.stroke();//对当前路径进行描边 
    cxt_arc.beginPath();//开始一个新的路径  

    if(pcent>0)
    {
      cxt_arc.setLineWidth(10 * (res.windowHeight / 603.0));
      cxt_arc.setStrokeStyle('#7fb941');
      cxt_arc.setLineCap('round')
      cxt_arc.beginPath();//开始一个新的路径  
      cxt_arc.moveTo(10, 10)
    // cxt_arc.lineTo(350 * 0.8 * (res.windowWidth / 375.0), 10)
      cxt_arc.lineTo(350*pcent * (res.windowWidth / 375.0), 10)
    }
    
    cxt_arc.stroke();//对当前路径进行描边  
    cxt_arc.draw();  
  },

  //滚动部分
  gundongView:function(){
    var that = this;

    var i = 0;
    var j = 0;
    var count = this.data.friendAy.length;

    if (count > 4) {

      count = count - 4;

      var timer = setInterval(function () {

        if (count > j) {

          if (i == count) {
            j = i;
          }


          i++;
        }


        var ay = that.data.friendAy;

        var b = ay.shift();

        ay.splice(ay.length, 0, b);

        // console.log(ay);

        that.setData({ friendAy: ay });


      }, 1000);

      this.setData({ stimer: timer });
    }
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

    clearInterval(this.data.stimer);
      
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

    //需要传递  砍价商品的id和发起用户的userid
    return {
      title:getApp().globalData.appName, // 分享标题
      desc: '帮忙砍一刀--', // 分享描述
      path: 'pages/shake/shake?proid=' + this.data.kId + '&userId=' + wx.getStorageSync('userInfo').usersId + '&name=' + wx.getStorageSync('userInfo').nickname // 分享路径
    }
  }
})