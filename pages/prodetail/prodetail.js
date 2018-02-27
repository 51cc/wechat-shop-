var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
Page({
  data:{
    imgUrls: [],
    oldPrice:0.0,
    proNum:1,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showRule:false,
    services:[],
    title:'',
    price:'',
    proNumber:'',
    proId:'',
    clientId:'',
    clientName:'',
    clientAddress:'',
    clientIcon:'',
    pingjiaScore:'',

    imgUrl:'',
    sumPrice:0,
    commentsNum: '',
    isMoreRules:false,//判断是不是多规格  非多规格处理不一样
    selectRulesId:[],//所选规格的ID  数组
    selectIds:'',
    selectRulesName: [],//所选规格的名称 数组
    selectNames:'',
    moreRulesPrice:[],
    moreLastId:'',
    rules: [],
    nodes:'',
    youfei:'',
    xiaoliang:'',
    isColl:0,
    isMianYi:true,//如果是面议 隐藏购买等
    phone:''//商家电话
    


  },
  callclient:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    });
  },
  selectTheItem:function(e){
    
    // console.log(e.currentTarget.id.substr(32));
    // console.log(e.currentTarget.id.substring(0,32));

    var index = e.currentTarget.id.substr(32);
    var pId = e.currentTarget.id.substring(0,32);
    
      var iDic = this.data.rules[index];

      for(var j in iDic.items)
      {
        var jDic = iDic.items[j];
        if(jDic.id==pId)
        {
          jDic.selected = true;
        }
        else
        {
          jDic.selected = false;
        }
        iDic.items.splice(j,1,jDic);
      }
      this.data.rules.splice(index,1,iDic);
      this.setData({rules:this.data.rules});
      this.theRulesId();
  },

  theRulesId:function(){
    for(var i in this.data.rules)
    {
      var mDic = this.data.rules[i];
      for (var j in mDic.items)
      {
        var nDic = mDic.items[j];
        if (nDic.selected)
        {
          this.data.selectRulesId.splice(i,1,nDic.id);
          this.data.selectRulesName.splice(i,1,nDic.name);
          
        }
      }
    }

    this.setData({ selectIds: this.data.selectRulesId.join("_") });
    this.setData({ selectNames: this.data.selectRulesName.join("_") });



    for (var i in this.data.moreRulesPrice) {
      var dic = this.data.moreRulesPrice[i];

      // console.log(dic.standardId);

      // console.log(this.data.selectIds);

      if (dic.standardId == this.data.selectIds) {
        this.setData({ price: dic.price });
        this.setData({ proNumber: dic.stock });
        this.setData({ moreLastId: dic.id });        this.jisuanMoney();
      }
    }


  },




  jumptoclientdetail:function(){
    // console.log('----------------');
    var that = this;
    wx.navigateTo({
      url: '../clientdetail/clientdetail?parentid=' + that.data.clientId,
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
  jumptocomments:function(e)
  {
    wx.navigateTo({
      url: '../commentsList/commentsList?id=' + this.data.proId,
    })
  },
  jumptokefu:function(e){

  },
  jumptoshoucang:function(e){
    var that = this;
    var  paraDic = 
   {'USER_ID':wx.getStorageSync('userInfo').usersId, 
        'CODE': getApp().globalData.subCode,
          'PRODUCT_ID':this.data.proId};
    util.requestUrl(getApp().globalData.baseUrl+'prodCollect',paraDic,function(res){
      // console.log(res);
      console.log(paraDic);
              if(res.data.status=='200')
              {
                that.setData({ isColl: 1 });

                wx.showToast({
                  title: '收藏成功',
                  icon: 'success',
                  duration: 2000
                })
            
              }
        });


  },
  jumptogouwuche:function(e){
        // this.setData({showRule:true});
    wx.switchTab({
      url: '../gouwuche/gouwuche'
    })
  },
  jairugouwuche:function(e){
    this.setData({showRule:true});
  },
  add:function(e){
    var num = this.data.proNum;
    num=num+1;
    this.setData({"proNum":num});
    this.jisuanMoney();
  },
  plus:function(e){
    var num = this.data.proNum;
    if(num>1)
      num=num-1;
    this.setData({"proNum":num});
    this.jisuanMoney();

  },
  buynow:function(e){
        this.setData({showRule:true});

  },
  selectrules:function(e){
    this.setData({showRule:true});
  },
  addshopcarbuttom:function(e){
    if (this.data.proNumber>0)
    {

 
    console.log(this.data.clientId);
    console.log(this.data.clientName);



    var shopPros = wx.getStorageSync('shopCar');

    
    if (shopPros.length == 0) {
      shopPros = [];
    }

    var mPros = shopPros;
    
    var has = false; 

    for(var index in shopPros)
    {
        var dic = shopPros[index];
        if (dic.proid == this.data.proId && dic.standid == this.data.moreLastId)
        {
          var addNum = 0;
          addNum=parseInt(dic.num)+parseInt(this.data.proNum);
          singleDic = {
                  'yunfei': 0,
                  'clientId':this.data.clientId,
                  'clientName':this.data.clientName,
                  'select':false,
                  'imgUrl':this.data.imgUrl,
                  'title':this.data.title,
                  'proid':this.data.proId,
                  'price': this.data.price.toString(),
                  'sumMony':this.data.sumPrice.toString(),
                  'id':index,
                  'standid': this.data.moreLastId,
                  'standName': this.data.selectNames,
                  'num':addNum.toString()};
          shopPros.splice(index,1,singleDic);
          has = true;
        }
    }
    if(!has)
    {
      var singleDic = {
                  'yunfei': 0,
                  'clientId': this.data.clientId,
                  'clientName': this.data.clientName,
                  'select':false,
                  'imgUrl':this.data.imgUrl,
                  'title':this.data.title,
                  'proid':this.data.proId,
                  'id':shopPros.length,
                  'standid': this.data.moreLastId,
                  'standName': this.data.selectNames,
                  'price': this.data.price.toString(),
                  'sumMony':this.data.sumPrice.toString(),
                  'num':this.data.proNum.toString()};
      
      shopPros.push(singleDic);
    }



    wx.setStorageSync('shopCar', shopPros);

    // wx.showLoading({
    //   title: '添加成功',
    // })
    wx.showToast({
      title: '添加成功',
    })
    }
    else
    {
      wx.showToast({
        title: '库存不足',
      })
    }

    // setTimeout(function(){
    //   wx.hideLoading()
    //   wx.navigateBack({
    //     delta: 1, // 回退前 delta(默认为1) 页面
    //     success: function(res){
    //       // success
    //     },
    //     fail: function(res) {
    //       // fail
    //     },
    //     complete: function(res) {
    //       // complete
    //     }
    //   })
    // },2000)






  },



  closeRuleView:function(e){
        this.setData({showRule:false});
  },







  buynowbuttom:function(e){

    if (this.data.proNumber > 0) {
    var singleDic = {
                  'yunfei':0,
                  'clientId': this.data.clientId,
                  'clientName': this.data.clientName,
                  'standid': '',
                  'standName':'',
                  'select':false,
                  'imgUrl':this.data.imgUrl,
                  'title':this.data.title,
                  'proid':this.data.proId,
                  'id':0,
                  'price': this.data.price.toString(),
                  'sumMony':this.data.sumPrice.toString(),
                  'num':this.data.proNum.toString()};

    if (this.data.isMoreRules)
    {
      var singleDic = {
        'yunfei': 0,
        'clientId': this.data.clientId,
        'clientName': this.data.clientName,
        'standid': this.data.moreLastId,
        'standName': this.data.selectNames,
        'select': false,
        'imgUrl': this.data.imgUrl,
        'title': this.data.title,
        'proid': this.data.proId,
        'id': 0,
        'price': this.data.price.toString(),
        'sumMony': this.data.sumPrice.toString(),
        'num': this.data.proNum.toString()
      };
    }
    // console.log('===============');
    // console.log(singleDic);

    wx.setStorageSync('buyNowThings',singleDic);

    wx.navigateTo({
      url: '../submiteOrder/submiteOrder?id='+1,
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
    }
    else
    {
      wx.showToast({
        title: '库存不足',
      })
    }
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;

    // var productID = '04fb12cf946d43dd9f6a3534b8f97858';

    // console.log(wx.getStorageSync('productId'));
  var proId;
  if(options.id)
  {
    proId = options.id;
  }
  else
  {
    proId = wx.getStorageSync('productId');

  }
    var paraDic =
      {
        'USER_ID': wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
        'PRODUCT_ID':proId
      };

    // console.log(paraDic);
    util.requestUrl(getApp().globalData.baseUrl + 'prodDetail', paraDic, function (res) {
      console.log(res);
      if (res.data.status == '200') {


        //图文
        var str1 = res.data.data.detail;

        // that.setData({nodes:str1});
        WxParse.wxParse('article', 'html', str1, that, 20);
        that.setData({ isColl: res.data.isColl });

        that.setData({ commentsNum: res.data.data.commentCount });
        that.setData({ title: res.data.data.name });
        that.setData({ price: res.data.data.price });
        that.setData({ youfei: res.data.data.expenses });
        that.setData({ xiaoliang: res.data.data.saleCount });

        that.setData({ oldPrice: res.data.data.oldPrice });

        that.setData({ proNumber: res.data.data.totalCount });
        that.setData({ clientAddress: res.data.partner.address });
        that.setData({ clientName: res.data.partner.title });
        that.setData({ clientId: res.data.partner.id });
        that.setData({ clientIcon: res.data.partner.img });
        if (res.data.imgList.length > 0) {
          that.setData({ imgUrls: res.data.imgList });
          var picDic = res.data.imgList[0];
          that.setData({ imgUrl: picDic.img });
        }
        else {
          that.setData({ imgUrls: [] });
        }


        that.setData({ proId: res.data.data.productId });


        var sScore = [];
        sScore.push({ score: res.data.partner.swwg, sTitle: '实物外观' });
        sScore.push({ score: res.data.partner.spzl, sTitle: '商品质量' });
        sScore.push({ score: res.data.partner.fwzl, sTitle: '服务质量' });
        sScore.push({ score: res.data.partner.psxl, sTitle: '配送效率' });
        that.setData({ services: sScore });

        that.jisuanMoney();


        if (res.data.data.tradeWay == '1') {
          that.setData({ price: '面议' });
          that.setData({ phone: res.data.partner.mobile });

          that.setData({ isMianYi: false });
        }

        //多规格判断-------
        if (res.data.data.isStandard == '1') {

          that.setData({ moreRulesPrice: res.data.standField });
          var bigAy = [];

          for (var i in res.data.standardInfo) {
            var mDic = res.data.standardInfo[i];
            var smallAy = [];
            for (var j in mDic.standardInfoList) {
              var nDic = mDic.standardInfoList[j];
              var nnDic = { 'id': nDic.id, 'name': nDic.name, 'selected': (j == 0 ? true : false) };
              smallAy.push(nnDic);
            }
            bigAy.push({ 'title': mDic.typeName, 'items': smallAy });
          }


          that.setData({ rules: bigAy });
          that.setData({ isMoreRules: true });

          for (var i in that.data.rules) {
            var mDic = that.data.rules[i];
            for (var j in mDic.items) {
              if (j == 0) {
                var nDic = mDic.items[0];
                that.data.selectRulesId.push(nDic.id);
                that.data.selectRulesName.push(nDic.name);
              }
            }
          }
          that.setData({ selectIds: that.data.selectRulesId.join("_") });
          that.setData({ selectNames: that.data.selectRulesName.join("_") });

          for (var i in that.data.moreRulesPrice) {
            var dic = that.data.moreRulesPrice[i];

            // console.log(dic.standardId);

            // console.log(that.data.selectIds);

            if (dic.standardId == that.data.selectIds) {
              that.setData({ price: dic.price });
              that.setData({ proNumber: dic.stock });
              that.setData({ moreLastId: dic.id });
              that.jisuanMoney();
            }
          }


        }
        // that.setData({pingjiaScore:});
      }
    });

  },
  onShow:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onReady:function(){
//     var that = this;

//     // var productID = '04fb12cf946d43dd9f6a3534b8f97858';

//     // console.log(wx.getStorageSync('productId'));

//    var  paraDic = 
//      {
//        'USER_ID': wx.getStorageSync('userInfo').usersId, 
//        'CODE': getApp().globalData.subCode, 
//        'PRODUCT_ID': wx.getStorageSync('productId')
//        };

//     // console.log(paraDic);
//     util.requestUrl(getApp().globalData.baseUrl+'prodDetail',paraDic,function(res){
//         console.log(res);
//                 if(res.data.status=='200')
//                 {


//                 //图文
//                var str1 =res.data.data.detail;

// // that.setData({nodes:str1});
//               WxParse.wxParse('article', 'html', str1, that,20);
//               that.setData({ isColl: res.data.isColl});

//               that.setData({ commentsNum: res.data.data.commentCount });
//                 that.setData({title:res.data.data.name});
//               that.setData({price:res.data.data.price});
//               that.setData({ youfei: res.data.data.expenses });
//               that.setData({ xiaoliang: res.data.data.saleCount });

//               that.setData({ oldPrice: res.data.data.oldPrice });

//       that.setData({proNumber:res.data.data.totalCount});
//                 that.setData({clientAddress:res.data.partner.address});
//                 that.setData({clientName:res.data.partner.title});
//                 that.setData({clientId:res.data.partner.id});
//                 that.setData({clientIcon:res.data.partner.img});
//                 if(res.data.imgList.length>0)
//                 {
//                 that.setData({imgUrls:res.data.imgList});
//                 var picDic = res.data.imgList[0];
//                 that.setData({imgUrl:picDic.img});
//                 }
//                 else
//                 {
//               that.setData({imgUrls:[]});
//                 }


//                 that.setData({ proId: res.data.data.productId});
                

//                 var sScore = [];
//                 sScore.push({score:res.data.partner.swwg,                             sTitle:'实物外观'});
//                 sScore.push({score:res.data.partner.spzl,                             sTitle:'商品质量'});
//                 sScore.push({score:res.data.partner.fwzl,                             sTitle:'服务质量'});
//                 sScore.push({score:res.data.partner.psxl,                             sTitle:'配送效率'});
//               that.setData({services:sScore});

//               that.jisuanMoney();


//               if (res.data.data.tradeWay == '1')
//               {
//                 that.setData({ price: '面议' });
//                 that.setData({ phone: res.data.partner.mobile });

//                 that.setData({isMianYi:false});
//               }

// //多规格判断-------
//               if (res.data.data.isStandard=='1')
//               {

//                 that.setData({ moreRulesPrice: res.data.standField});
//                 var bigAy = [];

//                 for (var i in res.data.standardInfo)
//                 {
//                   var mDic = res.data.standardInfo[i];
//                   var smallAy = [];
//                   for (var j in mDic.standardInfoList)
//                   {
//                     var nDic = mDic.standardInfoList[j];
//                     var nnDic = { 'id': nDic.id, 'name': nDic.name,'selected':(j==0?true:false)};
//                     smallAy.push(nnDic);
//                   }
//                   bigAy.push({ 'title': mDic.typeName, 'items': smallAy});
//                 }


//                 that.setData({rules:bigAy});
//                 that.setData({ isMoreRules:true});

//                 for (var i in that.data.rules) {
//                   var mDic = that.data.rules[i];
//                   for (var j in mDic.items) {
//                     if (j == 0) {
//                       var nDic = mDic.items[0];
//                       that.data.selectRulesId.push(nDic.id);
//                       that.data.selectRulesName.push(nDic.name);
//                     }
//                   }
//                 }
//                 that.setData({ selectIds: that.data.selectRulesId.join("_") });
//                 that.setData({ selectNames: that.data.selectRulesName.join("_") });

//                 for (var i in that.data.moreRulesPrice)
//                 {
//                   var dic = that.data.moreRulesPrice[i];
                  
//                   // console.log(dic.standardId);
                  
//                   // console.log(that.data.selectIds);
                  
//                   if (dic.standardId == that.data.selectIds)
//                   {
//                     that.setData({ price: dic.price});
//                     that.setData({ proNumber: dic.stock });
//                     that.setData({ moreLastId:dic.id});
//                     that.jisuanMoney();
//                   }
//                 }


//               }
//               // that.setData({pingjiaScore:});
//                 }
//               });


  },
  jisuanMoney:function()
  {
    var money = parseInt(this.data.proNum)*parseFloat(this.data.price);
    this.setData({sumPrice:money.toFixed(2)});
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
    
  },

/*
  aldminishare: function (e) {
    var page = this;
    var url = page['__route__'];
    var data = {};

    data = e.currentTarget.dataset
    data['path'] = url;
    wx.showToast({
      title: '分享生成中...',
      icon: 'loading',
      duration: 999999
    })
    wx.request({
      method: 'post',
      url: 'https://shareapi.aldwx.com/Main/action/Template/Template/applet_htmlpng',
      data: data,
      success: function (data) {
        if (data.data.code === 200) {
          wx.previewImage({
            urls: [data.data.data]
          })
        }
        // 关闭loading
        wx.hideLoading()
      },
      complete: function () {
        wx.hideLoading()
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  },
*/
  onShareAppMessage: function () {
    // 用户点击右上角分享
    var that = this;
    return {
      title: this.data.title, // 分享标题
      desc: '', // 分享描述
      path: 'pages/prodetail/prodetail?id=' + that.data.proId// 分享路径
    }
  }
})