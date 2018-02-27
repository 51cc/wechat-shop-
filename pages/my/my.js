var util = require('../../utils/util.js');
Page({
  data:{
    isOpenQianDao:false,
    isQD:true,
    maincolor:'#ffffff',
    sumJiFen: 0,
    rows:[//{'name':'优惠券','id':0},
      { 'name': '我的拼团', 'id': 888, 'icon': '../../Asset/pin.png' },
      { 'name': '优惠券', 'id': 6, 'icon': '../../Asset/m_youhui.png'},
      { 'name': '卡券中心', 'id': 66, 'icon': '../../Asset/kaquan.png' },
      { 'name': '我的收藏', 'id': 1, 'icon':'../../Asset/m_shoucang.png'},
      { 'name': '我的预约', 'id': 7, 'icon': '../../Asset/myyuyue.png' },
      { 'name': '我的活动', 'id': 777, 'icon': '../../Asset/ico_hd.png' },
      { 'name': '我的买单', 'id': 7777, 'icon': '../../Asset/md.png' },
      { 'name': '我的发布', 'id': 8888, 'icon': '../../Asset/mht.png' },

      { 'name': '我的积分', 'id': 88, 'icon': '../../Asset/my_jifen.png' },

      { 'name': '地址管理', 'id': 2, 'icon': '../../Asset/m_dizhi.png'},
      { 'name': '绑定手机', 'id': 3, 'icon': '../../Asset/m_bangding.png'},
      { 'name': '加入我们', 'id': 4, 'icon': '../../Asset/m_ruzhu.png'},
      { 'name': '关于我们', 'id': 5, 'icon': '../../Asset/m_guanyu.png'}],
  headicon:"",
  nickName:"昵称",
    // orders:[{'name':'全部','icon':'../../Asset/m_daifukuan.png','id':'111'},
    //         {'name':'待付款','icon':'../../Asset/m_fahuo.png','id':'222'},
    //         {'name':'待发货','icon':'../../Asset/m_daishouhuo.png','id':'333'},
    //         {'name':'已发货','icon':'../../Asset/m_pingjia.png','id':'444'},
    //         {'name':'完成','icon':'../../Asset/m_shouhou.png','id':'555'}]

  orders: [
  { 'name': '待付款', 'icon': '../../Asset/m_fahuo.png', 'id': '222' },
  { 'name': '待发货', 'icon': '../../Asset/m_daishouhuo.png', 'id': '333' },
  { 'name': '待收货', 'icon': '../../Asset/m_pingjia.png', 'id': '444' },
  { 'name': '待评价', 'icon': '../../Asset/m_daipingjia.png', 'id': '666' },
  { 'name': '退款', 'icon': '../../Asset/m_tuikuan.png', 'id': '777' }]
  },
  jump(str){
        console.log('========='+str);
    wx.navigateTo({
      url: str,
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
  jumptodetail:function(e){
    console.log(e);
    if (e.currentTarget.id=='6')
    {
      // this.jump('../videodetail/videodetail');

      //  this.jump('../kaquan/kaquan');
      this.jump('../myyouhuiquan/myyouhuiquan');
    }
    else if (e.currentTarget.id=='1')
    {
      // this.jump('../tuangoulist/tuangoulist');
      this.jump('../myfav/myfav');
    }
    else if (e.currentTarget.id=='2')
    {
      wx.chooseAddress({
        
      });
      // this.jump('../myAddAddress/myAddAddress');
    }
    else if (e.currentTarget.id=='3')
    {
      this.jump('../bandphone/bandphone');
    }
    else if (e.currentTarget.id=='4')
    {
      this.jump('../myruzhu/myruzhu');
    }
    else if (e.currentTarget.id=='5')
    {
      // this.jump('../fenxiao/fenxiao');
        this.jump('../aboutus/aboutus');
    }
    else if (e.currentTarget.id == '7')
    {
       //老版本的预约
      // this.jump('../myyuyue/myyuyue');
      this.jump('../mynewyuyue/mynewyuyue');
    }
    else if (e.currentTarget.id == '66')
    {
      this.jump('../kaquan/kaquan');
    }
    else if (e.currentTarget.id == '88') {
      // wx.showToast({
      //   title: 'jifen',
      // })
      this.jump('../myjifen/myjifen');
    }
    else if(e.currentTarget.id=='888'){
      this.jump('../my-group/my-group');
    }
    else if (e.currentTarget.id == '777') {
      this.jump('../myhuodong/myhuodong');
    }
    else if (e.currentTarget.id == '7777') {
      this.jump('../mymaidanjilu/mymaidanjilu');
    }
    else if (e.currentTarget.id == '8888') {
      this.jump('../myfabu/myfabu');
    }
  },
  jumptoorder:function(e){
    var oType = '';
    if(e.currentTarget.id=='111')
    {
      oType = '1';
    }
    else if(e.currentTarget.id=='222')
    {
      oType = '2';
    }
    else if(e.currentTarget.id=='333')
    {
      oType = '3';
    }
    else if(e.currentTarget.id=='444')
    {
      oType = '4';
    }
    else if(e.currentTarget.id=='555')
    {
      oType = '5';
    }
    else if(e.currentTarget.id=='666')
    {
        //待评价
        oType='99';
    }
    else if(e.currentTarget.id=='777')
    {
        //退款
      oType = '100';
    }
    
    wx.navigateTo({
      url: '../orders/orders?all='+oType,
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






 wx.login({
   success: function(res){
      wx.getUserInfo({
      success: function(res){
        that.setData({headicon:res.userInfo.avatarUrl});
        that.setData({nickName:res.userInfo.nickName});

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

   },
   fail: function(res) {
     // fail
   },
   complete: function(res) {
     // complete
   }
 })

    
    

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  qianDao:function(e){

    var that = this;

    util.requestUrl(getApp().globalData.newBaseUrl + 'signIntegral',
      {
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {

        if(res.data.flag)
        {
          that.setData({ isQD:true});
          that.setData({ sumJiFen: res.data.bqUser.credit });

          wx.showToast({
            title: res.data.msg,
          })
        }
        else
        {
          wx.showToast({
            title: res.data.msg,
          })
        }
      });
  },
  onShow:function(){
    // 生命周期函数--监听页面显示


    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        
        console.log(res);

        that.setData({ maincolor: res.data.color });
        
        that.setData({ rows: res.data.myList });



        util.requestUrl(getApp().globalData.newBaseUrl + 'usable',
      { 
        'code': getApp().globalData.subCode,
        'userId': wx.getStorageSync('userInfo').usersId
      },
      function (res) {
        console.log('----------');
        console.log(res);

        if (res.data.flag)
        {
//签到已经打开

          var insert = true;

          for(var index in that.data.rows)
          {
              var sdic = that.data.rows[index];
              if(sdic.id==88)
              {
                insert = false;
              }
          }


          if(insert)
          {
              var aay =[];
              
              aay = that.data.rows;

              aay.splice(3, 0,{ 'name': '我的积分', 'id': 88, 'img': '../../Asset/my_jifen.png' });

              that.setData({rows:aay});
          }



          that.setData({ isQD: res.data.isSign });
          that.setData({ sumJiFen: res.data.bqUser.credit });
        }
        else
        {

        }
        that.setData({ isOpenQianDao: res.data.flag });


       

      });






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