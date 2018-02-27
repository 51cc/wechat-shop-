import Shake from "../../components/shake/shake.js"
var util = require('../../utils/util.js');
Page({
  data: {

    kanjiatishi:false,//查看砍价的金额
    cgkddj:false,//是否砍成功啦
    isSelf:false,
    hasKanGuo: false,
    isKanGuo: false,

    start:true,
   
    stype: 1,//1  我也玩  转发的时候传递自己的ID也就是myselfId.   2  帮转发   转发的时候传递对方的ID也就是friendId
    sheight: 0.0,
    swidth: 0.0,
    proid:'',
    showMask:true,
    mDic:{},
    kMDic:{},
    myselfId:'',
    friendName:'',
    moneyId:'',
    friendId:''
  },
  chakan:function(){
    
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'bargainPrice',
      {
        'code': getApp().globalData.subCode,
        'productid': this.data.proid,
        'friendid': this.data.friendId,//wx.getStorageSync('userInfo').usersId,
        'userId': this.data.myselfId
      }, function (res) {
        console.log(res);
        that.setData({ showMask: false });
        if (res.data.status == '200') {

          that.setData({ kanjiatishi: false});
          that.setData({ isKanGuo:true});

          that.setData({ kMDic: res.data.FriendBargain });

          that.shake.isStart = true

        }
      });
    
  },
  woyewan:function(){
    console.log('我要玩');
    this.setData({ stype:1});

    wx.navigateTo({
      url: '../kanjiadetail/kanjiadetail?kId=' + this.data.proid,
    })

  },
  wobangzhuan:function(){
    console.log('我帮转');

    this.setData({ stype:2});
  },
  hiddenTheMask:function(){
    that.setData({ kanjiatishi: false });
    that.setData({ isKanGuo: false });
    that.setData({ hasKanGuo: false });
    that.setData({ isSelf: false });
    that.setData({ cgkddj: false });
    this.setData({ showMask: true });

  },
  requestProdetailId:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    util.requestUrl(getApp().globalData.newBaseUrl + 'getBargainDetail',
      {
        'code': getApp().globalData.subCode,
        'id': that.data.proid,
        'userId': wx.getStorageSync('userInfo').usersId
      }, function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          that.setData({});
          that.setData({ mDic: res.data.bargainDetail });
        }

      });
  },
  getKanJiaPrice:function(){

    var that = this;
    
    util.requestUrl(getApp().globalData.newBaseUrl + 'getRandomPrice',
      {
        'code': getApp().globalData.subCode,
        'productid': this.data.proid,
        'friendid': this.data.friendId,//wx.getStorageSync('userInfo').usersId,
        'userId':this.data.myselfId
      }, function (res) {

        console.log(res);

        wx.hideLoading();

        that.shake = new Shake(that, {
          shakeThreshold: 100, //阈值
          callback: () => {

            that.shake.isStart = true

            if (res.data.status == '200') {

              that.setData({ kanjiatishi: true });
            }
            else if (res.data.status == '202') {
              //已经砍过
              that.setData({ kanjiatishi: false });
              that.setData({ isKanGuo: false });
              that.setData({ hasKanGuo: true });
              that.setData({ isSelf: false });
              that.setData({ cgkddj: false });
              that.setData({ showMask: false });

            }
            else if (res.data.status == '203') {
              //快点去邀请好友帮您砍价吧！自己给自己砍
              that.setData({ kanjiatishi: false });
              that.setData({ isKanGuo: false });
              that.setData({ hasKanGuo: false });
              that.setData({ isSelf: true });
              that.setData({ cgkddj: false });
              that.setData({ showMask: false });

            }
            else if (res.data.status == '204') {
              //谢谢您，好友已经砍价成功啦！ 
              that.setData({ kanjiatishi: false });
              that.setData({ isKanGuo: false });
              that.setData({ hasKanGuo: false });
              that.setData({ isSelf: false });
              that.setData({ cgkddj: true });
              that.setData({ showMask: false });

            }

          }
        })

        

      });
   
  },
  onLoad(options) {

    console.log('-------' + options.proid);

    wx.showLoading({
      title: '加载中',
    })

    //砍价商品的ID
    this.setData({ proid: options.proid });
    //帮助的谁砍价的用户ID   比如李来源发起的砍价这个ID就是李来源的
    this.setData({ friendId: options.userId});

    this.setData({ friendName:options.name});
    var that = this;

    this.requestProdetailId();

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000',
    })


    var code = '';
    var nickName = '';
    wx.login({
      success: function (res) {

        // console.log(res);
        code = res.code;
        wx.getUserInfo({
          success: function (res) {
            // console.log(res);
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

                // console.log(res);

                if (res.data.status == '200') {


                  wx.setStorageSync('userInfo', {
                    'nickname': nickName,
                    'openid': res.data.openid,
                    'sessionKey': res.data.sessionKey,
                    'avatarUrl': res.data.user.avatarUrl,
                    'usersId': res.data.user.usersId,
                    'icon': res.data.user.icon
                  })

                  that.setData({ myselfId: res.data.user.usersId });

                  that.getKanJiaPrice();

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







    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    console.log(this.data.sheight);
    console.log(this.data.swidth);
    


    
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var sId = '';
    if(this.data.stype==1)
    {
      sId = this.data.myselfId;
    }
    else if(this.data.stype==2)
    {
      sId = this.data.friendId;
    }

    console.log(sId);

    return {
      title: getApp().globalData.appName, // 分享标题
      desc: '帮忙砍一刀--', // 分享描述
      path: 'pages/shake/shake?proid=' + this.data.proid + '&userId=' + wx.getStorageSync('userInfo').usersId + '&name=' + wx.getStorageSync('userInfo').nickname// 分享路径
    }
  },


  onReady () {
    console.log("onReady")    
  }
  
})