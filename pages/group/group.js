// group.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isself:false,
    state:'1',//这个是一个状态 1是从一键拼团进入代表自己开团  2是从去拼团进入表示加入现有的团购活动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      'state':options.state,
      'teamid': options.teamid,
      'productid': options.productid,
    });
    // this.setData({
    //   'state':1,
    //   'teamid': '5837010a-a01d-11e7-9a96-f46d0452e594',
    //   'productid': '893bf1f520aa4c09b600b574f7f70477'
    // });
    var that = this;
    var code = wx.getStorageSync('code');
    var url = wx.getStorageSync('url');
    
    var param = {
      'code': getApp().globalData.subCode,
      'teamid': this.data.teamid,
      'productid': this.data.productid
    };
    util.requestUrl(getApp().globalData.newBaseUrl + 'getShareData', param, function (res) {
      console.log(res.data);
      if (res.data.flag) {
        that.setData({
          'zsTu': res.data.zsTu,
          'product':res.data.product,
          'team':res.data.team,
          'teamOrder': res.data.teamOrder, 
          'daojishi': res.data.daojishi, 
        });
        
        WxParse.wxParse('article', 'html', res.data.zsTu.detail, that, 20);
      }
    });

    wx.login({
      success: function (res) {
     var  wechatCode = res.code;
        console.log('wechatCode', wechatCode);

        wx.getUserInfo({
          success: function (res) {
            console.log('登入注册成功', res);
            wx.setStorageSync("userInfo", res.userInfo);
            util.requestUrl(getApp().globalData.baseUrl + 'getSessionKey', {
              'code': wechatCode,
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
                // wx.setStorageSync('userInfo', {
                //   'sessionKey': res.data.user.id,
                //   'avatarUrl': res.data.user.avatarUrl,
                //   'usersId': res.data.user.id,
                //   'icon': res.data.user.icon,
                //   'nickname': res.data.user.nickname
                // });

                wx.setStorageSync('userInfo', {
                  'openid': res.data.openid,
                  'sessionKey': res.data.sessionKey,
                  'avatarUrl': res.data.user.avatarUrl,
                  'usersId': res.data.user.usersId,
                  'icon': res.data.user.icon
                })
                // if (that.data.team.openUserId == res.data.user.usersId)
                // {
                //   that.setData({isself:true});
                // }
                for (var index in that.data.teamOrder)
                {
                  var s = that.data.teamOrder[index];
                  if (s.user_id == res.data.user.usersId)
                  {
                    that.setData({isself:true});
                  }

                }
                // wx.setStorageSync('userId', res.data.user.id);
              }
            });
          },
          fail: function (err) {
            console.log("登入注册失败", err);
          }
        });
      }
    });
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

  //点击参与活动
  buyProduct : function(){
    var buyNowThings = [];
    var product = {};
    product.product = this.data.product;
    product.productprice = this.data.product.teamprice;
    product.proNum = 1;
    product.sumPrice = this.data.product.teamprice;
    product.idStr = '';
    buyNowThings.push(product);
    wx.setStorageSync('buyNowThings', buyNowThings);
    wx.navigateTo({
      url: '../group-order/group-order?id=' + this.data.teamid
    });
  },

  //邀请好友参团
  shareTeam : function(){
    this.onShareAppMessage();
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
    var teamid = this.data.teamid;
    var productid = this.data.productid;
    return {
      title: this.data.product.name+' 团购活动分享',
      path: 'pages/group/group?state=2&teamid=' + teamid + "&productid=" + productid
    }
  }
})