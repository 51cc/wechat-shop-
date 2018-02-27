// commentwrite.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataAy: [],
    commentsAy:[],
    orderId:''
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
    console.log(e.currentTarget.id);

    var dic ;
    if (e.detail.value.length != 0) {
       dic = {
        'id': e.currentTarget.id,
        'content': e.detail.value
      };
      }


    if (this.data.commentsAy.length)
    {
      var has = false;
      var mIndex;
      for (var index in this.data.commentsAy)
      {
        var mDic = this.data.commentsAy[index];
        if (mDic.id == e.currentTarget.id)
        {
          has = true
          mIndex = index;

        }
      }

      if(has)
      {
        this.data.commentsAy.splice(mIndex,1,dic);

      }
      else
      {
        this.data.commentsAy.push(dic);
      }

    }
    else
    {
        this.data.commentsAy.push(dic);
    }


  },
  submite:function(){

    var jStr = JSON.stringify(this.data.commentsAy);
    console.log(jStr);
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'addComment', { 'CODE': getApp().globalData.subCode,
      'JSON': jStr, 'orderId': this.data.orderId,
     'userId': wx.getStorageSync('userInfo').usersId }, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        wx.showLoading({
          title: '评论成功',
        })

        setTimeout(function () {
          wx.hideLoading()
          wx.navigateBack({
            delta: 2, // 回退前 delta(默认为1) 页面
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
        }, 2000)

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({ orderId: options.id});
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'preComment', { 'CODE': getApp().globalData.subCode, 'orderId': options.id, 'userId': wx.getStorageSync('userInfo').usersId }, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        that.setData({dataAy:res.data.dataList});
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