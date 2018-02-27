var util = require('../../utils/util.js');
Page({
  data:{
    searchBy:'',
    sheight:0,
    products:[],
    showlist:false,
    cId:'',
    swDic: {},
    isloading:false,
    spage:1,
    totalPage:0,
    selecteds: [
    { 'name': '新品', 'selected': false, 'id': '111' },
    { 'name': '销量', 'selected': false, 'id': '222' },
    { 'name': '价格', 'selected': false, 'id': '333' },],
    categorys:[],
    brands:[],
    pingjia:'1',
    jiage:1,
    hasContent: false,
    item: { 'icon': '../../Asset/q_shangpin.png', 'title': '加载中...' }
  },

  // 从这里进行刷新操作
  scrollLower:function(){
    console.log('-----------');
    console.log(this.data.spage + '' + this.data.totalPage);

    if (this.data.spage < this.data.totalPage) 
    {
      this.setData({ isloading: false });
      this.data.swDic.isOpenPage = 'Y';
      this.data.swDic.CATEGORY_ID = this.data.cId;
      this.data.swDic.searchBy = this.data.searchBy;
      this.setData({ spage: (this.data.spage + 1) });
      this.data.swDic.currentPage = this.data.spage;
      this.requestAllData(this.data.swDic);
    }
  

  },


  changProTitle: function () {
    var ay = [];
    for (var index in this.data.products) {
      var dic = this.data.products[index];
      if (dic.fullName.length > 23) {
        var str = dic.fullName.substring(0, 23);
        dic.fullName = str + '...';
      }
      ay.push(dic);
    }

    this.setData({ products: ay });
  },
  jumptodetail:function(e)
 {
   wx.setStorageSync('productId', e.currentTarget.id)
  wx.navigateTo({
    url: '../prodetail/prodetail',
    success: function(res){
      // success
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
 },
  selectTheProById:function(e)
  {
            this.setData({showlist:false});

    console.log('------'+e.currentTarget.id);
    var paraDic ;
    if(e.currentTarget.id=='SALE'||e.currentTarget.id=='HOT')
    {
      paraDic= {
        'CATEGORY_ID':this.data.cId,
        'CODE': getApp().globalData.subCode,
      'CITY_ID':wx.getStorageSync('cityCode'),          
             'searchBy':e.currentTarget.id};
    }
    else{
    paraDic= {
      'CATEGORY_ID': this.data.cId,
      'CODE': getApp().globalData.subCode,
      'CITY_ID':wx.getStorageSync('cityCode'),           
      'CATEGORY_ID':e.currentTarget.id};
      }
var that = this;
    util.requestUrl(getApp().globalData.baseUrl+'prodList',paraDic,function(res){
                if(res.data.status=='200')
                {
                  var listData = [];
                for(var index in res.data.dataList)                       {
                    var dic = res.data.dataList[index];
                    listData.push(dic);
                }
that.setData({products:listData});
// that.changProTitle();
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
                  if (that.data.products.length > 0)
                   {
                    that.setData({ hasContent: true });
                  }
                  else
                  {
                    that.setData({ hasContent: false });
                    that.setData({ item: { 'icon': '../../Asset/q_shangpin.png', 'title': '暂无商品' }});
                  }
                }
              });
  },
  showbrand:function(e)
  {

    if(e.target.id =='000')
    {
        this.setData({showlist:true});
        var listData = [];
        for(var bIndex in this.data.brands)
        {
            var dic = this.data.brands[bIndex];
            console.log(dic);
            listData.push(dic);
        }
        that.setData({ isloading: true });
        this.setData({categorys:listData});
        console.log(this.data.categorys);
    }
    else if(e.target.id=='111')
    {
        
      var paraDic = {
        'CATEGORY_ID': this.data.cId,
        'CODE': getApp().globalData.subCode,
        'CITY_ID': wx.getStorageSync('cityCode'), 
        'searchBy': 'NEW'
      };

      this.setData({ searchBy:'NEW'});
      this.setData({ isloading: true });
      this.setData({ products: [] });
      this.setData({ spage: 1});
      this.setData({ swDic: paraDic });

      this.requestAllData(paraDic);

    }
    else if(e.target.id=='222')
    {
        
       var  paraDic = {
         'CATEGORY_ID': this.data.cId,
         'CODE': getApp().globalData.subCode,
         'CITY_ID':wx.getStorageSync('cityCode'),               
         'searchBy':'SALE'};
       this.setData({ searchBy: 'SALE' });
       this.setData({ isloading: true });
       this.setData({ products: [] });
       this.setData({ spage: 1});
       this.setData({ swDic: paraDic });

       this.requestAllData(paraDic);


    }
    else if(e.target.id=='333')
    {

        this.setData({showlist:false});
        var jiages = '';
        if(this.data.jiage==1)
        {
          jiages = 'GTPRICE';
          this.setData({jiage:2});
        }
        else 
        {
          jiages = 'LTPRICE';
          this.setData({ jiage: 1});
        }
       var  paraDic = 
        {
         'CATEGORY_ID': this.data.cId,
         'CODE': getApp().globalData.subCode,
         'CITY_ID':wx.getStorageSync('cityCode'),               
         'searchBy': jiages
         };
       this.setData({ searchBy: jiages });
       this.setData({ isloading: true });
       this.setData({ products: [] });
       this.setData({ spage: 1});
       this.setData({ swDic: paraDic });

       this.requestAllData(paraDic);

//     util.requestUrl(getApp().globalData.baseUrl+'prodList',paraDic,function(res){
//                 if(res.data.status=='200')
//                 {
//                   var listData = [];
//                 for(var index in res.data.dataList)                       {
//                     var dic = res.data.dataList[index];
//                     listData.push(dic);
//                 }
// that.setData({products:listData});
// if (that.data.products.length > 0)
//  {
//                     that.setData({ hasContent: true });
//                   }
//                 }
//               });
    }




     var newData = [];
     for(var index in this.data.selecteds)
     {
        var newobj;
        var obj = this.data.selecteds[index];
     
        if(e.target.id==obj.id)
        {
         newobj = {'name':obj.name,'selected':true,'id':obj.id};    
         this.data.selecteds.splice(index,1,newobj); 
        }
        else
        {
          newobj = {'name':obj.name,'selected':false,'id':obj.id}; 
          this.data.selecteds.splice(index,1,newobj); 
        }

      }
      this.setData({selecteds:this.data.selecteds});
  },

  resetsearch:function(e)
  {
      this.setData({showlist:false});
  },
  confirmsearch:function(e)
  {
      this.setData({showlist:false});


  },

  requestAllData:function(sDic){
      
      var that = this;
      
      wx.showLoading({
        title: '加载中..',
      })
      sDic.isOpenPage = 'Y';
      sDic.CODE = getApp().globalData.subCode;
      sDic.currentPage = this.data.spage;
console.log(sDic);
      util.requestUrl(getApp().globalData.baseUrl + 'prodList', 
      sDic, function (res) {
        console.log(res);
        wx.hideLoading();

        that.setData({ totalPage: res.data.page.totalPage});

        if (res.data.status == '200') 
        {

          for (var index in res.data.dataList) {
            var dic = res.data.dataList[index];
            that.data.products.push(dic);
          }
          that.setData({ products: that.data.products});

          if (that.data.products.length > 0) 
          {
            that.setData({ hasContent: true });
          }
          else 
          {
            that.setData({ hasContent: false });
          }

        }

      });

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

    var res = wx.getSystemInfoSync()
    this.setData({ sheight: res.windowHeight });



    var that = this;



    wx.showLoading({
      title: '加载中..',
    })



    var paraDic;

    if(options.id=='1')
    {
      paraDic = {
        'CITY_ID': wx.getStorageSync('cityCode'), 
        'CODE': getApp().globalData.subCode};
    }
    else if(options.id=='2')
    {
      paraDic = {
        'CITY_ID':wx.getStorageSync('cityCode'),     
        'searchBy':'NEW',
        'CODE': getApp().globalData.subCode,};
      this.setData({ searchBy:'NEW'});
    }
    else if(options.id=='3')
    {
      paraDic = {
        'CITY_ID':wx.getStorageSync('cityCode'),                                           'searchBy':'HOT',
        'CODE': getApp().globalData.subCode,};
      this.setData({ searchBy: 'HOT' });

    }
    else
    {
            paraDic = {
            'CITY_ID':wx.getStorageSync('cityCode'),
            'NAME':options.id,
            'CODE': getApp().globalData.subCode,};

            if(wx.getStorageSync('isFirstByCatId')=='9999')
            {
              wx.setStorageSync('isFirstByCatId', '');
              this.setData({ cId: options.id});
              paraDic = {
                'CITY_ID':wx.getStorageSync('cityCode'),
                'CATEGORY_ID':options.id,
                'CODE': getApp().globalData.subCode,
              };
            }
    }
                console.log(paraDic);
    



    this.requestAllData(paraDic);



      util.requestUrl(getApp().globalData.baseUrl+'categoryList',
      paraDic,function(res){
                if(res.data.status=='200')
                {
                  var listData = [];
                   for(var index in res.data.dataList)                    
                   {
                    var dic = res.data.dataList[index];
                    listData.push(dic);
                   }
                  that.setData({brands:listData});

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