// aaafirst.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

    show:false,
    sheight: 0.0,
    swidth: 0.0,
    newCounponDic:{},
    uiAy:[],
    //搜索类型  0 搜商品  1 搜商家
    searchType:'0',
    //轮播图数据
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    lbtAy: [],

    //搜索
    city: "定位中",
    searchText:'',

    //快捷入口
    kjAy:[
      { 'icon': '../../Asset/wkuaijie/k3.png', 'name': '优惠券','id':'0' },
      { 'icon': '../../Asset/wkuaijie/k1.png', 'name': '卡券', 'id': '1' },
      { 'icon': '../../Asset/wkuaijie/k2.png', 'name': '资讯', 'id': '2' },
      { 'icon': '../../Asset/wkuaijie/k5.png', 'name': '视频', 'id': '3' },
      { 'icon': '../../Asset/wkuaijie/k8.png', 'name': '拼团', 'id': '4' },
      { 'icon': '../../Asset/wkuaijie/k4.png', 'name': '限时抢购', 'id': '5' },
      { 'icon': '../../Asset/wkuaijie/k6.png', 'name': '全部商品', 'id': '6' },
      { 'icon': '../../Asset/wkuaijie/k7.png', 'name': '全部商家', 'id': '7' }],

    //推荐分类1  推荐分类3  推荐分类4
    flAy: [],
    //推荐分类2
    flAy2: ['#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd', '#f685c3', '#ff755e', '#f5be40', '#9fd468', '#48cfae', '#4fc0e8', '#ac92eb', '#aab2bd',],
    
    //推荐商品
    products: [],
    //拼团活动
    ptAy:[],
    //限时抢购
    xsAy: [
    ],
    //推荐商家
    tjAy:[],
    //推荐商家1
    tjAy1:[],
    //优惠券1   优惠券2
    yhqAy:[],
    //卡券
    kqAy:[],
    //资讯1
    zxAy:[
    ],
    
    //视频
    spAy:[],
    //广告图
    ggtAy:[],
    //预约
    yuyueAy:[],
    //活动
    huodongAy:[] 


    
  },
  close:function(){
    this.setData({show:false});
  },
  changcity:function(e){
    wx.navigateTo({
      url: '../regions/regions',
    })
  },
  //轮播图跳转
  jumpToLBTDetail:function(e){
    console.log(e);
    var tagId = e.currentTarget.id;

    if (e.currentTarget.dataset.id=='0')
    {
      wx.navigateTo({
        url: '../clientdetail/clientdetail?parentid='+ tagId,
      })
    }
    else if (e.currentTarget.dataset.id == '1')
    {
      wx.navigateTo({
        url: '../prodetail/prodetail?id='+ tagId,
      })
    }
    else if (e.currentTarget.dataset.id == '2') 
    {
      wx.navigateTo({
        url: '../newsdetail/newsdetail?id='+ tagId,
      })
      // wx.navigateTo({
      //   url: '../zixundetail/zixundetail?id =' + tagId,
      // })
    }
  },


  //搜索
  //输入文字
  bindKeyInput: function (e) {
    this.setData({ searchText: e.detail.value });
  },
  startsearch:function(){
    if (this.data.searchType=='1')
    {
      wx.navigateTo({
        url: '../clientlist/clientlist',
      })
    }
  },
  //搜索商品
  jumptosearchPro: function (e) {
    var that = this;
    console.log(this.data.searchText);
    wx.navigateTo({
      url: '../prolist/prolist?id=' + this.data.searchText,
    })
  },


  //快捷入口跳转
  jumptoWraper:function(e){
    var cId = e.currentTarget.id;
    if(cId=='0')
    {
      wx.navigateTo({
        url: '../youhuiquancenter/youhuiquancenter',
      })
    }
    else if(cId=='1')
    {
      wx.navigateTo({
        url: '../kaquan/kaquan',
      })
    }
    else if (cId == '2') 
    {
      wx.navigateTo({
        url: '../zixunlist/zixunlist',
      })
    }
    else if (cId == '3') 
    {
      wx.navigateTo({
        url: '../zixunlist/zixunlist?type=' + '1',
      })
    }
    else if (cId == '4') 
    {
      wx.navigateTo({
        url: '../team-list/team-list',
      })
    }
    else if (cId == '5') 
    {
      wx.navigateTo({
        url: '../xsqglist/xsqglist',
      })
    }
    else if (cId == '6') 
    {
      wx.navigateTo({
        url: '../prolist/prolist?id=1',
      })
    }
    else if (cId == '7') 
    {
      wx.navigateTo({
        url: '../clientlist/clientlist',
      })
    }
  },

  //产品分类跳转
  jumptoFenlei:function(e){
    wx.setStorageSync('isFirstByCatId', '9999');
    wx.navigateTo({
      url: '../prolist/prolist?id=' + e.currentTarget.id,
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

  //产品详情跳转
  jumptoproductdetail:function(e){
    wx.navigateTo({
      url: '../prodetail/prodetail?id='+e.currentTarget.id,
    })
  },
  jumptoallproduct:function(e){
    wx.navigateTo({
      url: '../prolist/prolist?id=1',
    })
  },




  //拼团方法
  lookTeamDetail: function (e) {
    wx.navigateTo({
      url: '../team-detail/team-detail?id=' + e.currentTarget.id
    });
  },
  jumptopintuan: function () {
    wx.navigateTo({
      url: '../team-list/team-list',
    })
  },



  //限时抢购
  jumptoxsqgDetail: function (e) {
    wx.navigateTo({
      url: '../xsqgDetail/xsqgDetail?id=' + e.currentTarget.id,
    })
  },
  jumptoxsqg: function () {
    wx.navigateTo({
      url: '../xsqglist/xsqglist',
    })
  },



  //店铺街
  jumptodpj:function(){
    wx.navigateTo({
      url: '../clientlist/clientlist',
    })
  },
  jumptoclientdetail:function(e){
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid=' + e.currentTarget.id,
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


  //优惠券1  优惠券2
  jumptoyouhuiquancenter:function(){
    wx.navigateTo({
      url: '../youhuiquancenter/youhuiquancenter',
    })
  },
  //领取优惠券
  lingquyouhuiquan:function(){
    wx.showLoading({
      title: '领取中',
    })

    var that = this;

    util.requestUrl(getApp().globalData.baseUrl + 'userDoleCoupon', {
      'CODE': getApp().globalData.subCode,
      'fenlei':'new',
      'USER_ID': wx.getStorageSync('userInfo').usersId, 
      'COUPON_ID': this.data.newCounponDic.id
    }, function (res) {
      
      wx.hideLoading();

      that.setData({show:false});
      
      wx.showModal({
        title: '领取成功',
        content: '可到我的优惠券列表查看',
        showCancel:false,
        confirmText:'去使用',
        confirmColor:'#444444',
        success: function (res) {
          if (res.confirm) {
            
          } 
        }
      })

    });



  },
// 买单
  jumptomaidan:function(){

    wx.navigateTo({
      url: '../maidan/maidan',
    })
  },

  //卡券
  jumptokq:function(){
    wx.navigateTo({
      url: '../kaquan/kaquan',
    })
  },
  callTheClient: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id,
    })
  },
  openMap:function(e){
    var dic = this.data.kqAy[e.currentTarget.id];
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
      'card_id': e.currentTarget.id, 'CODE': getApp().globalData.subCode,
    }, function (res) {
      console.log(res.data.cardExt);
      if (res.data.status == '200') {

        wx.addCard({
          cardList: [{
            cardId: e.currentTarget.id,
            cardExt: res.data.cardExt
          }],
          success: function (res) {
            console.log(res.cardList);
          },
          complete: function (res) {
            console.log(res);
          }
        })

      }
    });
  },
