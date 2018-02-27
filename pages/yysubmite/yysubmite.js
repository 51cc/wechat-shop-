// pages/yysubmite/yysubmite.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personNum:0,
    maincolor:'',
    timeDic:{},
    sumMoney:0.0,
    keyong:false,
    coupon:{},
    tel:'',
    name:'',
    beizhu:'',
    timeStr:'',
    days:'',
    hour:'',
    isline:'0',//1  线上付款   0 线下
    time:'选择时间',
    num:1,
  },
  bindinput: function (e) {
    if(e.currentTarget.id=='100')
    {
      this.setData({name:e.detail.value});
    }
    else if (e.currentTarget.id == '200')
    {
      this.setData({tel: e.detail.value });
    }
    else if (e.currentTarget.id == '300') {
      this.setData({ beizhu: e.detail.value });
    }
  },
  jumptosubmite:function(){
    // wx.navigateTo({
    //   url: '../yysuccess/yysuccess',
    // })
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.name.length > 0 && this.data.tel.length > 0 &&this.data.days.length>0&&this.data.hour.length>0)
    {
        if(this.data.isline=='0')
        {
          var paraDic = { 
            'peopleNum': this.data.personNum,
            'couponUserId':'',
            'code': getApp().globalData.subCode,
            'userId': wx.getStorageSync('userInfo').usersId,
            'linkMan':this.data.name,
            'tel':this.data.tel,
            'serviceId': this.data.timeDic.data.id,
            'serviceNum': this.data.num,
            'isline': this.data.isline,
            'assessDate':(this.data.days+' '+this.data.hour),
            'couponId':'',
            'couponPrice':'',
            'remark':this.data.beizhu,
            'parentId': this.data.timeDic.data.parent_id
            }
          util.requestUrl(getApp().globalData.newBaseUrl + 'addAppointOrder',
            paraDic,
            function (res) {

              console.log(res);

              wx.hideLoading();

              if (res.data.status == '200') {

                wx.setStorageSync('orderData', res.data.data);
                
                wx.navigateTo({url: '../yysuccess/yysuccess',})

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
          var paraDic = {
            'peopleNum': this.data.personNum,
            'couponUserId': this.data.coupon.id,
            'code': getApp().globalData.subCode,
            'userId': wx.getStorageSync('userInfo').usersId,
            'linkMan': this.data.name,
            'tel': this.data.tel,
            'serviceId': this.data.timeDic.data.id,
            'serviceNum': this.data.num,
            'isline': this.data.isline,
            'assessDate': (this.data.days + ' ' + this.data.hour),
            'couponId': (this.data.keyong?this.data.coupon.coupon_id:''),
            'couponPrice': (this.data.keyong?this.data.coupon.money:''),
            'remark': this.data.beizhu,
            'parentId': this.data.timeDic.data.parent_id
          }
          util.requestUrl(getApp().globalData.newBaseUrl + 'addAppointOrder',
            paraDic,
            function (res) {

              console.log(res);

              wx.hideLoading();

              if (res.data.status == '200') {

                wx.setStorageSync('orderData', res.data.data);

                util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatAppoint', { 'orderNo': res.data.data.orderNo }, function (res) {


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
                        console.log(res);

                wx.navigateTo({ url: '../yysuccess/yysuccess', })
                        
                      },
                      'fail': function (res) {
                        console.log(res);
                      }
                    });


                  }
                });
              }
              else {
                wx.showToast({
                  image: '../../Asset/tanhao.png',
                  title: res.data.info,
                })
              }


            });
        }
    
    }
    else
    {
      wx.showToast({
        title: '填写必要信息',
      })
    }




  },
  jumptoselecttime:function(){
    wx.navigateTo({
      url: '../yyselecttime/yyselecttime?tStr=' +this.data.timeStr+'&selectNum='+this.data.num,
    })
  },
  jiannum:function(){
    if(this.data.num>1)
    {
      var n = this.data.num-1;

      this.setData({ num: n });

      var sum = parseFloat(this.data.num) * parseFloat(this.data.timeDic.data.price);
      this.setData({ sumMoney: sum.toFixed(2)});

      this.huoquyouhuiquan();

    }
  },
  jianum:function(){
    var n = this.data.num+1;
    this.setData({ num:n});
    
    var sum = parseFloat(this.data.num) * parseFloat(this.data.timeDic.data.price);
    this.setData({ sumMoney: sum.toFixed(2)});

    this.huoquyouhuiquan();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {

        console.log(res);
        that.setData({ maincolor: res.data.color });

      });

    

    this.setData({ timeStr: options.sDic});
    

    // console.log(this.data.timeStr);

    this.setData({ timeDic: JSON.parse(options.sDic)});
    
    // console.log(this.data.timeDic);

    this.setData({ isline: this.data.timeDic.pz.isline});
    
    var sum = parseFloat(this.data.num) * parseFloat(this.data.timeDic.data.price);

    this.setData({ sumMoney: sum.toFixed(2)});

    if(this.data.isline=='1')
    {
      this.huoquyouhuiquan();
    }
  },

  huoquyouhuiquan:function(){
    wx.showLoading({
      title: '加载中',
    })
    //线上支付
    var paraDic = {
      'code': getApp().globalData.subCode,
      'userId': wx.getStorageSync('userInfo').usersId,
      'price': (parseFloat(this.data.timeDic.data.price) * this.data.num),
      'parentId': this.data.timeDic.data.parent_id
    }
    var that = this;
    console.log(paraDic);

    util.requestUrl(getApp().globalData.newBaseUrl + 'getOneCoupon',
      paraDic,
      function (res) {

        console.log(res);

        wx.hideLoading();

        if (res.data.status == '200') {

          if(res.data.data)
          {
            that.setData({ keyong:true});
            that.setData({ coupon:res.data.data});

            var sum = parseFloat(that.data.num) * parseFloat(that.data.timeDic.data.price) - parseFloat(res.data.data.money);

            that.setData({ sumMoney: sum.toFixed(2)});
          }
          else
          {
            that.setData({ keyong: false});

          }
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
    
    var sDic = wx.getStorageSync('selectTime');
    if(sDic)
    {
      this.setData({days:sDic.day});
      this.setData({hour: sDic.hour });
      this.setData({ personNum: sDic.peopleNum});

    }
    else
    {

      this.setData({days:"请选择预约时间"});
    }

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