var util = require('../../utils/util.js');
Page({
  data:{
    maincolor:'',
    rowsData:[{'title':'手机号','placeName':'输入手机号','id':'0'},
{'title':'姓名','placeName':'输入姓名','id':'1'},],
phone:'',
name:''
  
  },
bindKeyInput:function(e)
  {
    if(e.currentTarget.id=='0')
    {
      this.setData({phone:e.detail.value});
     }
     else if(e.currentTarget.id=='1')
     {
      this.setData({name:e.detail.value});
     }
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载


    var that = this;


    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
      });

    
  },
  addNewAddress:function()
  {
util.requestUrl(getApp().globalData.baseUrl+'userBind',
  {'USERS_ID':wx.getStorageSync('userInfo').usersId,
  'NICKNAME':this.data.name,
  'CODE': getApp().globalData.subCode,
  'MOBILE':this.data.phone},function(res){
    console.log(res);
              if(res.data.status=='200')
              {
                wx.showLoading({
          title: '绑定成功',
        })

        setTimeout(function(){
          wx.hideLoading()
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
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
        },2000)

              }
            });
  },
  bindKeyInput:function(e)
  {
    if(e.currentTarget.id=='0')
    {
      this.setData({phone:e.detail.value});
     }
     else if(e.currentTarget.id=='1')
     {
      this.setData({name:e.detail.value});
     }
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