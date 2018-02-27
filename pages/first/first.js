var util = require('../../utils/util.js');
Page({
  data:{
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    city: "定位中",
    hasShops:false,
    shops:[],
    products:[],
    searchText:''
  },
  changProTitle: function () {
    var ay = [];
    for (var index in this.data.products) {
      var dic = this.data.products[index];
      if (dic.fullName.length > 23) {
        var str = dic.fullName.substring(0, 23);
        dic.fullName = str + '...';
      }
      ay.push(dic);
    }

    this.setData({ products: ay });
  },
  jumpdetail: function (e) {
    console.log(e);
    var cate = e.currentTarget.id.substring(0, 1);
    var tagId = e.currentTarget.id.substring(1, 33);
    console.log(tagId);
    if (cate == '0') {
      //商家
      wx.navigateTo({
        url: '../clientdetail/clientdetail?parentid=' + tagId,
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
    }
    else if (cate == '1') {
      //商品
      wx.setStorageSync('productId', tagId)
      wx.navigateTo({
        url: '../prodetail/prodetail',
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
    }
    else if (cate == '2') {
      //资讯
      wx.navigateTo({
        url: '../newsdetail/newsdetail?newsId=' + tagId,
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
    }

  },
  changcity:function(e)
  {
    wx.navigateTo({
      url: '../regions/regions?city='+this.data.city,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  jumptosearchPro:function(e)
  {
    var that = this;
    console.log(this.data.searchText);
wx.navigateTo({
      url: '../prolist/prolist?id='+this.data.searchText,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  bindKeyInput:function(e)
  {
    this.setData({searchText:e.detail.value});
  },
  jumptonextview:function(e){
    wx.navigateTo({
      url: '../prolist/prolist?id='+e.currentTarget.id,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }, 
  jumptoallproduct:function(e){
wx.navigateTo({
      url: '../prolist/prolist?id=1',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
 jumptoorder:function(e)
 {
    wx.navigateTo({
      url: '../orders/orders?all=1',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
 },
 jumptoshops:function(e)
 {
   wx.navigateTo({
     url: '../clientlist/clientlist',
     success: function(res){
       // success
     },
     fail: function(res) {
       // fail
     },
     complete: function(res) {
       // complete
     }
   })

 },
 jumptoshopdetail:function(e)
 {
console.log(e);
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid='+e.currentTarget.id,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
 },

 jumptodetail:function(e)
 {
   wx.setStorageSync('productId', e.currentTarget.id)
  wx.navigateTo({
    url: '../prodetail/prodetail',
    success: function(res){
      // success
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
 },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var code = '';
    var that = this;
    wx.login({
      success: function(res){

                    console.log(res);
          code= res.code; 
          wx.getUserInfo({
          success: function(res){

           util.requestUrl(getApp().globalData.baseUrl+'getSessionKey',
  {
   'code':code,
   'CODE': getApp().globalData.subCode,
   'nickname':res.userInfo.nickName,
   'gender':res.userInfo.gender,
   'avatarUrl':res.userInfo.avatarUrl,
   'province':res.userInfo.province,
   'city':res.userInfo.city,
   'country':res.userInfo.country},function(res){

                         console.log(res);

              if(res.data.status=='200')
              {
                wx.setStorageSync('userInfo',     {'openid':res.data.openid,
  'sessionKey':res.data.sessionKey,
  'avatarUrl':res.data.user.avatarUrl,
  'usersId':res.data.user.usersId,
  'icon':res.data.user.icon})

                that.requestFirstData('370100');
              }
            });


          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
  })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  requestFirstData(city_code)
  {
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'index', { 'CITY_ID': city_code, 'CODE': getApp().globalData.subCode,},function(res){
                if(res.data.status=='200')
                {
  that.setData({imgUrls:res.data.advList});
                  if(res.data.partnerList.length>0)
                  {
                    console.log(res);
                    that.setData({hasShops:true});
                    that.setData({shops:res.data.partnerList});
                  }
that.setData({products:res.data.prodList});
// that.changProTitle();

                }
              });
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    if(wx.getStorageSync('currentCity'))
    {
      var that = this;
    this.setData({city:wx.getStorageSync('currentCity')});
    util.requestUrl(getApp().globalData.baseUrl + 'getCityCode', { 'NAME': this.data.city, 'CODE': getApp().globalData.subCode,},function(res){
                if(res.data.status=='200')
                {
          wx.setStorageSync('cityCode', res.data.code);
            that.requestFirstData(wx.getStorageSync('cityCode'));
                }
              });
    }
    else
    {
      var that = this;
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // succes
          util.requestUrl(getApp().globalData.baseUrl + 'getCityCodeByBd', {
            'CODE': getApp().globalData.subCode,
            'lng': res.latitude,
            'lat': res.longitude
          }, function (res) {
            console.log(res);
            if (res.data.status == '200') {
              wx.setStorageSync('cityCode', res.data.city.code);

              that.setData({ city: res.data.city.name });

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
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: getApp().globalData.appName, // 分享标题
      desc: '', // 分享描述
      path: 'pages/first/first' // 分享路径
    }
  }
})