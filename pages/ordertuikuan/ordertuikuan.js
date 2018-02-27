// ordertuikuan.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuikuanstate:'',
    dataAy: [],
    stype:'',
    show:false,
    oType:'',
    maincolor:'',
    mmDic:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    util.requestUrl(getApp().globalData.setUrl + 'getMyList',
      { 'orderNo': getApp().globalData.subCode },
      function (res) {
        console.log(res);
        that.setData({ maincolor: res.data.color });
      });
    
    this.setData({ stype: options.stype });

    if(options.stype=='100')
    {
      this.setData({ tuikuanstate:'退款申请中'});
    }
    else if (options.stype == '101')
    {
      this.setData({show:true});
      this.setData({ tuikuanstate: '退款成功' });
    }
    else if (options.stype == '102') {
      this.setData({ show: true });
      this.setData({ tuikuanstate: '退款失败' });
    }
    else if (options.stype == '103') {
      this.setData({ tuikuanstate: '选择退款' });
    }


    var that = this;

    util.requestUrl(getApp().globalData.baseUrl + 'orderDetail',
      {
        'CODE': getApp().globalData.subCode,
        'USER_ID': wx.getStorageSync('userInfo').usersId,
        'ID': options.id
      },
      function (res) {
        console.log(res);
        var listdata = [];
        if (res.data.status == '200') {

          that.setData({ mmDic: res.data.order });

          that.setData({ oType: res.data.order.orderType});

          that.setData({ userDic: res.data.userAddress });

          for (var index in res.data.proList)
          {
              var sDic = res.data.proList[index];
              sDic.select = false;
              listdata.push(sDic);
          }

          that.setData({ dataAy: listdata });
        }


      });

  },
  selectRow:function(e){

    var mAy = [];
    for(var index in this.data.dataAy)
    {
      var dic = this.data.dataAy[index];
      if(dic.id==e.currentTarget.id)
      {
        if (dic.select == false) {
          dic.select = true;
        }
        else {
          dic.select = false;
        }

      }
     
      mAy.push(dic);
    }
    this.setData({dataAy:mAy});
  },
  confirm:function(e)
  {
      if(this.data.stype=='100')
      {
        //取消退款
      }
      else if(this.data.stype=='103')
      {
        //提交退款
        var strIds = '';
        var ay = [];
        for (var index in this.data.dataAy)
        {
          var dic = this.data.dataAy[index];
          if (dic.select)
          {
            ay.push(dic.id);
          }
        }
        strIds = ay.join(',');
        console.log(strIds);

        var that = this;

        util.requestUrl(getApp().globalData.baseUrl + 'orderExit',
          {
            'CODE': getApp().globalData.subCode,
            'ORDER_ID': this.data.mmDic.id,
            'USER_ID': wx.getStorageSync('userInfo').usersId,
            'PROD_IDS': strIds
          },
          function (res) {
            console.log(res);
              wx.showToast({
                title: res.data.info,
              })
            if(res.data.status=='200')
            {
              wx.navigateBack({
                delta:2
              })
            }
          });

      }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})