// pages/business_settled/business_settled.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var httpUrl = getApp().globalData.httpUrl;
var codeName = getApp().globalData.codeName;
var userId = getApp().globalData.userId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maincolor:'',
    selectLeiBie:true,
    selectWeiZhi:true,
    selectTime:false,
    mianzeCheck: false,
    check: false,//是否置顶
    phoneSelect:false,
    contentInput:false,

    hasZhiDing:false,
    isshade: false,
    ismianze: false,
    modelid:'请选择分类',
    categoryId:'',//分类ID
    listku:[],
    typeAy:[],

    locationAddress: '',
    latitude: '',
    longitude: '',

  
    timeAy:[],
    timemodelid:'请选择时间',
    timeprice:0.0,
    timeId:'',

    mianze:'',

    content:'',
    phone:'',

    imgPathAy:[],

    allselect:false
  },

  uploadImg:function(index){

    

    var that = this;

      console.log(index);
    
    if (index == 1989)
    {
        console.log('---upload success');
        var paraDic = {
          'images': '',
          'topSetId': that.data.timeId,
          'isTop': (that.data.check?'1':'0'),
          'lon': that.data.longitude,
          'lan': that.data.latitude,
          'address': that.data.locationAddress,
          'content':that.data.content,
          'tel': that.data.phone,
          'typeId': that.data.categoryId,
          'code': getApp().globalData.subCode,
          'userName':wx.getStorageSync('userInfo').nickname,
          'userImg': wx.getStorageSync('userInfo').icon,
          'userId': wx.getStorageSync('userInfo').usersId
        };
      console.log(paraDic);

        util.requestUrl(getApp().globalData.newBaseUrl + 'postTopic',
         paraDic,
          function (res) {

            console.log(res);
            wx.hideLoading();

            if (res.data.status == '200') {
              if(that.data.check)
              {
// 需要支付
                util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTopic', {'orderNo':res.data.topic.orderNo}, function (res) {
                  console.log(res.data);
                  if (res.data.status == '200') 
                  {
                    var dic = JSON.parse(res.data.wechat);
                    wx.requestPayment({
                      timeStamp: dic.timeStamp,
                      nonceStr: dic.nonceStr,
                      package: dic.package,
                      signType: 'MD5',
                      paySign: dic.paySign,
                      'success': function (res) {
                        console.log(res);

                        wx.showToast({
                          title: '付款成功',
                        });
                        
                        setTimeout(function () {
                          wx.navigateBack({
                            delta: 1
                          });
                        }, 2000);
                      },
                      'fail': function (res) {
                        console.log(res);
                      }
                    });
                  } else {
                    wx.showToast({
                      title: res.data.info
                    });
                  }
                });
              }
              else
              {

                wx.showToast({
                  title:'发布成功',
                  duration: 2000
                });

                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000);
              }
            }
            else 
            {

            }


          });
    }
    else
    {
      console.log('---upload ing');

      wx.uploadFile({
        url: getApp().globalData.newBaseUrl + 'uploadImg', //仅为示例，非真实的接口地址
        filePath: that.data.listku[index],
        name: 'file',
        success: function (res) {
          

          console.log(JSON.parse(res.data));

          var data = JSON.parse(res.data);

          var imgAy = that.data.imgPathAy;

          imgAy.push(data.imgs);

          console.log('aaaa' + index + ' ' + that.data.listku.length + ' ' + imgAy[index]);

          that.setData({ imgPathAy: imgAy });

          if (index == that.data.listku.length-1)
          {
            var paraDic = {
              
              'images': that.data.imgPathAy.join(','),
              'topSetId': that.data.timeId,
              'isTop': (that.data.check ? '1' : '0'),
              'lon': that.data.longitude,
              'lan': that.data.latitude,
              'address': that.data.locationAddress,
              'content': that.data.content,
              'tel': that.data.phone,
              'typeId': that.data.categoryId,
              'code': getApp().globalData.subCode,
              'userName': wx.getStorageSync('userInfo').nickname,
              'userImg': wx.getStorageSync('userInfo').icon,
              'userId': wx.getStorageSync('userInfo').usersId
            };
            console.log(paraDic);

            util.requestUrl(getApp().globalData.newBaseUrl + 'postTopic',
              paraDic,
              function (res) {

                console.log(res);

                wx.hideLoading();


                if (res.data.status == '200') {
                    if(that.data.check)
                    {
// 需要支付
                      util.requestUrl(getApp().globalData.newBaseUrl + 'preWechatTopic', {'orderNo':res.data.topic.orderNo}, function (res) {
                        console.log(res.data);
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
                              wx.showToast({
                                title: '付款成功',
                              });
                              setTimeout(function () {
                                wx.navigateBack({
                                  delta: 1
                                });
                              }, 2000);
                            },
                            'fail': function (res) {
                              console.log(res);
                            }
                          });
                        } else {
                          wx.showToast({
                            title: res.data.info
                          });
                        }
                      });
                    }
                    else
                    {
                      wx.showToast({
                        title: '发布成功',
                        duration: 2000
                      });

                      setTimeout(function () {
                        wx.navigateBack({
                          delta: 1
                        });
                      }, 2000);
                    }
                   
                }
                else {

                }


              });
          }
          else
          {
            that.uploadImg(index + 1);

          }
         
          //do something
        }
      })    
    }
   
  },


  formSubmit:function(){

    this.setData({ imgPathAy:[]});

    wx.showLoading({
      title: '加载中',
    })

    // for (var index in this.data.listku)
    // {
      if(this.data.listku.length>0)
      {
        this.uploadImg(0);
      }
      else
      {
        this.uploadImg(1989);        
      }
    // }
  },

  panduan:function(){
    if (this.data.check)
    {
// 置顶
      if (this.data.selectLeiBie && this.data.selectWeiZhi && this.data.mianzeCheck && this.data.selectTime && this.data.phoneSelect && this.data.contentInput) 
      {
        this.setData({ allselect: true });
      }
      else
      {
        this.setData({ allselect: false});        
      }
    }
    else
    {
// 不置顶
      if (this.data.selectLeiBie && this.data.selectWeiZhi && this.data.mianzeCheck && this.data.phoneSelect && this.data.contentInput)
      {
          this.setData({allselect:true});
      }
      else {
        this.setData({ allselect: false });
      }
    }
  },
  switch1Change:function(){
    this.setData({check:!this.data.check});
    this.panduan();
  },
  checkboxChange:function(e){
    this.setData({ mianzeCheck: !this.data.mianzeCheck});
    this.panduan();

  },
  bindinput:function(e){
    console.log(e);
    if(e.target.id=='content')
    {
      this.setData({content:e.detail.value});

      if (this.data.content.length>0)
      {
        this.setData({ contentInput: true });
      }
      else
      {
        this.setData({ contentInput: false });
      }
      this.panduan();

    }
    else if (e.target.id == 'phone')
    {
      this.setData({ phone: e.detail.value });
      if(this.data.phone.length>0)
      {
        this.setData({ phoneSelect:true});
      }
      else
      {
        this.setData({ phoneSelect: false});        
      }

      this.panduan();

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.tid);
   var that=this;
   wx.showLoading({
     title: '加载中',
   })

   var that = this;

   util.requestUrl(getApp().globalData.setUrl + 'getMyList',
     { 'orderNo': getApp().globalData.subCode },
     function (res) {

       console.log(res);

       that.setData({ maincolor: res.data.color });
       }
       );



   util.requestUrl(getApp().globalData.newBaseUrl + 'typeList',
     {
       'code': getApp().globalData.subCode,
       'userId': wx.getStorageSync('userInfo').usersId
     },
     function (res) {

       console.log(res);

       if (res.data.status == '200') {
        
         that.setData({ mianze: res.data.mianze.content});

         // that.setData({nodes:str1});
         WxParse.wxParse('article', 'html', res.data.mianze.content, that, 20);
         that.setData({ typeAy: res.data.dataList });

         if (options.hasFenLei=='1')
         {
           console.log(options.tid);

           for(var index in that.data.typeAy)
           {
             var sDic = that.data.typeAy[index];

             if (sDic.id == options.tid)
             {

               var merchant = sDic;

               that.setData({
                 modelid: merchant.name,
                 categoryId: merchant.id,
               });

               that.setData({ check: false });


               // 类别已经选择
               that.setData({ selectLeiBie: true });

               that.setData({
                 timeId: '',
                 timemodelid: '请选择',
                 timeprice: '0.0',
               });

               that.setData({ selectTime: false });

               that.setData({
                 timeAy: merchant.topSets
               });

               if (merchant.isTop == '0') {
                 that.setData({ hasZhiDing: false });
               }
               else {
                 that.setData({ hasZhiDing: true });
               }

               that.panduan();
             }
           }
         }
       }
       else {

       }

       wx.hideLoading();

     });
  },

  //图片上传
  oNuploadTap: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePaths[0],
            isImg: true
        })
        wx.uploadFile({
          url: httpUrl + 'uploadImg',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (e) {
            that.setData({
              imglist: JSON.parse(e.data).imgs
            })
          }

        })
      }
    })
  },

  //产品详情图片上传
  oNproductShlTap:function(e){
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var mAy = [];
        for (var index in tempFilePaths)
        {

          mAy.push(tempFilePaths[index]);
          // console.log(tempFilePaths[index]);
        }
        that.setData({
              listku: mAy
            })

        // wx.uploadFile({
        //   url: httpUrl + 'uploadImg',
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   success: function (e) {
        //     that.setData({
        //       isImg: true,
        //       imageList: JSON.parse(e.data).imgs
        //     })
        //     var listku = that.data.listku;
        //     if (listku == undefined) {
        //       listku = []
        //     }
        //     listku.push(that.data.imageList);
        //     that.setData({
        //       listku: listku
        //     })
        //     console.log(listku);
        //   }

        // })
      }
    })
  },
  //获取商家分类列表
  getshopType: function (e) {
    var that = this;
    utils.http(httpUrl + "getmodelList", {
      code: codeName,
      cityid: wx.getStorageSync("city").cityId
    }, function (res) {
      console.log(res);
      that.setData({
        list: res.merchantlist
      })
    })
  },
  //点击商家分类
  // clickTypeTap: function (e) {
  //   this.setData({
  //     ispos: "rightPos"  //有显示 
  //   })
  // },
  bindPickerChange:function(e){
    console.log(e, e.detail.value );

    var merchantlist = this.data.typeAy;
    
    var merchant = merchantlist[e.detail.value];
    
    this.setData({
      modelid: merchant.name,
      categoryId: merchant.id,
    });

    this.setData({ check:false});
    

    // 类别已经选择
    this.setData({ selectLeiBie:true});

    this.setData({
      timeId: '',
      timemodelid: '请选择',
      timeprice: '0.0',
    });

    this.setData({ selectTime: false });

    this.setData({
      timeAy: merchant.topSets
    });

    if(merchant.isTop=='0')
    {
      this.setData({hasZhiDing:false});
    }
    else
    {
      this.setData({hasZhiDing:true});
    }
    
    this.panduan();

  },
  bindPickerChange1:function(e){
    console.log(e, e.detail.value);
    var merchantlist = this.data.timeAy;
    var merchant = merchantlist[e.detail.value];
    this.setData({
      timeId: merchant.id,
      timemodelid: merchant.sdays,
      timeprice: merchant.money,
    });
    //时间已经选择
    this.setData({ selectTime:true});
    this.panduan();

  },
  oNlistTap: function (e) {
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    this.setData({
      modelid: name,
      categoryId: id,
      ispos: "leftPos"  //隐藏
    });
  },

  //商家注册
  formSubmit1:function(e){
    var that = this;
    var name=e.detail.value.name;
    var linkman = e.detail.value.linkman;
    var telephone = e.detail.value.telephone;
    var introduce = e.detail.value.introduce;
    var productShl = e.detail.value.productShl;
    var imagelist1 = "";
    console.log(that.data.listku);
    if (that.data.listku != undefined && that.data.listku.length>0){
      imagelist1 = that.data.listku.join(",");
      console.log("--------------------");
    }
    console.log(imagelist1);
    if (name == "" || linkman == ""  || productShl==""){
      wx.showToast({
        title: '请认真填写信息~',
      })
      return;
    }
    console.log(that.data.level);
    if (that.data.level ==undefined||that.data.level=="") {
      wx.showToast({
        title: '请选择等级~',
      })
      return;
    }
    console.log(wx.getStorageSync("userInfo"));
    // var   
    console.log("imagelist", imagelist1);
    utils.http(httpUrl +"intomerchant",{
      code:codeName,
      name: name,//商家名字
      images: that.data.imglist,//头像
      linkman: linkman, //联系人名字
      telephone: telephone, //电话
      introduce: introduce,//商家信息
      location: that.data.locationAddress, //地址
      modelid: that.data.modelid, //分类名称
      userid: wx.getStorageSync("userInfo").userId, //用户提高了
      cityid:wx.getStorageSync("city").cityid, //城市ID
      level: that.data.level,//等级
      categoryId:that.data.categoryId,//分类ID
      totalPrice: that.data.totalprice, //价格
      productShl: productShl ? productShl:'', //产品介绍
      imageList: imagelist1,  //商家详情图片
      latitude: that.data.latitude,
      longitude: that.data.longitude
      },function(res){
        console.log(res);
        if(res.status==200){
          if (res.order.totalPrice == 0) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000);

            return;
          }
          util.http(httpUrl + "preWechat", {
            ordernum: res.order.orderNo, //	用户id
            code: codeName,//code值
          }, function (res) {
            console.log(res);
            var dic = JSON.parse(res.wechat);
            if (res.status == 200) {
              wx.requestPayment({
                timeStamp: dic.timeStamp,
                nonceStr: dic.nonceStr,
                package: dic.package,
                signType: 'MD5',
                paySign: dic.paySign,
                'success': function (res) {
                  console.log(res);
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 2000
                    });
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 2000);
                },
                'fail': function (res) {
                }
              });
            }
          })
        } else if(res.status=="202"){
          wx.showToast({
            title: res.info,
          })
        }else{
          wx.showToast({
            title: '失败',
            icon: 'loading',
            duration: 2000
          })
        }
      })
  },

  //地图
  oNlocationTap:function(e){
    var that=this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);

        // 位置已选
        that.setData({ selectWeiZhi:true});
        that.panduan();

        that.setData({
          locationAddress: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(res.address);
      }                             
    }) 
  },

  //查看
  lookimg: function (e) {

    var imgs = this.data.listku;
    if (this.data.lock) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: imgs // 需要预览的图片http链接列表
      });
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
    console.log("1");
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          var url = e.currentTarget.id;

          var imgs = that.data.listku;
          
          console.log(url);

          for (var i = 0; i < imgs.length; i++) {
            // console.log(imgs[i])
            if (imgs[i] == url) {
              console.log(console.log(imgs[i]));
              imgs.splice(i, 1);
            }
          }
          that.setData({
            'listku': imgs
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  //商家等级选择
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var info=e.detail.value;
    var infoSplit=info.split("-");
    console.log(infoSplit);
    if (infoSplit[0]=="1"){
      this.setData({
        levelName:'普通商家'
      });
    } else if ("2" == infoSplit[0]){
      this.setData({
        levelName: '金牌商家'
      });
    }
    this.setData({
      level: infoSplit[0],
      totalprice:infoSplit[1]
    } )

  },
  jumptoquxiaomianze: function () {
    // this.setData({
    //   ismianze: false,
    //   isshade: false,
    // });
    wx.navigateTo({
      url: '../huatimianze/huatimianze?content='+this.data.mianze,
    })
  },
  jumptomianze: function () {
    this.setData({
      ismianze: true,
      isshade: true,
    });
  }
})