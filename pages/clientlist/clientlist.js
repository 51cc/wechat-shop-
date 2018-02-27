var util = require('../../utils/util.js');

Page({
  data:{
      shops:[],
      hasContent: false,
      searchText: '',
      item: { 'icon': '../../Asset/q_shangpu.png', 'title': '加载中。。' }
  },
  bindKeyInput: function (e) {
    console.log(e.detail.value);
    this.setData({ searchText: e.detail.value });
  },
  jumptosearch: function () {
    console.log(this.data.searchText);
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'partnerList', 
    { 'CITY_ID': wx.getStorageSync('cityCode'), 
    'CODE': getApp().globalData.subCode,
    'NAME': this.data.searchText }, function (res) {
      console.log(res);
      that.setData({ searchText: '' });

      if (res.data.status == '200') {
        
        that.setData({ shops: res.data.dataList });
        if (that.data.shops.length > 0) {
          that.setData({ hasContent: true });
        }
        else {
          that.setData({ hasContent: false });
          that.setData({ item: { 'icon': '../../Asset/q_shangpu.png', 'title': '暂无商家' } });
        }
        
      }
      else
      {
        that.setData({ shops: [] });

      }
    });


  },
  jumptoshopdetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid='+e.currentTarget.id,
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
    // 生命周期函数--监听页面加载
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'partnerList', { 'CITY_ID': wx.getStorageSync('cityCode'), 'CODE': getApp().globalData.subCode,},function(res){
      console.log(res);
                if(res.data.status=='200')
                {
                  that.setData({shops:res.data.dataList});
                  if (that.data.shops.length > 0) {
                    that.setData({ hasContent: true });
                  }
                  else
                  {
                    that.setData({ hasContent: false });
                    that.setData({ item: { 'icon': '../../Asset/q_shangpu.png', 'title': '暂无商家' }});
                  }
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