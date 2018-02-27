var util = require('../../utils/util.js');
Page({
  data:{
      bianJi:'编辑',
      isEdite:true,
      isAll:true,
      favs: [],
      num:0,
      hasContent: false,
      item: { 'icon': '../../Asset/q_shoucang.png', 'title': '暂时没有收藏任何东西' }
  },
  deleteThing:function(){
   
    var str = '';
    for(var index in this.data.favs)
    {
      var dic = this.data.favs[index];
      if(dic.select)
      {

      }
      else
      {
        str=str+dic.id+',';
      }
    }

var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'delCollect',
      {
        'USER_ID': wx.getStorageSync('userInfo').usersId, 
        'CODE': getApp().globalData.subCode,
        'IDS':str,
        'CITY_ID': '370100'
      }, function (res) {
        console.log(res);
        if (res.data.status == '200') {

          that.getData();

        }
      });

  },
  selectSingle:function(e){
    console.log(e)
    var dic = this.data.favs[e.currentTarget.dataset.id];
    if(dic.select)
    {
      dic.select=false;
    }
    else
    {
      dic.select = true;      
    }
    this.data.favs.splice(e.currentTarget.dataset.id,1,dic);
    this.setData({favs:this.data.favs});
  },
  change:function(){
    if(this.data.isEdite)
    {
      this.setData({ isEdite:false});
      this.setData({bianJi:'完成'});
    }
    else{
      this.setData({ isEdite: true });
      this.setData({ bianJi: '编辑' });

    }
  },
  select:function(){
    for(var index in this.data.favs)
    {
      var dic = this.data.favs[index];
      if(dic.select)
      {
        dic.select = false;
      }
      else
      {
        dic.select = true;
      }
      this.data.favs.splice(index, 1, dic);
    }
    this.setData({ favs: this.data.favs });
    this.setData({isAll:!this.data.isAll});
  },
  jumptodetail:function(e)
  {
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
  getData:function(){
    wx.showLoading({
      title: '加载中',
    })

    this.setData({favs:[]});
    var that = this;
    console.log(wx.getStorageSync('userInfo').usersId);
    util.requestUrl(getApp().globalData.baseUrl + 'userCollect',
      {
        'USER_ID':wx.getStorageSync('userInfo').usersId, 
        'CODE': getApp().globalData.subCode,
        'CITY_ID': '370100'
      }, function (res) {
        console.log(res);
        wx.hideLoading();
        
        if (res.data.status == '200') {

          for (var index in res.data.dataList) {
            var dic = res.data.dataList[index];
            dic.select = true;
            that.data.favs.push(dic);
          }
          that.setData({ favs: that.data.favs });
          that.setData({num:that.data.favs.length});
          console.log(that.data.favs);
          if (that.data.favs.length > 0) {
            that.setData({ hasContent: true });
          }
          else{
            that.setData({ hasContent: false });            
          }
        }
      });
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getData();
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