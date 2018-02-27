var util = require('../../utils/util.js');
Page({
  data:{
    dataAy:[],
    hasContent: false,
    item: { 'icon': '../../Asset/q_dizhi.png', 'title': '暂时没有地址' }

    /*
    {'name':'李雨桐','phone':'15634883121','address':'山东济南历下数码港大厦B1203','moren':true},
    {'name':'李雨桐','phone':'15634883121','address':'山东济南历下数码港大厦B1203','moren':false},
    {'name':'李雨桐','phone':'15634883121','address':'山东济南历下数码港大厦B1203','moren':false},
    {'name':'李雨桐','phone':'15634883121','address':'山东济南历下数码港大厦B1203','moren':false},
    {'name':'李雨桐','phone':'15634883121','address':'山东济南历下数码港大厦B1203','moren':false}
    */
  },
  addNewAddress:function(e){
      wx.navigateTo({
        url: '../addNewAddress/addNewAddress',
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

    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  selectTheAddress:function(e)
  {
    console.log(e.currentTarget.id);
    for(var index in this.data.dataAy)
    {
      var dic = this.data.dataAy[index];
      if(dic.addressId==e.currentTarget.id)
      {
        wx.setStorageSync('currentAddress', dic);
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
      }
    }

  },
  deleteTheAddress:function(e)
  {
    console.log(e);
    var that = this;
util.requestUrl(getApp().globalData.baseUrl+'delAddress',
  {'USER_ID':wx.getStorageSync('userInfo').usersId,
    'CODE': getApp().globalData.subCode,
  'USERADDRESS_ID':e.currentTarget.id},function(res){
    console.log(res);
              if(res.data.status=='200')
              {
                   that.refreshTheData();
              wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
              if (that.data.dataAy.length > 0) {
                that.setData({ hasContent: true });
              }
              }
            });
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
   this.refreshTheData();
  },
  refreshTheData:function()
  {
console.log(wx.getStorageSync('userInfo').usersId);
    var that = this;
     util.requestUrl(getApp().globalData.baseUrl+'userAddList',
  {'USER_ID':wx.getStorageSync('userInfo').usersId,
    'CODE': getApp().globalData.subCode,},function(res){
    console.log(res);
              if(res.data.status=='200')
              {
                var dAy = [];
                for(var index in res.data.dataList)
                {
                  var dic = res.data.dataList[index];
                  var sDic={'name':dic.linkman,'addressId':dic.useraddressId,'phone':dic.mobile,'address':dic.address,'moren':false};
                  dAy.push(sDic);
                }

                that.setData({dataAy:dAy});

                if (that.data.dataAy.length > 0) {
                  that.setData({ hasContent: true });
                }
              }
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