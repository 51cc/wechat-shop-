var util = require('../../utils/util.js');
Page({
  data:{
    show:true,
      // categorys:[
      // {'name':'全部','select':true,'id':0},
      // {'name':'待付款','select':false,'id':1},
      // {'name':'待发货','select':false,'id':2},
      // {'name':'已发货','select':false,'id':3},
      // {'name':'完成','select':false,'id':4}],
    categorys: [
      { 'name': '全部', 'select': true, 'id': 0 },
      { 'name': '待付款', 'select': false, 'id': 1 },
      { 'name': '待发货', 'select': false, 'id': 2 },
      { 'name': '待收货', 'select': false, 'id': 3 },

      { 'name': '待评价', 'select': false, 'id': 4 },
      { 'name': '退款', 'select': false, 'id': 5 },
      ],
      orders:[],
      all:false,
      state:0,
      isComment:0,
      wuliuCompany:'暂无',
      wuliuNum:'暂无',
      hasContent:false,
      item: {'icon': '../../Asset/q_dingdan.png','title':'暂无订单，快去逛逛吧'}
  },
  chakanwuliu:function(e){
    console.log(e);
    // wx.navigateTo({
    //   url: '../orderdetail/orderdetail?id=' + e.currentTarget.id,
    // })
    var img;
    for(var index in this.data.orders)
    {
      var dic = this.data.orders[index];
      if (dic.id == e.currentTarget.id)
      {
        img = dic.proList[0].productIcon;
      }
    }
    wx.navigateTo({
      url: '../wuliu/wuliu?oId='+e.currentTarget.id+'&img='+img,
    })

  },
  querenshouhuo:function(e){
    console.log(e);
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'sureEdit',
     { 'CODE': getApp().globalData.subCode, 
       'USER_ID': wx.getStorageSync('userInfo').usersId,
     'ORDERNUM': e.currentTarget.id }, function (res) {
console.log(res);
      if (res.data.status == '200') {

        wx.showToast({
          title: '确认成功',
        })

        wx.navigateBack({
          delta:1
        })


      }
    });
  },
  jumptoorderdetail:function(e){
    console.log(e);
    // if (e.currentTarget.dataset.id=='100')
    // {
    //   wx.navigateTo({
    //     url: '../ordertuikuan/ordertuikuan?id=' + e.currentTarget.id + '&stype=' + e.currentTarget.dataset.id,
    //   })
    // }
    // else if (e.currentTarget.dataset.id == '101')
    // {
    //   wx.navigateTo({
    //     url: '../ordertuikuan/ordertuikuan?id=' + e.currentTarget.id + '&stype=' + e.currentTarget.dataset.id,
    //   })
    // }
    // else if (e.currentTarget.dataset.id == '102')
    // {
    //   wx.navigateTo({
    //     url: '../ordertuikuan/ordertuikuan?id=' + e.currentTarget.id + '&stype=' + e.currentTarget.dataset.id,
    //   })
    // }
    // else
    // {
      wx.navigateTo({
        url: '../orderdetail/orderdetail?id=' + e.currentTarget.id,
      })
    // }
   
  },

  jumptocomment:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../commentwrite/commentwrite?id=' + e.currentTarget.id,
    })

  },
  hiddenmask:function(){
    this.setData({ show: true });

  },
  shenqingtuikaun:function(e){
    console.log(e);

  },
  lookwuliu:function(e){
    console.log(e);

    this.setData({show:false});
    for (var index in this.data.orders)
    {
      var dic = this.data.orders[index];

      if (dic.ordernum == e.currentTarget.id)
      {
        this.setData({ wuliuNum: dic.sendNum });

        this.setData({ wuliuCompany: dic.sendCompany});
        // console.log(dic.sendCompany +','+ dic.sendNum);
      }

    }
  },
  changetotrue:function(e){
    
        var newAy = [];
        for(var obj in this.data.categorys)
        {
            var newobj;
            var oldD = this.data.categorys[obj];
            if(oldD.select)
            {
                newobj={'name':oldD.name,'select':false,
                'id':oldD.id};
                this.data.categorys.splice(obj,1,newobj);
            }    
        }
        var selectObj = this.data.categorys[e.target.id];
        var newobj = {'name':selectObj.name,
                    'select':true,
                    'id':selectObj.id
                    };
    this.data.categorys.splice(e.target.id,1,newobj);

 this.setData({categorys:this.data.categorys});
  if(parseInt(e.target.id)==0)
  {
    this.setData({ state: '' });
    this.requestData(this.data.state,10000);
  }
  else //if (parseInt(e.target.id) == 1)
  {
    if (parseInt(e.target.id) == 4)
    {
    //待评价
      this.setData({ state: parseInt(e.target.id) + 1 });
      this.requestData(this.data.state, 0);
    }
    else if (parseInt(e.target.id) == 5)
    {
      //退款
     
      this.setData({ state: parseInt(e.target.id) + 1 });
      this.requestData(100, 10000);
    }
    else
    {
      this.setData({ state: parseInt(e.target.id) + 1 });
      this.requestData(this.data.state, 10000);
    }
    

  }

        
  },
  requestData(str,str2){

    wx.showLoading({
      title: '加载中',
    })
      var that = this;
       console.log(this.data.state);
      this.setData({orders:[]});
      var paraDic = 
      {
        'USER_ID':wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
        'STATE':str
      };
      if(str2==0)
      {
        //待评价请求参数
        paraDic = 
        {
          'USER_ID': wx.getStorageSync('userInfo').usersId,
          'CODE': getApp().globalData.subCode,
          'IS_COMMENT':0
        };
      }
      console.log(paraDic);

      util.requestUrl(getApp().globalData.baseUrl+'orderlist',paraDic,function(res){
        console.log(res);
            wx.hideLoading();
            
            if(res.data.status=='200')
              {
          that.setData({orders:res.data.dataList});
              }
            if (that.data.orders.length>0)
            {
              that.setData({ hasContent:true});
            }
      });
  },
  deleteOrder:function(e){
    var that = this;

    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      success: function (res) {
        if (res.confirm) {
          util.requestUrl(getApp().globalData.baseUrl + 'delOrder', { 'CODE': getApp().globalData.subCode, 'ORDERNUM': e.currentTarget.id }, function (res) {

            if (res.data.status == '200') {

              wx.showToast({
                title: '删除成功',
              })

              that.requestData(that.data.state, 1000);


            }
          });
        } else if (res.cancel) {

        }
      }
    })
  },
  tuikuan:function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../ordertuikuan/ordertuikuan?id=' + e.currentTarget.id + '&stype=' + '103',
    })

    // util.requestUrl(getApp().globalData.baseUrl + 'orderExit', { 'USER_ID': wx.getStorageSync('userInfo').usersId, 'CODE': getApp().globalData.subCode, 'ORDER_ID': e.currentTarget.id }, function (res) {

      
    //     wx.showToast({
    //       title: res.data.info,
    //     })
      


    // });
  },
  payNow:function(e){
    console.log(e.currentTarget.id);
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'preWechat', { 'CODE': getApp().globalData.subCode, 'ORDERNUM': e.currentTarget.id }, function (res) {

      if (res.data.status == '200') {

        var dic = JSON.parse(res.data.wechat);

        wx.requestPayment({
          timeStamp: dic.timeStamp,
          nonceStr: dic.nonceStr,
          package: dic.package,
          signType: 'MD5',
          paySign: dic.paySign,
          'success': function (res) {

            console.log(res);
            
            that.requestData(that.data.state, 1000);
            wx.navigateBack({
              delta:1
            })
          },
          'fail': function (res) {
            console.log(res);
          }
        });


      }
    });
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log(options);

   

    if(options.all=='1')
    {
      this.setData({all:true});
      this.setData({state:''});
      this.requestData(this.data.state, 1000);
    }
    else if(options.all=='2'||options.all=='3'||
    options.all=='4'||options.all=='5')
    {
      this.setData({all:false});
       this.setData({state:(parseInt(options.all))});
       console.log(this.data.state);

       this.requestData(this.data.state, 1000);
    }
    else if(options.all=='100')
    {
      //退款
      this.setData({ all: false });
      this.setData({ state:100});
      this.requestData(this.data.state, 1000);

    }
    else if (options.all == '99')
    {
      //待评价
      this.setData({ all: false });
      this.setData({ isComment:0});
      this.requestData(this.data.state, 0);
    }

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  // onShow:function(){
  //   // 生命周期函数--监听页面显示
    
  // },
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