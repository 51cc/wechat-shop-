// youhuiquanselect.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy: [],
    cId:'',
    selected:0,
    hasContent: false,
    item: { 'icon': '../../Asset/q_dingdan.png', 'title': '暂无可用优惠券' }
  },
  jumptodetail: function (e) {
    wx.navigateTo({
      url: '../youhuiquanDetail/youhuiquanDetail?id=' + e.currentTarget.id,
    })
  },

  confirm:function()
  {
    var str='';
    var money=0;
    for(var index in this.data.dataAy)
    {
      var dic = this.data.dataAy[index];
      if (dic.select)
      {
        str=str+dic.id+',';
        money+=parseFloat(dic.money);
      }
    }
    wx.setStorageSync('youhuiquan', {'sId':str,'jMoney':money,'clientId':this.data.cId});

    wx.navigateBack({
      delta:1
    })
  },

  selectTheYouHuiQuan:function(e){
    for(var index in this.data.dataAy)
    {
      var dic = this.data.dataAy[index];
      if(dic.id==e.currentTarget.id)
      {
        if(dic.select)
        {
          var mDic = {
            'diff': dic.diff,
            'endDate': dic.endDate,
            'full': dic.full,
            'id': dic.id,
            'minus': dic.minus,
            'money': dic.money,
            'startDate': dic.startDate,
            'title': dic.title,
            'select': false
          };
          this.data.dataAy.splice(index,1,mDic);
        }
        else
        {
          var mDic = {
            'diff': dic.diff,
            'endDate': dic.endDate,
            'full': dic.full,
            'id': dic.id,
            'minus': dic.minus,
            'money': dic.money,
            'startDate': dic.startDate,
            'title': dic.title,
            'select': true
          };
          this.data.dataAy.splice(index, 1, mDic);
        }
      }
      else
      {
        var mDic = {
          'diff': dic.diff,
          'endDate': dic.endDate,
          'full': dic.full,
          'id': dic.id,
          'minus': dic.minus,
          'money': dic.money,
          'startDate': dic.startDate,
          'title': dic.title,
          'select': false
        };
        this.data.dataAy.splice(index, 1, mDic);

      }
    }
    this.setData({ dataAy:this.data.dataAy});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.setStorageSync('youhuiquan', { 'sId': options.clientId, 'jMoney': 10, 'clientId': options.clientId });

    this.setData({ cId: options.clientId});
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'getUseCouponList', {
      'CODE': getApp().globalData.subCode,
      'PARTNER_ID':options.clientId,
      'USER_ID': wx.getStorageSync('userInfo').usersId, 
      'JSON': options.jstr
    }, function (res) {
      console.log(res);

      if (res.data.status == '200') {

        var mAy = [];
        
        for (var index in res.data.dataList)
        {
          var dic = res.data.dataList[index];
          var mDic ={'diff':dic.diff,
            'endDate': dic.endDate,
            'full': dic.full,
            'id': dic.couponId,
            'minus': dic.minus,
            'money': dic.money,
            'startDate': dic.startDate,
            'title': dic.title,
            'select':false};
            mAy.push(mDic);
        }

        that.setData({dataAy:mAy});        
      }
      if (that.data.dataAy.length > 0) {
        that.setData({ hasContent: true });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})