// pages/yaoqingyouli/yaoqingyouli.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mDic:{},
    hasData:false,
    isReceive:true,
    yname:'',
    yId:'',
    inviteId:'',
    startTime:'',
    endTime:'',

    bId:'',
    sheight: 0.0,
    swidth: 0.0,
    hasLingQu:false
  },
  requestInfo:function(sname,sId){

    wx.showLoading({
      title: '加载中',
    })


    var that = this;
    var paraDic = {
      'code': getApp().globalData.subCode,
      'inviteId': this.data.inviteId,
      'userName':this.data.yname,
      'userId':this.data.yId,
      'suserId':sId,
      'suserName':sname
    };
    console.log(paraDic);

    util.requestUrl(getApp().globalData.newBaseUrl + 'addInviteNote', paraDic, function (res) {
      console.log(res);
      
      wx.hideLoading();

      if (res.data.status == '200') {

        that.setData({ hasData:true});

        that.setData({ mDic: res.data.data });

        that.setData({ startTime: res.data.startTime});
        that.setData({endTime:res.data.endTime});
        that.setData({ isReceive: res.data.isReceive});
        
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    this.setData({ inviteId: options.actId});
    this.setData({ yname: options.name });
    this.setData({ yId: options.userId });

    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })

    var that = this;
    var paraDic = {
      'code': getApp().globalData.subCode,
      'userId': wx.getStorageSync('userInfo').usersId,
    };


    var nickName = '';
    var code = '';


    util.requestUrl(getApp().globalData.newBaseUrl + 'inviteIsStop', paraDic, function (res) { 

      if (res.data.status == '200') {

        if (res.data.data.isstop == '0') {
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
                          'nickname': nickName,
                          'openid': res.data.openid,
                          'sessionKey': res.data.sessionKey,
                          'avatarUrl': res.data.user.avatarUrl,
                          'usersId': res.data.user.usersId,
                          'icon': res.data.user.icon
                        })

                        if (res.data.user.usersId == options.userId) {
                          wx.redirectTo({
                            url: '../yaoqing/yaoqing',
                          })
                        }

                        that.setData({ bId: res.data.user.usersId });
                        that.requestInfo(nickName, res.data.user.usersId);


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

        }
        else
        {
          wx.showModal({
            title: '提示',
            content: '活动结束',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          })
        }

      }
    });




    


  },
  lingqu:function(e){
    var that = this;
    var paraDic = {
      'code': getApp().globalData.subCode,
      'inviteId': this.data.inviteId,
      'userId': this.data.bId,
      'couponId':this.data.mDic.id
    };
    console.log(paraDic);

    util.requestUrl(getApp().globalData.newBaseUrl + 'getCoupon', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        that.setData({ isReceive: true });
      }
    });

  },

  jumptoproList:function(e){
    wx.navigateTo({
      url: '../prolist/prolist?id=1',
    })
  },
  jumptoyq:function(e){
    wx.navigateTo({
      url: '../yaoqing/yaoqing',
    })
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
  
  }
})