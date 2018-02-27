var util = require('../../utils/util.js');
Page({
  data:{
    rowsData:[{'title':'姓名','placeName':'输入姓名','id':'0'},
{'title':'电话','placeName':'输入电话','id':'1'},
{'title':'区域','placeName':'输入省市区','id':'2'},  
{'title':'地址','placeName':'输入详细地址(街道门牌房间号)','id':'3'}
],
//{'title':'默认地址','placeName':'您的手机号','id':'4'},
  name:'',
  phone:'',
  quyu:'',
  address:''
  },
  bindKeyInput:function(e)
  {
    if(e.currentTarget.id=='0')
    {
      this.setData({name:e.detail.value});
     }
     else if(e.currentTarget.id=='1')
     {
      this.setData({phone:e.detail.value});
     }
     else if(e.currentTarget.id=='2')
     {
        this.setData({quyu:e.detail.value});

     }
     else if(e.currentTarget.id=='3')
     {
       this.setData({address:e.detail.value});       
     }
     
  },
  addNewAddress:function()
  {
    console.log({'USER_ID':wx.getStorageSync('userInfo').usersId,
  'ADDRESS':(this.data.quyu+this.data.address),
  'NAME':this.data.name,
  'MOBILE':this.data.phone,
  'IS_TOP':'0',});
    util.requestUrl(getApp().globalData.baseUrl+'editUserAddress',
  {'USER_ID':wx.getStorageSync('userInfo').usersId,
    'CODE': getApp().globalData.subCode,
  'ADDRESS':(this.data.quyu+this.data.address),
  'NAME':this.data.name,
  'MOBILE':this.data.phone,
  'IS_TOP':'0'},function(res){
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