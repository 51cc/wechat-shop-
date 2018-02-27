var util = require('../../utils/util.js');
Page({
  data:{
      categorys:[{'name':'未使用','select':true,'id':0},
      {'name':'已使用','select':false,'id':1},
      {'name':'已过期','select':false,'id':2}],
      dataAy: [],
      hasContent: false,
      item: { 'icon': '../../Asset/q_dingdan.png', 'title': '暂无优惠券，快去领取吧' }
  },
  jumptolingqu:function(){
    wx.navigateTo({
      url: '../youhuiquancenter/youhuiquancenter',
    })
  },
  jumptodetail:function(e){
    wx.navigateTo({
      url: '../youhuiquanDetail/youhuiquanDetail?id='+e.currentTarget.id,
    })
  },
  changetotrue:function(e){
    var that = this;
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
        console.log(selectObj.id);
        that.setData({dataAy:[]});
        if(selectObj.id==0)
        {
          util.requestUrl(getApp().globalData.baseUrl + 'userCouponList', {
            'state': '0',
            'CODE': getApp().globalData.subCode,
            'USER_ID': wx.getStorageSync('userInfo').usersId,
          }, function (res) {
            console.log(res);

            if (res.data.status == '200') {
              that.setData({ dataAy: res.data.dataList });
            }
            if (that.data.dataAy.length > 0) {
              that.setData({ hasContent: true });
            }
            else {
              that.setData({ hasContent: false });
            }
          });

        }
        else if(selectObj.id==1)
        {

          util.requestUrl(getApp().globalData.baseUrl + 'userCouponList', {
            'state': '1',
            'CODE': getApp().globalData.subCode,
            'USER_ID': wx.getStorageSync('userInfo').usersId,
          }, function (res) {
            console.log(res);

            if (res.data.status == '200') {
              that.setData({ dataAy: res.data.dataList });
            }
            if (that.data.dataAy.length > 0) {
              that.setData({ hasContent: true });
            }
            else
            {
              that.setData({ hasContent: false });
            }
          });
        }
        else if(selectObj.id==2)
        {
          util.requestUrl(getApp().globalData.baseUrl + 'userCouponList', {
            'diff': '0',
            'CODE': getApp().globalData.subCode,
            'USER_ID': wx.getStorageSync('userInfo').usersId,
          }, function (res) {
            console.log(res);

            if (res.data.status == '200') {
              that.setData({ dataAy: res.data.dataList });
            }
            if (that.data.dataAy.length > 0) {
              that.setData({ hasContent: true });
            }
            else {
              that.setData({ hasContent: false });
            }
          });
        }

    this.data.categorys.splice(e.target.id,1,newobj);
    this.setData({categorys:this.data.categorys});

        
  },
  qushiyong:function(){
    wx.navigateTo({
      url: '../prolist/prolist?id=1',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'userCouponList', {
      'state':'0',
      'CODE': getApp().globalData.subCode,
      'USER_ID': wx.getStorageSync('userInfo').usersId,
    }, function (res) {
      console.log(res);

      if (res.data.status == '200') {
        that.setData({ dataAy:res.data.dataList});
      }
      if (that.data.dataAy.length > 0) {
        that.setData({ hasContent: true });
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