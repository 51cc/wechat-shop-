//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

    console.log(extConfig);

    this.globalData.subCode = extConfig.attr.code;

    this.globalData.appName = extConfig.attr.name;

    console.log(extConfig.attr);

    console.log(this.globalData.subCode);

    console.log(this.globalData.appName);

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    setUrl:"https://wx.go.ktcx.com.cn/diy/",
    baseUrl:"https://wx.mgo.ktcx.com.cn/mobile/",
    newBaseUrl: "https://wechat.app.ktcx.com.cn/mobile/",//"http://192.168.1.134:8080/diy_shop/mobile/",//  
    baseImgUrl:"http://115.29.47.133/",
    subCode: '',
    appName: ''
  }
})