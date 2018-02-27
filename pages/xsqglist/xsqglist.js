// xsqglist.js
var util = require('../../utils/util.js');
function countdown(that) {

  for(var index in that.data.dataAy)
  {

  var dic = that.data.dataAy[index];
  
  var arr = dic.endDate.split(/[- : \/]/),
    enddate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  console.log(enddate);

  var EndTime = new Date(enddate);
  
    var NowTime = new Date();

  var second = EndTime.getTime() - NowTime.getTime();

  second = second/1000;
  
  if (second == 0) {
    
    dic.time="00:00:00"

    that.data.dataAy.splice(index, 1, dic);
    that.setData({ dataAy: that.data.dataAy });
  }
  else
  {
    setInterval(function () {


      var h = 0;
      var m = 0;
      var s = 0;
      if (second > 0) {
        var h = Math.floor(second / 60 / 60);
        var m = Math.floor(second / 60);
        var s = Math.floor(second - h * 60 * 60 - m * 60);
      }
      dic.time = h + ':' + m + ':' + s;

      that.data.dataAy.splice(index,1,dic);

      that.setData({dataAy:that.data.dataAy});
    
    }
    , 1000)
  }
     
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasContent: false,
    item: { 'icon': '../../Asset/q_shangpin.png', 'title': '暂无抢购' },
    dataAy: []
  },
  jumptoxsqgDetail:function(e){
    wx.navigateTo({
      url: '../xsqgDetail/xsqgDetail?id='+e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中..',
    })
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'prodlimitList', 
    { 'CODE': getApp().globalData.subCode }, 
    function (res) {
      console.log(res);
      wx.hideLoading();
      if (res.data.status=='200')
      {
        that.setData({dataAy:res.data.dataList});
        
        if (that.data.dataAy.length > 0) {
          that.setData({ hasContent: true });
        }
        else {
          that.setData({ hasContent: false });
        }

          var timer = setInterval(function () {
            
            for (var index in that.data.dataAy) {
              
            var dic = that.data.dataAy[index];

            dic.time = "00:00:00";

            var arr = dic.endDate.split(/[- : \/]/), endDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);

            console.log(endDate);

            var EndTime = new Date(endDate);
            
            var NowTime = new Date();
            
            var second = EndTime.getTime() - NowTime.getTime();

            second = second / 1000;

            if (second == 0) {
              dic.time = "00:00:00"
              that.setData({ dataAy: that.data.dataAy });
            }
            else {

              var h = 0;
              var m = 0;
              var s = 0;
              if (second > 0) {
                var h = Math.floor(second / 60 / 60);
                var m = Math.floor((second - h * 60 * 60) / 60);
                var s = Math.floor(second - h * 60 * 60 - m * 60);
              }

              dic.time = h + ':' + m + ':' + s;


              if (h > 24) {
                var d = 0;
                var h = 0;
                var m = 0;
                var s = 0;
                if (second > 0) {
                  var d = Math.floor(second / 60 / 60 / 24)
                  var h = Math.floor((second - d * 24 * 60 * 60) / 60 / 60);
                  var m = Math.floor((second - d * 24 * 60 * 60 - h * 60 * 60) / 60);
                  var s = Math.floor(second - d * 24 * 60 * 60 - h * 60 * 60 - m * 60);
                }

                dic.time = d + '天' + h + ':' + m + ':' + s;
              }

              that.data.dataAy.splice(index, 1, dic);

              that.setData({ dataAy: that.data.dataAy });

            }
            }
          }, 1000);

          
          

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
    clearInterval();
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