var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({
  data:{
    source:""
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    this.requestData();
  },
  requestData(){
      var that = this;
      util.requestUrl(getApp().globalData.baseUrl + 'abouts?STATE=0', { 'CODE': getApp().globalData.subCode},function(res){
        console.log(res);
            WxParse.wxParse('article', 'html', res.data.about.value, that,5);
      });
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