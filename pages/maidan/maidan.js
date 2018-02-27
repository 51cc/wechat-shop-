// pages/maidan/maidan.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectDic: {'parentName':'请选择商家'},
    selectIndex:0,
    show:false,
    sheight:0.0,
    swidth:0.0,
    setting:0,//0  没有优惠啊  1 满减  2折扣
    jianMoney:0,

    shijifukuan:0.0,
    sumMoney:0.0,//总金额
    bukeMoney:0.0,//不可优惠金额
    clients: []
  },
  confirmOrder:function(){

    var zj = this.data.sumMoney;
    var jj = this.data.jianMoney;
    
    var shifujia = zj - jj;

    if(parseFloat(shifujia)>0)
    {
      var that = this;
      var paraDic = 
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId,
        'paybillId': this.data.selectDic.id,
        'linkMan': wx.getStorageSync('userInfo').nickname,
        'allPrice': this.data.sumMoney,
        'NoratePrice': (this.data.bukeMoney ? this.data.bukeMoney:0.0)
      };


      util.requestUrl(getApp().globalData.newBaseUrl + 'addPayNote',
        paraDic,
        function (res) {
          console.log(res);
          if (res.data.status == '200') 
          {

            wx.setStorageSync('payObj', res.data.data);

            util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatPayNote',
              { 'orderNo': res.data.data.orderNo},
              function (res) {
                console.log(res);
                if (res.data.status == '200') {

                  //付款成功  
                 
                  var dic = JSON.parse(res.data.wechat);

                  wx.requestPayment({
                    timeStamp: dic.timeStamp,
                    nonceStr: dic.nonceStr,
                    package: dic.package,
                    signType: 'MD5',
                    paySign: dic.paySign,
                    'success': function (res) {
                      console.log(res);
                      wx.navigateTo({
                        url: '../maidansuccess/maidansuccess',
                      })
                    },
                    'fail': function (res) {
                      wx.showToast({
                        image: '../../Asset/tanhao.png',
                        title: '买单失败',
                      })
                    }
                  });

                }
                else {
                  wx.showToast({
                    title: res.data.msg,
                  })
                }
              });
          }
          else 
          {
            wx.showToast({
              title: res.data.msg,
            })
          }
        });

    }

    
  },
  selectClient:function(e){
    console.log(e);
    // this.setData({ sumMoney: '' });
    // this.setData({ bukeMoney:''});
    this.setData({selectDic: this.data.clients[e.currentTarget.id]});
    this.setData({selectIndex:e.currentTarget.id});
    this.setData({setting: this.data.selectDic.setting });
    this.jisuan();
    this.setData({ show: false });

  },
  close:function(){
    this.setData({ show: false });
  },
  showClient:function(){
    if(this.data.show)
    {
      this.setData({ show:false});
    }
    else
    {
      this.setData({ show:true});
    }
  },
  bindinput:function(e){
    // console.log(e);
    if (e.currentTarget.id =='zongjia')
    {
      this.setData({ sumMoney:e.detail.value});
    }
    else if (e.currentTarget.id == 'bukeyouhui')
    {
      this.setData({ bukeMoney: e.detail.value });
    }

    this.jisuan();

  },
  jisuan:function(){
    if (this.data.selectDic.setting)
    {
        if(this.data.selectDic.setting=='0')
        {
          this.setData({ setting:'0'});
          this.setData({ jianMoney: 0 });
        }
        else if (this.data.selectDic.setting == '1')
        {
          this.setData({ setting: '1' });
          var chazhi ;

          if (this.data.sumMoney && this.data.bukeMoney)
          {
            chazhi = parseFloat(this.data.sumMoney) - parseFloat(this.data.bukeMoney);
          }
          else
          {
            chazhi = parseFloat(this.data.sumMoney);
          }
          
          // console.log(chazhi);
          if(chazhi)
          {
              if (parseFloat(chazhi) >= parseFloat(this.data.selectDic.full))
              {

              // console.log('----');
                var count = parseFloat(chazhi) / parseFloat(this.data.selectDic.full);

                if (parseFloat(this.data.selectDic.uplimit)>0)
                {
                    if (this.data.selectDic.minus * Math.floor(count) > parseFloat(this.data.selectDic.uplimit)) 
                    {
                      this.setData({ jianMoney: parseFloat(this.data.selectDic.uplimit).toFixed(2)});   
                    }
                    else
                    {
                      this.setData({ jianMoney: (this.data.selectDic.minus * Math.floor(count)).toFixed(2)});      
                    }
                }
                else
                {
                  this.setData({ jianMoney: (this.data.selectDic.minus * Math.floor(count)).toFixed(2) });
                }
              }
              else
              {
                this.setData({jianMoney:0.0});
              }
          }
          else
          {
                this.setData({ jianMoney:0 });
          }

          var zj = this.data.sumMoney;
          var jj = this.data.jianMoney;

          var shifujia = zj - jj;

          this.setData({ shijifukuan: parseFloat(shifujia).toFixed(2) });
        }
        else if (this.data.selectDic.setting == '2')
        {
          this.setData({ setting: '2' });

          var chazhi;

          if (this.data.sumMoney && this.data.bukeMoney)
          {
            chazhi = parseFloat(this.data.sumMoney) - parseFloat(this.data.bukeMoney);
          }
          else 
          {
            chazhi = parseFloat(this.data.sumMoney);
          }

          // console.log(chazhi);
          
          if(chazhi) 
          {
            if (parseFloat(chazhi)>0) 
            {

              if (parseFloat(this.data.selectDic.uplimit)>0)
              {
                  if(parseFloat(chazhi)*(10-parseFloat(this.data.selectDic.rate))/10.0>parseFloat(this.data.selectDic.uplimit))
                  {
                    this.setData({ jianMoney: parseFloat(this.data.selectDic.uplimit).toFixed(2)});   
                  }
                  else
                  {
                    this.setData({ jianMoney: ((parseFloat(chazhi) * (10-parseFloat(this.data.selectDic.rate)) / 10.0)).toFixed(2)});
                  }
              }
              else
              {
                this.setData({ jianMoney: ((parseFloat(chazhi) * (10 - parseFloat(this.data.selectDic.rate)) / 10.0)).toFixed(2) });
              }
            }
          }
          else 
          {
            this.setData({ jianMoney: 0 });
          }

          var zj = this.data.sumMoney;
          var jj = this.data.jianMoney;

          var shifujia = zj - jj;

          this.setData({ shijifukuan: parseFloat(shifujia).toFixed(2) });
        }
    }
    else
    {
      wx.showToast({
        image: '../../Asset/tanhao.png',
        title: '选择支付商家',
      })
    }
  },
  requestData:function(){
    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'getALLPayBill',
      {
        'code': getApp().globalData.subCode
      },
      function (res) {
        console.log(res);
        if (res.data.status=='200') {
          that.setData({ clients: res.data.data });

          that.setData({ selectDic:res.data.data[0]});

          that.setData({ setting:res.data.data[0].setting});

          that.jisuan();

        }
        else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });
    this.setData({ swidth: res.windowWidth });

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })

    this.requestData();
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
  onShareAppMessage: function () {
  
  }
})