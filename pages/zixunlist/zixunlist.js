// zixunlist.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheight: 0,
    isloading: false,
    spage: 1,
    totalPage: 0,

    jikouming:'',
    stype:'',
    news: [],
    hasContent: false,
    item: { 'icon': '../../Asset/q_shipin.png', 'title': '暂无视频' }
  },
  scrollLower: function () {
    console.log('-----------');
    if (this.data.spage < this.data.totalPage) 
    {
      this.setData({ spage: (this.data.spage + 1) });
      this.requestAllData();
    }
  },
  requestAllData:function()
  {
    var that = this;
    var paraDic = {};

    paraDic.isPage = 'Y';
    paraDic.CODE = getApp().globalData.subCode;
    paraDic.currentPage = this.data.spage;

    util.requestUrl(getApp().globalData.baseUrl + this.data.jikouming, paraDic,
      function (res) {

        console.log(res);

        wx.hideLoading();

        that.setData({ totalPage: res.data.totalPage });

        if (res.data.status == '200') {

          for (var index in res.data.dataList)
          {
            that.data.news.push(res.data.dataList[index]);
          }

          that.setData({ news: that.data.news });

        }

        if (that.data.news.length > 0) {
          that.setData({ hasContent: true });
        }
        else {
          that.setData({ hasContent: false });
        }
      });
  },
  jumptonewsdetail:function(e ){
    if(this.data.stype=='1')
    {
      //带视频
      wx.navigateTo({
        url: '../zixundetail/zixundetail?id=' + e.currentTarget.id,
      })
    }
    else
    {
      //不带视频
      wx.navigateTo({
        url: '../newsdetail/newsdetail?id=' + e.currentTarget.id,
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });

    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    var paraDic = {
      'CODE': getApp().globalData.subCode,
    };
    // var jikouming = '';

    if(options.type=='1')
    {
      
      this.setData({ jikouming:'videoList'});
      //视频资讯
      wx.setNavigationBarTitle({
        title: '视频',
      })
      this.setData({stype:'1'});
      this.setData({ item: { 'icon': '../../Asset/q_shipin.png', 'title': '暂无视频' } })
    }
    else
    {
      this.setData({ jikouming: 'newsList' });
      //普通资讯
      wx.setNavigationBarTitle({
        title: '活动资讯',
      })
      this.setData({item: { 'icon': '../../Asset/q_zixun.png', 'title': '暂无资讯' }})
      }

    this.requestAllData();
    
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