// 资讯

  jumptozxlist:function(){
    wx.navigateTo({
      url: '../zixunlist/zixunlist',
    })
  },
  jumptonewsdetail:function(e){

    wx.navigateTo({
      url: '../newsdetail/newsdetail?id=' + e.currentTarget.id,
    })
  },
  //广告图
  openwebview:function(e){
    var dic = this.data.ggtAy[e.currentTarget.id];
    console.log(dic);
    var url = dic.url;//"http://www.baidu.com"//dic.url;
    if (url!=undefined && url!="" && url!=null){
      var fdStart = url.indexOf("https://");
      if (fdStart == 0) {
        wx.navigateTo({
          url: '../awebview/awebview?url=' + url,
        })
      }
     
    }
  },

  //视频列表
  jumptosp:function(){
    wx.navigateTo({
      url: '../zixunlist/zixunlist?type='+'1',
    })
  },
  jumptovideodetail:function(e){
    wx.navigateTo({
      url: '../zixundetail/zixundetail?id=' + e.currentTarget.id,
    })
  },
//进入砍价列表
  jumptokanjia:function(){
    wx.navigateTo({
      url: '../kanjialist/kanjialist',
    })
  },
// 进入邀请
  jumptoyaoqing:function(){
    wx.navigateTo({
      url: '../yaoqing/yaoqing',
    })
  },
  // 预约详情
  jumptoyuyuedetail:function(e){
    wx.navigateTo({
      url: '../yynewdetail/yynewdetail?yId=' + e.currentTarget.id,
    })
  },
  // 进入预约列表
  jumptoallyuyue:function(){
    wx.navigateTo({
      url: '../yynewlist/yynewlist',
    })
  },

