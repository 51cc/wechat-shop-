var util = require('../../utils/util.js');
Page({
  data: {
    categorys: [],
    products: [],
    firstImg:''

  },
  jumptodetail: function (e) {
    console.log(e.currentTarget.id);
    wx.setStorageSync('isFirstByCatId', '9999');
    wx.navigateTo({
      url: '../prolist/prolist?id=' + e.currentTarget.id,
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
  selectOtherCategory: function (e) {
    console.log(e);
    var mAy = [];
    for (var index in this.data.categorys) {
      var dic = this.data.categorys[index];
      var mDic;
      if (dic.categoryId == e.currentTarget.id) {
        mDic = {
          'image':dic.image,
          'name': dic.name,
          'categoryId': dic.categoryId,
          'selected': true
        };
        this.setData({ firstImg: dic.image });

      }
      else {
        mDic = {
          'image': dic.image,
          'name': dic.name,
          'categoryId': dic.categoryId,
          'selected': false
        };
      }
      mAy.push(mDic);
    }
    this.setData({ categorys: mAy });

    this.requestProduct(e.currentTarget.id);
  },

  
  requestProductCategory: function (catId) {
    var that = this;
    var paraDic = {
      'CITY_ID': wx.getStorageSync('cityCode'), 'parentId': catId,
      'CODE': getApp().globalData.subCode,
    };
    util.requestUrl(getApp().globalData.baseUrl + 'categoryList', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        var listData = [];
        for (var index in res.data.dataList) {
          var dic = res.data.dataList[index];
          listData.push(dic);
        }
        that.setData({ products: listData });
      }
      else {

        wx.showLoading({
          title: '暂无数据',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 500)

        var listData = [];
        that.setData({ products: listData });

      }
    });
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    var paraDic = { 'CITY_ID': wx.getStorageSync('cityCode'), 'CODE': getApp().globalData.subCode, };

    util.requestUrl(getApp().globalData.baseUrl + 'categoryList', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {
        var listData = [];
        for (var index in res.data.dataList) {
          var dic = res.data.dataList[index];
          var mDic;
          if (index == 0) {
            mDic = {
              'image':dic.icon,
              'name': dic.name,
              'categoryId': dic.categoryId,
              'selected': true
            };
          }
          else {
            mDic = {
              'image': dic.icon,
              'name': dic.name,
              'categoryId': dic.categoryId,
              'selected': false
            };

          }

          listData.push(mDic);
        }
        that.setData({ categorys: listData });
        var dic = that.data.categorys[0];
        that.setData({ firstImg: dic.image});
        that.requestProduct(dic.categoryId);
      }
    });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})