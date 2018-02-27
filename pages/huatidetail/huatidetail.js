// pages/huatidetail/huatidetail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dId:'',
    parentid: '',
    parentuserid: '',
    parentusername: '',

    commentContent:'',
    hId:'',
    hfId:'',// 999 回复整个   888 回复回复用户  777回复一级用户
    mDic:{},
  //   kk: '2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎'+
  // '2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎2010年注册于法国首都巴黎',
    ismianze:false,
    isfabu:false,
    isdelpl:false,
    isshade:false,
    isshade1:false,
    // images: [{ img: '../../Asset/add.png' }, { img: '../../Asset/add.png' }]
  },
  requesQuanDara: function (hid) {

    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.newBaseUrl + 'topiceDetial',
      {
        'id':hid,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {
          
          that.setData({mDic:res.data.data});

          var str1 = res.data.data.disclaimer.content;

          // that.setData({nodes:str1});
          WxParse.wxParse('article', 'html', str1, that, 20);
        }
        else {

        }

        wx.hideLoading();

      });
  },
  zan: function (e) {
    var that = this;

    wx.showLoading({
      title: '加载中',
    })

    util.requestUrl(getApp().globalData.newBaseUrl + 'postCollect',
      {
        'topicId': e.currentTarget.id,
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        console.log(res);

        if (res.data.status == '200') {
          that.requesQuanDara(that.data.hId);
        }
        else {

        }

        wx.hideLoading();

      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({ hId:options.hid});

    this.requesQuanDara(options.hid);
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '我的话题圈',
      path: '/pages/huatidetail/huatidetail?hid=' + e.target.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  oNbindinputTap:function(e){

    this.setData({ commentContent:e.detail.value});
    console.log(e);
  },
  jumptopl:function(e){
    console.log(e);
    if (wx.getStorageSync('userInfo').usersId != e.currentTarget.dataset.puserid)
    {
      this.setData({
        isfabu: true,
        hfId:e.currentTarget.id,
        dId: e.currentTarget.dataset.did,
        parentid: e.currentTarget.dataset.tid,
        parentuserid: e.currentTarget.dataset.puserid,
        parentusername: e.currentTarget.dataset.pusername,
        isshade1: true
      });
    }
    else
    {

    }

  },

  bindsubmit:function(){
// 发送内容
    var that = this;

    wx.showLoading({
      title: '加载中',
    })


    if (this.data.commentContent.length>0)
    { 
      var paraDic = {};

      if(this.data.hfId=='999')
      {
        // 回复整个内容
        paraDic = {
          'username': wx.getStorageSync('userInfo').nickname,
          'userimg': wx.getStorageSync('userInfo').icon,
          'content': this.data.commentContent,
          'topicId': this.data.hId,
          'parentid':'',
          'parentuserid':'',
          'parentusername':'',
          'code': getApp().globalData.subCode,
          'userid': wx.getStorageSync('userInfo').usersId,
          };
      }
      else if (this.data.hfId =='888')
      {
        paraDic = {
          'pparentid':this.data.parentid,
          'username': wx.getStorageSync('userInfo').nickname,
          'userimg': wx.getStorageSync('userInfo').icon,
          'content': this.data.commentContent,
          'topicId': this.data.hId,
          'parentid': '',
          'parentuserid': this.data.parentuserid,
          'parentusername': this.data.parentusername,
          'code': getApp().globalData.subCode,
          'userid': wx.getStorageSync('userInfo').usersId,
        };
      }
      else if (this.data.hfId == '777')
       {
        paraDic = {
          'pparentid': this.data.parentid,
          'username': wx.getStorageSync('userInfo').nickname,
          'userimg': wx.getStorageSync('userInfo').icon,
          'content': this.data.commentContent,
          'topicId': this.data.hId,
          'parentid': this.data.dId,
          'parentuserid': this.data.parentuserid,
          'parentusername': this.data.parentusername,
          'code': getApp().globalData.subCode,
          'userid': wx.getStorageSync('userInfo').usersId,
        };
      }
      util.requestUrl(getApp().globalData.newBaseUrl + 'postComment',
        paraDic,
        function (res) {

          console.log(res);

          if (res.data.status == '200') {
            that.requesQuanDara(that.data.hId);
            that.setData({
              isfabu: false,
              isshade1: false
            });
          }
          else {

          }

          wx.hideLoading();

        });
    }
    else
    {
        wx.showToast({
          title: '评论不可为空',
        })

    }
  },

  mystart: function (e) {
    var that = this;
    that.setData({
      touch_start: e.timeStamp
    });
  },
  myend: function (e) {
    var that = this;
    that.setData({
      touch_end: e.timeStamp
    });
    var touchTime = that.data.touch_end - that.data.touch_start;
    console.log(touchTime);
    if (touchTime > 350) {
      that.setData({
        'lock': false
      });
    } else {
      that.setData({
        'lock': true
      });
    }
  },
  delimg: function (e) {
    var that = this;
    console.log("1" + ' ' + e.currentTarget.id + '  ' + e.currentTarget.dataset.fid); 
    if (e.currentTarget.dataset.fid == wx.getStorageSync('userInfo').usersId){
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          var cId = e.currentTarget.id;

          util.requestUrl(getApp().globalData.newBaseUrl + 'delComment',
            {
              'id':cId,
              'code': getApp().globalData.subCode,
              'userId': wx.getStorageSync('userInfo').usersId,
              },
            function (res) {

              console.log(res);

              if (res.data.status == '200') {
                that.requesQuanDara(that.data.hId);
                
              }
              else {

              }

              wx.hideLoading();

            });



        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
    
    }
  },


  jumptoqc:function(){
    this.setData({
      isfabu: false,
      isshade1: false
    });
  },
  jumptoquxiaomianze:function(){
    this.setData({
      ismianze: false,
      isshade: false,
    });
  },
  jumptomianze:function(){
    this.setData({
      ismianze: true,
      isshade: true,
    });
  },
  imgload:function(e){
    var index = e.currentTarget.id;
    var images = this.data.mDic.topicImages;
    images[index].width = e.detail.width;
    images[index].height = e.detail.height;

    this.data.mDic.topicImages = images;

    this.setData({
      mDic: this.data.mDic
    });
  },
  jumptotel: function (e) {
    console.log(e);
    var tel = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: tel
    });
  }, 
  lookaddress:function(e){
    console.log(e);
    var lan = e.currentTarget.dataset.lan;
    var lon = e.currentTarget.dataset.lon;
    var address = e.currentTarget.dataset.address;
    wx.openLocation({
      latitude: parseFloat(lan),
      longitude: parseFloat(lon),
      scale: 28,
      address: address
    });
  }
})