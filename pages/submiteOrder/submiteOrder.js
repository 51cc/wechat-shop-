var util = require('../../utils/util.js');
Page({
  data:{
    xsqg:'',
    mtype:0,
    single:true,
    imgUrl:'',
    title:'',
    price:'',
    num:'',
    proId:'',
    sumMoney:0.0,//商品总价

    youfei:'',//邮费
    dazhejian:'',//打折减多少
    youhuiMoney:{},//优惠钱数
    youhuiId:'',
    standId:'',
    standName:'',
    shifufei:0.0,//实际付费  sumMoney+youfei+dazhejian

    shoujianrenName:'请选择地址',
    shoujianrenPhone:'',
    shoujianrenAddress:'',
    shoujianrenAddressId:'',
    provice:'',
    addressAy: ['', '', '', '', '', ''],
    shopcars:[],
    clients:[],
    showAddressList:false,
    selectPros:[],
    isBuyNow:false,

    rowsData: [{ 'title': '姓名', 'placeName': '输入姓名', 'id': '0' },
    { 'title': '电话', 'placeName': '输入电话', 'id': '1' },
    { 'title': '地址', 'placeName': '输入详细地址', 'id': '3' }
    ],

    name: '',
    phone: '',
    quyu: '',
    address: '',
    clientId:'',
    clientName:'',
    beizhu: ''


  },
  bindKeyInput: function (e) {
    console.log(e);
    if (e.currentTarget.id == '0') {
      this.setData({ name: e.detail.value });
    }
    else if (e.currentTarget.id == '1') {
      this.setData({ phone: e.detail.value });
    }
    else if (e.currentTarget.id == '2') {
      this.setData({ quyu: e.detail.value });

    }
    else if (e.currentTarget.id == '3') {
      this.setData({ address: e.detail.value });
    }
    else if (e.currentTarget.id == '1989') {
      //备注
      this.setData({ beizhu: e.detail.value });  
    }
    else if (e.currentTarget.id == '1988')
    {

      var dic = this.data.clients[e.currentTarget.dataset.id];
      dic.beizhu = e.detail.value;
      console.log(dic.beizhu+e.detail.value);
      this.data.clients.splice(e.currentTarget.dataset.id, 1, dic);
      this.setData({ clients: this.data.clients });

    }
  },
  huoqukeyongyouhuiquan:function(e){

    var tAy = wx.getStorageSync('jiesuanThing');

    var jStr;
    var clientId;
    if (tAy.length > 0 && !this.data.isBuyNow)
    {
      
      var sDic = this.data.clients[e.currentTarget.dataset.id];
      var tAy = sDic.ay;
      var ay = [];
      for (var index in tAy) {
        var dic = tAy[index];
        ay.push({
          'id': dic.proid, 
          'num': dic.num, 
          'standid': dic.standid,
          'standName': dic.standName, });
      }
      clientId = sDic.clientId;
      jStr = JSON.stringify(ay);
    } 
    else
    {

      var ay = [{
        'id': this.data.proId,
        'num': this.data.num
      }];

      if (this.data.standId) {
        ay = [{
          'id': this.data.proId,
          'standid': this.data.standId,
          'standName': this.data.standName,
          'num': this.data.num,

        }];
      }

      clientId = this.data.clientId;

      jStr = JSON.stringify(ay);
    }


    wx.navigateTo({
      url: '../youhuiquanselect/youhuiquanselect?jstr=' + jStr + '&clientId=' + clientId,
    })
  },

  huoquShopCarYouFei:function(proviceName,sindex){
      
    console.log(sindex);
    
    var ssIndex = sindex;

    if ((ssIndex)>= this.data.clients.length) {

    }else{
      console.log(ssIndex);

      var sDic = this.data.clients[sindex];
      console.log(sDic);
      var tAy = sDic.ay;
      var ay = [];
      for (var index in tAy) {
        var dic = tAy[index];
        ay.push({ 'id': dic.proid, 'num': dic.num });
      }
      var clientId = sDic.clientId;
      var jStr = JSON.stringify(ay);

    var that = this;
    util.requestUrl(getApp().globalData.baseUrl + 'getExpenses',
      {
        'CODE': getApp().globalData.subCode,
        'PARTNER_ID': clientId,
        'JSON': jStr,
        'PROVINCE_NAME': proviceName
      }, function (res) {
          if(res.data.status=='200')
          {
            sDic.yunfei = res.data.money;
            that.data.clients.splice(sindex,1,sDic);
            that.setData({ clients: that.data.clients });

            var zj = 0.0;

            for (var i in that.data.clients) {
              var jDic = that.data.clients[i];

              var dic = that.data.clients[i];

              if (jDic.clientId == clientId) {
                var sMoney = 0.0;
                var yf = 0.0;
                for (var j in dic.ay) {
                  var mDic = dic.ay[j];
                  sMoney = sMoney + (mDic.price * mDic.num);
                }
                dic.sMoney = (sMoney + dic.yunfei - jDic.youhuiMoney.jMoney).toFixed(2);
                that.data.clients.splice(i, 1, dic);
              }
              zj = zj + parseFloat(dic.sMoney);

            }
            that.setData({ clients: that.data.clients});
            that.setData({ shifufei: zj.toFixed(2) });
            
            that.huoquShopCarYouFei(that.data.provice, ssIndex+1);
            
          }
      });
      
      }
  
  },
  jumpToAddress:function(e){
      
    var that = this;
    wx.chooseAddress({
      success: function (res) {

        that.setData({ shoujianrenName: res.userName });
        that.setData({ shoujianrenPhone: res.telNumber });
        that.setData({ shoujianrenAddress: (res.provinceName + res.cityName + res.countyName + res.detailInfo)});
        that.setData({ provice: res.provinceName});
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)

        if(that.data.mtype==0)
        {
//购物车购买
          for (var index in that.data.clients) 
          {
            console.log('gouwuche');
            that.huoquShopCarYouFei(res.provinceName,index);

          }
          
        }
        else if(that.data.mtype==3)
        {
          
        }
        else if(that.data.mtype==2)
        {
//限时抢购
          var ay = [{
            'id': that.data.proId,
            'num': that.data.num
          }];

          var clientId = that.data.clientId;
          console.log('----clientId ' + clientId);
          var jStr = JSON.stringify(ay);
          util.requestUrl(getApp().globalData.baseUrl + 'getExpenses',
            {
              'CODE': getApp().globalData.subCode,
              'PARTNER_ID': that.data.clientId,
              'JSON': jStr,
              'PROVINCE_NAME': res.provinceName
            },
            function (res) {
              console.log(res);
              that.setData({ youfei: res.data.money });
              console.log(that.data.youfei);
              console.log(that.data.sumMoney);
              console.log(that.data.youhuiMoney);
              if (that.data.youhuiMoney.jMoney) {

                that.setData({ shifufei: (parseFloat(that.data.sumMoney) + parseFloat(that.data.youfei) - parseFloat(that.data.youhuiMoney.jMoney)).toFixed(2) });
              }
              else {
                var sum = parseFloat(that.data.youfei) + parseFloat(that.data.sumMoney);
                console.log(sum);
                that.setData({ shifufei: sum.toFixed(2) });
              }

            });
        }
        else
        {
//单个购买
          var ay = [{
            'id': that.data.proId,
            'num': that.data.num
          }];

          var clientId = that.data.clientId;
        console.log('----clientId '+clientId);
          var jStr = JSON.stringify(ay);
          util.requestUrl(getApp().globalData.baseUrl + 'getExpenses',
           { 'CODE': getApp().globalData.subCode,
             'PARTNER_ID': that.data.clientId,
           'JSON':jStr,
           'PROVINCE_NAME': res.provinceName}, 
           function (res) {
             console.log(res);
             that.setData({ youfei:res.data.money});
            console.log(that.data.youfei);
            console.log(that.data.sumMoney);
            console.log(that.data.youhuiMoney);
            if (that.data.youhuiMoney.jMoney)
             {
              
               that.setData({ shifufei: (parseFloat(that.data.sumMoney) + parseFloat(that.data.youfei) - parseFloat(that.data.youhuiMoney.jMoney)).toFixed(2) });
             }
             else
             {
               var sum = parseFloat(that.data.youfei) + parseFloat(that.data.sumMoney);
              console.log(sum);
              that.setData({ shifufei: sum.toFixed(2)});
             }
 
          });
        }

      }
    })



  },
  deleteTheSelectThing:function()
  {
    var tAy = wx.getStorageSync('jiesuanThing');
    var sAy = wx.getStorageSync('shopCar');
    var mAy = sAy;
    for(var index in tAy)
    {
      var dic = tAy[index];
      for(var indexx in sAy)
      {
        var ddic = sAy[indexx];
        if(ddic.proid==dic.proid && ddic.standid==dic.standid)
        {
          
          mAy.splice(indexx,1);
        }
        else
        {
          
        }
      }
      
    }
    wx.setStorageSync('shopCar', mAy);
  },
  submiteTheOrder:function(e){

    var hasAddress = false;
    
    if (this.data.shoujianrenName.length > 0 && this.data.shoujianrenPhone.length > 0 && this.data.shoujianrenAddress.length > 0){
      hasAddress= true;
    }
   

    if (hasAddress)
    {
      if (!this.data.isBuyNow)
      {
        var tAy = wx.getStorageSync('jiesuanThing');

          var ay = [];

          for(var index in this.data.clients)
          {
            var sDic = this.data.clients[index];
            var sAy = [];
            for(var j in sDic.ay)
            {
              var ssdic = sDic.ay[j];
              sAy.push({
                'id': ssdic.proid,
                'num': ssdic.num,
                'standid': ssdic.standid,
                'standName': ssdic.standName,
              }); 
            }
            sDic.ay=sAy;
            sDic.youhuiquanId= sDic.youhuiMoney.sId;
            sDic.clientId = sDic.clientId;
            sDic.yunfei = sDic.yunfei;

            ay.push(sDic);
          }
          
      console.log(JSON.stringify(ay));

          var that = this;
          var  paraDic = 
   {'USER_ID':wx.getStorageSync('userInfo').usersId,
    'CODE': getApp().globalData.subCode,  
    'USERADDRESS_ID':this.data.shoujianrenAddressId,
    'LINKMAN': this.data.shoujianrenName,
    'MOBILE': this.data.shoujianrenPhone,
    'ADDRESS': this.data.shoujianrenAddress,
    'JSON':JSON.stringify(ay),
    'COUPONS': this.data.youhuiId,
    'PROVINCE_NAME': this.data.provice,
    'REMARK': this.data.beizhu,
    'MONEY':this.data.shifufei};
    console.log(paraDic);
    util.requestUrl(getApp().globalData.baseUrl +'addNewOrder',paraDic,function(res){
      console.log(res);
                if(res.data.status=='200')
                {
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                  });
                  that.deleteTheSelectThing();
                  util.requestUrl(getApp().globalData.baseUrl + 'preAllWechat', { 'CODE': getApp().globalData.subCode, 'ORDERNUM': res.data.order.ordernum }, function (res) {
                    console.log(res);

                    if (res.data.status == '200') {
                      wx.setStorageSync('youhuiquan', { 'sId': 0, 'jMoney': 0 });
                      var dic = JSON.parse(res.data.wechat);

                      wx.requestPayment({
                        timeStamp: dic.timeStamp,
                        nonceStr: dic.nonceStr,
                        package: dic.package,
                        signType: 'MD5',
                        paySign: dic.paySign,
                        'success': function (res) {
                          console.log(res);
                          wx.setStorageSync('youhuiquan', { 'sId': 0, 'jMoney': 0, 'clientId': '' });

                          wx.navigateBack({
                            delta: 5
                          })
                        },
                        'fail': function (res) {
                        }
                      });


                    }
                  });
                


                }
              });
       }
       else
       {
         var jiekou = '';
        if (this.data.mtype==2)
        {
//限时抢购
          jiekou ='addplOrder';
        }
        else if (this.data.mtype == 3)
        {
//砍价下单
          jiekou = 'addkjOrder';
          console.log('砍价下订单');
        }
        else{
          jiekou = 'addNewOrder';
        }
        
      var ay = [{'id':this.data.proId,
                  'num':this.data.num}];
      console.log(this.data.standId);
      if (this.data.standId)
      {
        ay = [{
          'id': this.data.proId,
          'standid': this.data.standId,
          'standName': this.data.standName,
          'num': this.data.num,
          
        }];
      }
      var rDic = {};
      if (this.data.youhuiMoney.sId)
      {
        rDic.youhuiquanId = this.data.youhuiMoney.sId;
        
      }
      else
      {
        rDic.youhuiquanId ='' ;//this.data.youhuiMoney.sId;
  
      }
      rDic.clientId = this.data.clientId;
      rDic.yunfei = this.data.youfei;
      rDic.beizhu = this.data.beizhu;
      rDic.ay = ay;
      
      console.log(rDic);

          var that = this;
          console.log(ay);     
    var  paraDic = 
   {'USER_ID':wx.getStorageSync('userInfo').usersId,
        'CODE': getApp().globalData.subCode,
        'COUPONS': this.data.youhuiId, 
        'PROVINCE_NAME': this.data.provice,
    'USERADDRESS_ID':this.data.shoujianrenAddressId,
    'LINKMAN': this.data.shoujianrenName,
    'MOBILE': this.data.shoujianrenPhone,
    'ADDRESS': this.data.shoujianrenAddress,
    'REMARK': this.data.beizhu,
    'JSON': JSON.stringify([rDic]),
    'MONEY':this.data.shifufei};

      console.log(paraDic);
      util.requestUrl(getApp().globalData.baseUrl + jiekou,paraDic,function(res){
      console.log(res.data.order);
      console.log(paraDic);
                if(res.data.status=='200')
                {

                  wx.setStorageSync('youhuiquan', { 'sId': 0, 'jMoney': 0 });
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000
                  });
                  util.requestUrl(getApp().globalData.baseUrl + 'preAllWechat', { 'CODE': getApp().globalData.subCode, 'ORDERNUM': res.data.order.ordernum}, function (res) {
                    
                    if (res.data.status == '200') {
                    
                      var dic = JSON.parse(res.data.wechat);

                      wx.requestPayment({
                        timeStamp: dic.timeStamp,
                        nonceStr: dic.nonceStr,
                        package: dic.package,
                        signType: 'MD5',
                        paySign: dic.paySign,
                        'success': function (res) {
                          console.log(res);

                          wx.setStorageSync('youhuiquan', { 'sId': 0, 'jMoney': 0, 'clientId': '' });


                          wx.navigateBack({
                            delta: 5
                          })
                        },
                        'fail': function (res) {
                          console.log(res);
                        }
                      });


                    }
                  });



                }
              });
              }
          

    }
    else
    {
        wx.showToast({
            title: '添加收货地址',
            icon: 'success',
            duration: 2000
          })
    }
  },


  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var subtype = options.id;
    console.log(subtype);
    if(subtype==2)
    {

      this.setData({xsqg:'1989'});

      if(options.isKj==1)
      {
//砍价订单
        this.setData({ mtype: 3 });

      }
      else
      {
//限时抢购
        this.setData({ mtype: 2 });

      }
      this.setData({ isBuyNow: true });
      var dic = wx.getStorageSync('buyNowThings');
      console.log(dic);
      this.setData({ standId: dic.standid });
      this.setData({ standName: dic.standName });
      this.setData({ proId: dic.proid });
      this.setData({ imgUrl: dic.imgUrl });
      this.setData({ title: dic.title });
      this.setData({ price: dic.price });
      this.setData({ clientId: dic.clientId });
      this.setData({ clientName: dic.clientName });
      this.setData({ num: dic.num });
      this.setData({ sumMoney: dic.sumMony });
      this.setData({ dazhejian: '0' });
      this.setData({ youfei: dic.yunfei });
      this.setData({ shoujianrenName: '请选择收货地址' });
      this.setData({ shifufei: dic.sumMony });
    }
    else
    {
      if (subtype!=1)
      {
        this.setData({ mtype: 0 });

         var tAy = wx.getStorageSync('jiesuanThing');

         console.log(tAy);

         var sum = 0.0;
         for(var index in tAy)
         {
            var dic =tAy[index];

            sum+=(parseFloat(dic.price)*parseInt(dic.num));
         }

        this.setData({youfei:'0'});
        this.setData({dazhejian:'0'});
        this.setData({shoujianrenName:'请选择收货地址'});
        this.setData({sumMoney:sum});
         this.setData({single:false});
         this.setData({shopcars:tAy});
         var mAy = this.data.shopcars;
         this.zuheData(mAy);
        }
        else
        {
              this.setData({ mtype:1});
              this.setData({ isBuyNow:true});
        var dic = wx.getStorageSync('buyNowThings');
        console.log(dic);
        this.setData({ standId: dic.standid});
            this.setData({ standName: dic.standName});
            this.setData({proId:dic.proid});
            this.setData({imgUrl:dic.imgUrl});
            this.setData({title:dic.title});
            this.setData({price:dic.price});
            this.setData({clientId:dic.clientId});
            this.setData({ clientName: dic.clientName });    
            this.setData({num:dic.num});
            this.setData({ sumMoney: dic.sumMony});
            this.setData({dazhejian:'0'});
            this.setData({youfei:dic.yunfei});
            this.setData({shoujianrenName:'请选择收货地址'});
            this.setData({ shifufei: dic.sumMony});

        }
      }
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  addAddress:function(){
      wx.navigateTo({
        url: '../addNewAddress/addNewAddress',
      })
  },
  onShow:function(){
    // 生命周期函数--监听页面显示

    var yhDic = wx.getStorageSync('youhuiquan');

    console.log(yhDic);
    
    if (yhDic.jMoney)
    {
      if (this.data.mtype==0)
      {
        
        var zj = 0.0;

        for (var i in this.data.clients)
        {
          var jDic = this.data.clients[i];
          var dic = this.data.clients[i];

          if (jDic.clientId == yhDic.clientId)
          {
            console.log(yhDic);
            var sMoney = 0.0;
            var yf = 0.0;
            for (var j in dic.ay) {
              var mDic = dic.ay[j];
              yf = mDic.yunfei;
              sMoney = sMoney + (mDic.price * mDic.num);
            }
            dic.sMoney = (sMoney + yf - yhDic.jMoney).toFixed(2);
            dic.beizhu = '';
            dic.youhuiMoney = yhDic;
            this.data.clients.splice(i, 1, dic);
          }
          zj = zj + parseFloat(dic.sMoney);

        }
        this.setData({ clients: this.data.clients });
        this.setData({ shifufei: zj.toFixed(2) });
      }
      else
      {
        this.setData({ youhuiMoney: yhDic });
      
        this.setData({ shifufei: (parseFloat(this.data.sumMoney) + parseFloat(this.data.youfei) - parseFloat(this.data.youhuiMoney.jMoney)).toFixed(2) });
      }
      
    }

   



    var dic = wx.getStorageSync('currentAddress');
    if(dic.addressId)
    {
      this.setData({shoujianrenName:dic.name});

      this.setData({shoujianrenPhone:dic.phone});

      this.setData({shoujianrenAddress:dic.address});

      this.setData({shoujianrenAddressId:dic.addressId});

    }

    
  },

  zuheData: function (ay) {


    for (var index in ay) {
      var dic = ay[index];

      this.chuChong(dic);
    }
    console.log(this.data.clients);
  },
  chuChong: function (mmDic) {
    console.log(mmDic);
    if (this.data.clients.length > 0) {
      var has = false;
      for (var index in this.data.clients) {
        var iDic = this.data.clients[index];
        if (iDic.clientId == mmDic.clientId) {
          delete mmDic.clientId;
          delete mmDic.clientName;
          iDic.ay.push(mmDic);
          has = true;
          this.data.clients.splice(index, 1, iDic);
          this.setData({ clients: this.data.clients });
        }
      }

      if (!has) {
        var sdic = {};
        sdic.ay = [];
        sdic.clientId = mmDic.clientId;
        sdic.clientName = mmDic.clientName;
        sdic.yunfei = mmDic.yunfei;
        delete mmDic.clientId;
        delete mmDic.clientName;
        sdic.ay.push(mmDic);

        console.log(sdic);

        this.data.clients.push(sdic);
        this.setData({ clients: this.data.clients });
      }
    }
    else {
      var sdic = {};
      sdic.ay = [];
      sdic.clientId = mmDic.clientId;
      sdic.clientName = mmDic.clientName;
      sdic.yunfei = mmDic.yunfei;
      delete mmDic.clientId;
      delete mmDic.clientName;
      sdic.ay.push(mmDic);

      this.data.clients.push(sdic);
      this.setData({ clients: this.data.clients });
    }




//增加备注 优惠券
    var  zj=0.0;

    for (var i in this.data.clients)
    {
      var sMoney = 0.0;
      var dic = this.data.clients[i];
      var yf=0.0;
      for(var j in dic.ay)
      {
        var mDic = dic.ay[j];
        yf = mDic.yunfei;
        sMoney = sMoney + (mDic.price * mDic.num);
      }
      dic.sMoney = (sMoney + yf).toFixed(2);
      
      dic.beizhu='';
      
      dic.youhuiMoney ={'sId': '',
                      'jMoney': 0.0,
                      'clientId': dic.clientId};

      zj = zj + parseFloat(dic.sMoney);
     
      this.data.clients.splice(i,1,dic);
    }
    this.setData({ clients: this.data.clients});
    this.setData({ shifufei: zj.toFixed(2)});


  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    wx.setStorageSync('youhuiquan', { 'sId': 0, 'jMoney': 0,'clientId':''});
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  }
})