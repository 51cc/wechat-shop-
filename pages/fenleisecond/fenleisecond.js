var util = require('../../utils/util.js');
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    city: "",
    hasShops: false,
    shops: [],
    products: [],
    searchText: '',
    categorys: [],
    catePros: []

  },
  changcity: function (e) {
    wx.navigateTo({
      url: '../regions/regions?city=' + this.data.city,
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
  jumptosearchPro: function (e) {
    var that = this;
    console.log(this.data.searchText);
    wx.navigateTo({
      url: '../prolist/prolist?id=' + this.data.searchText,
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
  bindKeyInput: function (e) {
    this.setData({ searchText: e.detail.value });
  },
  jumptonextview: function (e) {
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
  jumptoallproduct: function (e) {
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
  jumptoorder: function (e) {
    wx.navigateTo({
      url: '../orders/orders?all=1',
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
  jumptoshops: function (e) {
    wx.navigateTo({
      url: '../clientlist/clientlist',
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
  jumptoshopdetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid=' + e.currentTarget.id,
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

  jumptodetail: function (e) {
    wx.setStorageSync('productId', e.currentTarget.id)
    wx.navigateTo({
      url: '../prodetail/prodetail',
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
  onLoad: function (options) {
    var that = this;
    var paraDic = { 'CITY_ID': wx.getStorageSync('cityCode'), 'CODE': getApp().globalData.subCode, };

    util.requestUrl(getApp().globalData.baseUrl + 'categoryList', paraDic, function (res) {
      if (res.data.status == '200') {
        var mAy = [];
        for (var i = 0; i < res.data.dataList.length; i++) {
          console.log(i);
          var dic = res.data.dataList[i];
          if (i == 0) {
            mAy.push({
              'categoryId': dic.categoryId,
              'name': dic.name,
              'selected': true
            });
            that.requestProduct(dic.categoryId);

          }
          else {
            mAy.push({
              'categoryId': dic.categoryId,
              'name': dic.name,
              'selected': false
            });
          }
        }
        that.setData({ categorys: mAy });
      }
    });
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  changeSelect: function (e) {
    var mAy = [];
    this.requestProduct(e.currentTarget.id);
    for (var index in this.data.categorys) {
      var dic = this.data.categorys[index];
      if (dic.categoryId == e.currentTarget.id) {
        mAy.push({
          'categoryId': dic.categoryId,
          'name': dic.name,
          'selected': true
        });
      }
      else {
        mAy.push({
          'categoryId': dic.categoryId,
          'name': dic.name,
          'selected': false
        });
      }
    }
    this.setData({ categorys: mAy });
  },
  requestProduct: function (catId) {
    var that = this;
    var paraDic = {
      'CITY_ID': wx.getStorageSync('cityCode'), 'CATEGORY_ID': catId,
      'CODE': getApp().globalData.subCode,
    };
    util.requestUrl(getApp().globalData.baseUrl + 'prodList', paraDic, function (res) {
      if (res.data.status == '200') {
        var listData = [];
        for (var index in res.data.dataList) {
          var dic = res.data.dataList[index];
          listData.push(dic);
        }
        that.setData({ catePros: listData });
      }
      else {

        wx.showLoading({
          title: '暂无数据',
        })

        setTimeout(function () {
          wx.hideLoading()
        }, 500)

        var listData = [];
        that.setData({ catePros: listData });

      }
    });
  },

  requestFirstData(city_code) {
    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'index', { 'CITY_ID': city_code, 'CODE': getApp().globalData.subCode, }, function (res) {
      if (res.data.status == '200') {
        that.setData({ imgUrls: res.data.advList });
        if (res.data.partnerList.length > 0) {
          console.log(res);
          that.setData({ hasShops: true });
          that.setData({ shops: res.data.partnerList });
        }

        var mAy = [];
        for (var i = 0; i < res.data.cateList.length; i++) {
          console.log(i);
          var dic = res.data.cateList[i];
          if (i == 0) {
            mAy.push({
              'categoryId': dic.categoryId,
              'name': dic.name,
              'selected': true
            });
            that.requestProduct(dic.categoryId);

          }
          else {
            mAy.push({
              'categoryId': dic.categoryId,
              'name': dic.name,
              'selected': false
            });
          }
        }
        that.setData({ categorys: mAy });
        that.setData({ products: res.data.prodList });
      }
    });
  },
  onShow: function () {
    
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