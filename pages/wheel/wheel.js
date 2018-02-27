import Wheel from "../../components/wheel/wheel.js"
var util = require('../../utils/util.js');
Page({
  data: {
    preOrderId:'',
    sheight:0.0,
    swidth:0.0,
    showMask:true,
    choujiangAy:[],
    lucksign:0,
    sumJiFen:0,
    contentStr:'',
    num:2,
    mode: 1
  },
  lingqu:function(){

    this.setData({ showMask: true });

    this.wheel.reset()

    var sdic = {};

    if(this.data.num==1)
    {
      sdic = this.data.choujiangAy[0];
    }
    else if(this.data.num==3)
    {
      sdic = this.data.choujiangAy[1];
    }
    else if (this.data.num == 5) 
    {
      sdic = this.data.choujiangAy[2];
    }
    else if (this.data.num == 7)
    {
      sdic = this.data.choujiangAy[3];
    }

    sdic.preOrderId = this.data.preOrderId;

    wx.setStorageSync('choujiang', sdic);

    wx.navigateTo({
      url: '../submiteJiFenOrder/submiteJiFenOrder?stype=1',
    })

  },
  hiddenTheMask:function(){
    
    this.createWheel();

    this.setData({ showMask: true });

  },


 

  onShow () {

    var that = this;

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000',
    })


    var code = '';
    wx.login({
      success: function (res) {

        // console.log(res);
        code = res.code;
        wx.getUserInfo({
          success: function (res) {
            // console.log(res);

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
                    'openid': res.data.openid,
                    'sessionKey': res.data.sessionKey,
                    'avatarUrl': res.data.user.avatarUrl,
                    'usersId': res.data.user.usersId,
                    'icon': res.data.user.icon
                  })


                  


                  util.requestUrl(getApp().globalData.newBaseUrl + 'usable',
                    {
                      'code': getApp().globalData.subCode,
                      'userId': wx.getStorageSync('userInfo').usersId
                    },
                    function (res) {

                      that.setData({ sumJiFen: res.data.bqUser.credit });

                      that.setData({ lucksign: res.data.integralPz.lucksign });
                     
                    });




                  util.requestUrl(getApp().globalData.newBaseUrl + 'integralList',
                    { 'code': getApp().globalData.subCode },
                    function (res) {

                      console.log(res);

                      that.setData({ choujiangAy: res.data.integralLuckList });

                      that.createWheel();

                    });






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

  },

  createWheel:function()
  {

    var that = this;
     
     wx.showLoading({
       title: '抽奖准备中..',
     })


    util.requestUrl(getApp().globalData.newBaseUrl + 'luckDraw',
      { 
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        
        console.log(res);

        if(res.data.flag)
        {
          wx.hideLoading();

          that.setData({num:res.data.num});


          var sdic = {};
          if (that.data.num == 1) {
            sdic = that.data.choujiangAy[0];
          }
          else if (that.data.num == 3) {
            sdic = that.data.choujiangAy[1];
          }
          else if (that.data.num == 5) {
            sdic = that.data.choujiangAy[2];
          }
          else if (that.data.num == 7) {
            sdic = that.data.choujiangAy[3];
          }

          that.setData({ contentStr: sdic.name});

          that.wheel = new Wheel(that, {
            areaNumber: 8,
            imgAy: that.data.choujiangAy,
            speed: 16,
            awardNumer: that.data.num,//从第几个开始
            mode: 1,
            callback: (idx, award) => {

//请求接口    减掉相应的积分


              var sdic = {};
              var proid = '';
              if (that.data.num == 1) {
                sdic = that.data.choujiangAy[0];
                proid = sdic.id;
              }
              else if (that.data.num == 3) {
                sdic = that.data.choujiangAy[1];
                proid = sdic.id;
              }
              else if (that.data.num == 5) {
                sdic = that.data.choujiangAy[2];
                proid = sdic.id;
              }
              else if (that.data.num == 7) {
                sdic = that.data.choujiangAy[3];
                proid = sdic.id;
              }




              util.requestUrl(getApp().globalData.newBaseUrl + 'luckDrawMinus',
                { 
                  'code': getApp().globalData.subCode,
                  'state': res.data.state,
                  'proid':proid,
                  'userId': wx.getStorageSync('userInfo').usersId
                 },
                function (res) {
                  
                  console.log(res);

                  if (that.data.num == 1 ||
                    that.data.num == 3 ||
                    that.data.num == 5 ||
                    that.data.num == 7) {
          that.setData({ preOrderId: res.data.integralLuckOrder.id});
                    that.setData({ showMask: false });
                  }
                  else {
                    wx.showModal({
                      title: '提示',
                      content: '很遗憾，未抽中。',
                      showCancel: false,
                      success: (res) => {
                        that.wheel.reset()
                        if (res.confirm) {
                          that.createWheel();
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          // console.log('用户点击取消')
                        }
                      }
                    })
                  }

                });



              








            }
          })


        }
        else
        {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                wx.navigateBack({
                  delta:1
                })
              } 
            }
          })
        }



      });






    
  },

  onReady () {
    console.log("onReady")    
  },
  // onShareAppMessage: function () {
  //   return {
  //     title: getApp().globalData.appName, // 分享标题
  //     desc: '小积分抽大奖', // 分享描述
  //     path: 'pages/wheel/wheel' // 分享路径
  //   }
  // },
  onSwitchMode (event) {
    let mode = event.currentTarget.dataset.mode
    this.setData({mode})
    this.wheel.switch(mode)
  }  

})