// 活动详情
  jumptohuodongdetail:function(e){
    wx.navigateTo({
      url: '../huodongdetail/huodongdetail?hId=' + e.currentTarget.id,
    })
  },
// 活动列表
  jumptoallhuodong:function(){
    wx.navigateTo({
      url: '../huodonglist/huodonglist',
    })
  },
//返回顶部
  jumptotop:function(){
    console.log('scrollview to top');
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  // 进入话题圈
  jumptohuati: function () {
    wx.navigateTo({
      url: '../huatiquan/huatiquan',
    })
  },
  requestFirstData(city_code) {
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'diyinit', 
    { 'CITY_ID': city_code, 'CODE': getApp().globalData.subCode,}, function (res) {
      if (res.data.status == '200') {

        wx.hideLoading();

        console.log(res);

        var mAy = [];
        for (var index in that.data.cateMiddles) {
          var dic = that.data.cateMiddles[index];
          mAy.push(dic);
        }

        for (var index in res.data.cateList) {
          var dic = res.data.cateList[index];
          mAy.push(dic);
        }
        that.setData({ cates: mAy });

// 轮播图
        that.setData({ lbtAy: res.data.advList });
//分类
        that.setData({ flAy:res.data.cateList});
//推荐商品
        that.setData({ products: res.data.prodList });
//推荐商家
        that.setData({ tjAy: res.data.partnerList});
//推荐商家1
        that.setData({ tjAy1: res.data.plList });
//拼团活动
        that.setData({ ptAy: res.data.teamList });
//资讯活动
        that.setData({zxAy:res.data.newsList});
//视频资讯
        that.setData({spAy:res.data.videoList});
//限时抢购
        that.setData({ xsAy: res.data.xsProdList });
//卡券
        that.setData({ kqAy: res.data.cardList});
//广告图
        that.setData({ ggtAy:res.data.imgList});
//推荐预约
        that.setData({ yuyueAy: res.data.appoList });
// 推荐活动
        that.setData({ huodongAy: res.data.actList});
//优惠券
        that.setData({ yhqAy:res.data.couponList});   
           
        var timer = setInterval(function () {

          for (var index in that.data.xsAy) {

            var dic = that.data.xsAy[index];

            dic.time = "00:00:00";


            var arr = dic.endDate.split(/[- : \/]/),
            
            enddate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);

            var EndTime = new Date(enddate);

            var NowTime = new Date();

            var second = EndTime.getTime() - NowTime.getTime();
           
            second = second / 1000;

            if (second == 0) {
              dic.time = "00:00:00"
              that.setData({ xsAy: that.data.xsProducts });
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
              dic.time = h + ':' + m + ':' + s;

              if (h > 24) {
                var d = 0;
                var h = 0;
                var m = 0;
                var s = 0;
                if (second > 0) {
                  var d = Math.floor(second / 60 / 60 / 24)
                  var h = Math.floor((second - d * 24 * 60 * 60) / 60 / 60);
                  var m = Math.floor((second - d * 24 * 60 * 60 - h * 60 * 60) / 60);
                  var s = Math.floor(second - d * 24 * 60 * 60 - h * 60 * 60 - m * 60);
                }

                dic.time = d + '天' + h + ':' + m + ':' + s;
              }




              that.data.xsAy.splice(index, 1, dic);

              that.setData({ xsAy: that.data.xsAy });

            }
          }
        }, 1000);





      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;


    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });



    // wx.showLoading({
    //   title: '加载中..',
    // });

    // that.requestFirstData('370100');


   
    util.requestUrl(getApp().globalData.setUrl+'getAppData',
      { 'orderNo': getApp().globalData.subCode}, 
      function (res) {
        
        console.log(res);

        that.requestFirstData('370100');
        
        that.setData({uiAy:res.data});
    });




    util.requestUrl(getApp().globalData.setUrl + 'getKjrkSearch',
      { 'orderNo': getApp().globalData.subCode},
      function (res) {
        console.log(res);
        that.setData({ searchType: res.data.searchType });
        that.setData({ kjAy: res.data.kjrk });
      });







  var code = '';
  var nickName = '';
    wx.login({
      success: function (res) {

        console.log(res);
        code = res.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            nickName = res.userInfo.nickName;
            util.requestUrl(getApp().globalData.baseUrl + 'getSessionKey',
              {
                'code': code,
                'encryptedData': res.encryptedData,
                'iv': res.iv,
                'CODE': getApp().globalData.subCode,
                'nickname': res.userInfo.nickName,
                'gender': res.userInfo.gender,
                'avatarUrl': res.userInfo.avatarUrl,
                'province': res.userInfo.province,
                'city': res.userInfo.city,
                'country': res.userInfo.country
              }, function (res) {

                console.log(res);

                if (res.data.status == '200') {
                  wx.setStorageSync('userInfo', {
                    'nickname':nickName,
                    'openid': res.data.openid,
                    'sessionKey': res.data.sessionKey,
                    'avatarUrl': res.data.user.avatarUrl,
                    'usersId': res.data.user.usersId,
                    'icon': res.data.user.icon
                  })

                  //newCouponCount 0显示新人优惠券
                  if (res.data.newCouponCount==0)
                  {
                    that.setData({ show:true});
                  }
                  else
                  {
                    that.setData({ show:false});
                  }

                  that.setData({ newCounponDic: res.data.newCoupon[0]});
                  that.requestFirstData('370100');
                }
              });


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



    // wx.setStorageSync('userInfo', {
    //   'icon':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517545693436&di=6ebc3a530c7e04d742c5dea85d01af83&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fd50735fae6cd7b8965ffe6c60f2442a7d8330ee0.jpg',
    //   'nickname':'强爷爷',
    //   'usersId': "18cd02cd3e814f6ebd103b8b91ec6f6f",//res.data.user.usersId,
    // })



  },
  onShow:function(){

    if (wx.getStorageSync('currentCity')) {
      var that = this;
      var str = wx.getStorageSync('currentCity');
      if (wx.getStorageSync('currentCity').length >= 5) {

        str = wx.getStorageSync('currentCity').slice(0, 4);
      }
      that.setData({ city: str });

      util.requestUrl(getApp().globalData.baseUrl + 'getCityCode', { 'NAME': this.data.city, 'CODE': getApp().globalData.subCode, }, function (res) {
        if (res.data.status == '200') {
          wx.setStorageSync('cityCode', res.data.code);
          that.requestFirstData(wx.getStorageSync('cityCode'));
        }
      });
    }
    else {

      var that = this;
      wx.getLocation({
        type: 'wgs84', 
        // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {

          // succes
          // util.requestUrl(getApp().globalData.baseUrl + 'getCityCodeByBd', {
          //   'CODE': getApp().globalData.subCode,
          //   'lng': res.latitude,
          //   'lat': res.longitude
          // }, function (res) {
          //   console.log(res);
          //   if (res.data.status == '200') {
          //     wx.setStorageSync('cityCode', res.data.city.code);

          //     var str = res.data.city.name;
          //     if (res.data.city.name.length >= 5) {

          //       str = res.data.city.name.slice(0, 4);

          //     }
          //     that.setData({ city: str });
          //     wx.setStorageSync('currentCity', str);
          //     that.requestFirstData(wx.getStorageSync('cityCode'));
          //   }

          // });


          util.requestUrl('https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude +'&key=QMABZ-W2ZRP-IV2DW-VE65F-7JLD3-TKBLS', {
          
          }, function (res) {
            // console.log('===+++====');
            // console.log(res);
            // console.log(res.data.result.address_component.city);

            // console.log(res.data.result.ad_info.city_code);

            if (res.data.status == '0') {
              var citycode = res.data.result.ad_info.city_code.substring(3)
              console.log(citycode);
              wx.setStorageSync('cityCode', citycode);

              var str = res.data.result.address_component.city;
              
              // console.log(str);

              if (str.length >= 5) {

                str = res.data.result.address_component.city.slice(0, 4);

              }

              that.setData({ city: str });
              
              wx.setStorageSync('currentCity', str);
              
              that.requestFirstData(wx.getStorageSync('cityCode'));
            }

          });






          


        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: getApp().globalData.appName, // 分享标题
      desc: '', // 分享描述
      path: 'pages/aaafirst/aaafirst' // 分享路径
    }
  }
})