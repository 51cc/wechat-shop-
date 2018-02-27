// zixundetail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    time: '',
    show:false,
    videoUrl:'',
    img:'',
    newsId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    var paraDic = {
      'CODE': getApp().globalData.subCode,
      'id': options.id
    };
    util.requestUrl(getApp().globalData.baseUrl + 'videoDetail', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        // that.setData({ news: res.data.dataList });
        // if (res.data.dataList.isVideo)
        // {
        //   that.setData({ show: false });

        // }
        // else
        // {
        //   that.setData({ show: true });          
        // }
        
        that.setData({ videoUrl: res.data.dataList.videoUrl });
        
        that.setData({ img: res.data.dataList.icon });

        that.setData({ title: res.data.dataList.title});
        that.setData({ time: res.data.dataList.createtime });
        var str1 = res.data.dataList.detail;

    WxParse.wxParse('article', 'html', str1, that, 20);

      }
    });
    //
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