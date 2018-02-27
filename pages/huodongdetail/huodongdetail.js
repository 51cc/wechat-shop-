// pages/huodongdetail/huodongdetail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hId:'',
    name:'',
    phone:'',
    mDic:{},
    imgUrls:[],
    sheight:0.0,
    swidth:0.0,
    isshow:false,
    state:'0'//0活动未开始  1报名成功 2报名失败
  },
  bindinput:function(e){
    console.log(e);
    if(e.currentTarget.id=='name')
    {
      this.setData({name:e.detail.value});
    }
    else if (e.currentTarget.id == 'phone')
    {
      this.setData({phone: e.detail.value });
    }
  },
  makePhone: function () {
    var that = this;

    wx.makePhoneCall({
      phoneNumber: this.data.mDic.MOBILE,
    })
  },
  jumptoclientmap: function () {
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.mDic.MAPX),
      longitude: Number(that.data.mDic.MAPY),
      name: that.data.mDic.parentName
    })
  },
  baoming:function(e){
    var  that = this;
    if(e.currentTarget.id==0)
    {
      that.setData({ isshow: true });
      that.setData({ state: '0' });
    }
    else if (e.currentTarget.id == 1)
    {
//进行中
      if(this.data.name.length>0&&this.data.phone.length>0)
      {
      if (this.data.mDic.ispay=='1')
      {
        //需要付款
        //不需要付款
        var that = this;
        wx.showLoading({
          title: '加载中',
        })
        util.requestUrl(getApp().globalData.newBaseUrl + 'addActivityOrder',
          {
            'linkMan':that.data.name,
            'tel':that.data.phone,
            'code': getApp().globalData.subCode,
            'userId': wx.getStorageSync('userInfo').usersId,
            'activityId': that.data.hId
          },
          function (res) {

            console.log(res);

            wx.hideLoading();

            if (res.data.status == '200') {

              util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatActivity', { 'orderNo': res.data.data.orderNo }, function (res) {
                console.log(res);
                if (res.data.status == '200') {

                  var dic = JSON.parse(res.data.wechat);

                  wx.requestPayment({
                    timeStamp: dic.timeStamp,
                    nonceStr: dic.nonceStr,
                    package: dic.package,
                    signType: 'MD5',
                    paySign: dic.paySign,
                    'success': function (res) {
                      that.setData({ isshow: true });
                      that.setData({ state: '1' });

                    },
                    'fail': function (res) {
                      wx.showToast({
                        image: '../../Asset/tanhao.png',
                        title: '请去支付',
                      })
                    }
                  });


                }
              });

            }
            else if (res.data.status == '203') {
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: '人数已满',
              })
            }
            else if (res.data.status == '204') {
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: '您已报名',
              })
            }
            else
            {
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: res.data.info,
              })
            }
            


          });
      }
      else
      {
        //不需要付款
        var that = this;
        wx.showLoading({
          title: '加载中',
        })
        util.requestUrl(getApp().globalData.newBaseUrl + 'addActivityOrder',
          {
            'linkMan': that.data.name,
            'tel':that.data.phone,
            'code':getApp().globalData.subCode,
            'userId':wx.getStorageSync('userInfo').usersId,
            'activityId': that.data.hId
          },
          function (res) {

            console.log(res);

            wx.hideLoading();

            if (res.data.status == '200') {
              that.setData({ isshow: true });
              that.setData({ state: '1' });
            }
            else if(res.data.status=='203')
            {
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: '人数已满',
              })
            }
            else if (res.data.status == '204') {
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: '您已报名',
              })
            }
            else
            {
              // that.setData({ isshow: true });
              // that.setData({ state: '2' }); 
              wx.showToast({
                image: '../../Asset/tanhao.png',
                title: res.data.info,
              })
            }


          });

      }
    } 
      else {
        console.log('----');
        wx.showToast({
          image: '../../Asset/tanhao.png',
          title: '请填写必要信息',
        })
      }
    
    }
    
  },
  
  closeTheView:function(){
    this.setData({isshow:false});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({hId:options.hId});
    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    this.requestData();
  },
  requestData:function(){

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.requestUrl(getApp().globalData.newBaseUrl + 'getActivityById',
      { 'code': getApp().globalData.subCode,
        'id':that.data.hId },
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          that.setData({mDic:res.data.data});
          if(that.data.mDic.state==0)
          {
            that.setData({isshow:true});
            that.setData({state:'0'});
          }
          var str1 = res.data.data.detail;

          WxParse.wxParse('article', 'html', str1, that, 20);

          that.setData({imgUrls:[{'img':res.data.data.img}]});

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