var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    img:'',
    title:'',
    address:'',
    phone:'',
    content:'',
    products:[],
    lon:'',
    lat:'',
    parId:'',
    maincolor:'',
    yuyueOk:true
  },
  changProTitle: function () {
    var ay = [];
    for (var index in this.data.products) {
      var dic = this.data.products[index];
      if (dic.fullName.length > 23) {
        var str = dic.fullName.substring(0, 23);
        dic.fullName = str + '...';
      }
      ay.push(dic);
    }

    this.setData({ products: ay });
  },
  yuyue:function(){
      wx.navigateTo({
        url: '../clientyuyue/clientyuyue?pid='+this.data.parId,
      })
  },
  jumptomap:function(){
    console.log('jump to map');
    var that = this;
    wx.openLocation({
      latitude: Number(that.data.lon),
      longitude: Number(that.data.lat),
      name: that.data.title
    })
  },
  callTheClient:function()
  {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    });
  },
  jumptodetail:function(e)
 {
    console.log(e.currentTarget.id);
     console.log(e.currentTarget.id);
    wx.setStorageSync('productId', e.currentTarget.id)
  wx.navigateTo({
    url: '../prodetail/prodetail',
    success: function(res){
      // success
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
 },
  onLoad:function(options){


    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
      });



    // 生命周期函数--监听页面加载
    console.log(options.parentid);
    util.requestUrl(getApp().globalData.baseUrl+'prodList',{'TARGET_ID':options.parentid,
      'CODE': getApp().globalData.subCode,
    'CITY_ID':wx.getStorageSync('cityCode')},function(res){
      console.log(res);
                if(res.data.status=='200')
                {
                  that.setData({products:res.data.dataList});
                  // that.changProTitle();

                }
              });
    util.requestUrl(getApp().globalData.baseUrl + 'partnerDetail', { 'PARTNER_ID': options.parentid, 'CODE': getApp().globalData.subCode,},function(res){
      console.log(res);
                if(res.data.status=='200')
                {

var str1 = res.data.data.detail;

WxParse.wxParse('article', 'html', str1, that, 20);

that.setData({lon:res.data.data.mapx});
    
that.setData({ lat: res.data.data.mapy });

that.setData({ parId: res.data.data.partnerId});

that.setData({img:res.data.data.img});

that.setData({title:res.data.data.title});

that.setData({address:res.data.data.address});

that.setData({phone:res.data.data.mobile});

that.setData({ content: res.data.data.shlId });
if (res.data.data.isAppo=='1')
{
  that.setData({ yuyueOk: false });

}
else
{
  that.setData({ yuyueOk: true });

}
                  // that.setData({products:res.data.dataList});

                }
              });

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  }
})