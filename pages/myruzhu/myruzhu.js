var util = require('../../utils/util.js');
Page({
  data:{
    rowsData:[{'title':'代理名称','placeName':'为你的公司起一个响亮的名称','id':'0'},
{'title':'主营项目','placeName':'比如网站建设等','id':'1'},
{'title':'简单介绍','placeName':'简单介绍下您的公司','id':'2'},  
{'title':'联系人','placeName':'您的姓名','id':'3'},  
{'title':'电话','placeName':'您的手机号','id':'4'},],
  shopName:'',
  shopFanwei:'',
  shopJieShao:'',
  shoplinkMan:'',
  shopPhone:'',
  maincolor:'',
  headImg:'../../Asset/m_dailijiameng.jpg'
  },
  bindKeyInput:function(e)
  {
    console.log(e);
    if(e.currentTarget.id=='0')
    {
      this.setData({shopName:e.detail.value});
     }
     else if(e.currentTarget.id=='1')
     {
      this.setData({shopFanwei:e.detail.value});
     }
     else if(e.currentTarget.id=='2')
     {
        this.setData({shopJieShao:e.detail.value});
     }
     else if(e.currentTarget.id=='3')
     {
       this.setData({shoplinkMan:e.detail.value});       
     }
     else if(e.currentTarget.id=='4')
     {
       this.setData({shopPhone:e.detail.value});       
     }
     
  },
  addNewAddress:function()
  {
    console.log({'USERS_ID':wx.getStorageSync('userInfo').usersId,
  'CONTENT':this.data.shopFanwei,
  'SHL':this.data.shopJieShao,
  'MOBILE':this.data.shopPhone,
  'TITLE':this.data.shopName,
  'LINKMAN':this.data.shoplinkMan});

    util.requestUrl(getApp().globalData.baseUrl+'apply',
  {'USERS_ID':wx.getStorageSync('userInfo').usersId,
    'CODE': getApp().globalData.subCode,
  'CONTENT':this.data.shopFanwei,
  'SHL':this.data.shopJieShao,
  'MOBILE':this.data.shopPhone,
  'TITLE':this.data.shopName,
  'LINKMAN':this.data.shoplinkMan},function(res){
    console.log(res);
              if(res.data.status=='200')
              {
                wx.showLoading({
          title: '添加成功',
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
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;


    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
      });



    console.log(wx.getStorageSync('userInfo').usersId);
    util.requestUrl(getApp().globalData.baseUrl + 'getAgentBg', { 'CODE': getApp().globalData.subCode},function(res){
        console.log(res);
            if(res.data.status=='200')
              {
                if(res.data.image.length>0)
                  that.setData({headImg:res.data.image});
                      
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