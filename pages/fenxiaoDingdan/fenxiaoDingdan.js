// fenxiaoDingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [
      { 'name': '全部', 'select': true, 'id': 0 },
      { 'name': '待付款', 'select': false, 'id': 1 },
      { 'name': '已付款', 'select': false, 'id': 2 },
      { 'name': '已完成', 'select': false, 'id': 3 }],
    orders: ['', '', '', '', '', '', '', '', '', '']
  },
  changetotrue: function (e) {

    var newAy = [];
    for (var obj in this.data.categorys) {
      var newobj;
      var oldD = this.data.categorys[obj];
      if (oldD.select) {
        newobj = {
          'name': oldD.name, 'select': false,
          'id': oldD.id
        };
        this.data.categorys.splice(obj, 1, newobj);
      }
    }
    var selectObj = this.data.categorys[e.target.id];
    var newobj = {
      'name': selectObj.name,
      'select': true,
      'id': selectObj.id
    };
    this.data.categorys.splice(e.target.id, 1, newobj);

    this.setData({ categorys: this.data.categorys });

    // if (parseInt(e.target.id) == 0)
    //   this.setData({ state: '' });
    // else
    //   this.setData({ state: parseInt(e.target.id) + 1 });

    // console.log(this.data.state);
    // this.requestData(this.data.state);


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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