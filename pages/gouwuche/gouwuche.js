Page({
  data:{
    sheight:0.0,
    clients:[],
    products:[],
    selectAll:false,
    sumMoney:0,
    hasContent:false,
    item: { 'icon': '../../Asset/q_gouwuche.png',   'title': '购物车还是空的哦，快去逛逛吧'}  
    },
  jiesuan:function(e)
  {
      var selectAy = [];
      for(var index in this.data.products)
      {
        var dic = this.data.products[index];
        if(dic.select)
        {
          selectAy.push(dic);
        }
      }
      if(selectAy.length!=0)
      {
        wx.setStorageSync('jiesuanThing', selectAy);

        wx.navigateTo({
          url: '../submiteOrder/submiteOrder',
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
                title: '选择至少一个产品',
                icon: 'success',
                duration: 2000
              })

      }
  },
  sum:function(){
    var sum = 0.0;
    for(var index in this.data.products)
    {
      var obj = this.data.products[index];
      if(obj.select)
      {
            var num = parseInt(obj.num);
            var price = parseFloat(obj.price);
          sum+=(num*price);
      }
    }
    this.setData({sumMoney:sum.toFixed(2)});
  },
  cancleSelectAll:function(e){
    this.setData({selectAll:false});
    var dataAy = this.data.products;
    for(var index in this.data.products)
    {
      var obj = dataAy[index];
      var newObj = {'title':obj.title,
      'imgUrl':obj.imgUrl,
      'proid':obj.proid,
      'standid': obj.standid,
      'standName': obj.standName,
      'id':obj.id,
      'price':obj.price,
      'num':obj.num,
      'yunfei': obj.yunfei,
      'select':false};
      dataAy.splice(index,1,newObj);

    }
      this.setData({products:dataAy});
      this.sum();
  },
  selectAll:function(e){
    this.setData({selectAll:true});
      var dataAy = this.data.products;
    for(var index in this.data.products)
    {
      var obj = dataAy[index];
      var newObj = {'title':obj.title,
        'imgUrl':obj.imgUrl,
        'proid':obj.proid,
        'standid': obj.standid,
        'standName': obj.standName,
      'id':obj.id,
      'price':obj.price,
      'num':obj.num,
      'yunfei': obj.yunfei,
      'select':true};
      dataAy.splice(index,1,newObj);

    }
      this.setData({products:dataAy});
            this.sum();
  },
  deleteTheData:function(e){
      console.log(e.target.id);
      
      var shopPros = wx.getStorageSync('shopCar');

      if (shopPros.length == 0) {
        shopPros = [];
        this.setData({ products: shopPros });
        this.setData({ clients:[]});
      }
      else{
        shopPros.splice(e.target.id, 1);
        var midAy = [];
        for (var index in shopPros) {
          var sdic = shopPros[index];
          sdic.id = index;
          midAy.push(sdic);
        }
        this.setData({ products: midAy });
        wx.setStorageSync('shopCar', midAy);
        // this.setData({ products: shopPros });
        // wx.setStorageSync('shopCar', shopPros);
        this.setData({ clients: [] });
        this.zuheData(shopPros);

      }
      

      this.sum();

      if (this.data.products.length > 0) {
        this.setData({
          hasContent: true
        });
      }
      else {
        this.setData({
          hasContent: false
        });
      }
  },
  jumptodetail:function(e){
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
  add:function(e){
    // console.log(e.target.id);
    this.setData({ clients:[]});
    var dataAy = this.data.products;
    var obj = dataAy[e.target.id];
    // console.log(obj);
    var num = parseInt(obj.num)+1;
    var newObj = {'title':obj.title,
      'imgUrl':obj.imgUrl,
      'id': obj.id, 
      'proid': obj.proid, 
      'price': obj.price, 
      'num': num, 
      'yunfei': obj.yunfei,
      'select': obj.select, 
      'standid': obj.standid,
      'clientId': obj.clientId,
      'clientName': obj.clientName,
      'standName': obj.standName };
    
    dataAy.splice(e.target.id,1,newObj);

    this.setData({products:dataAy});

    wx.setStorageSync('shopCar', this.data.products);

    this.sum();
    this.zuheData(dataAy);
  },
  plus:function(e){
    // console.log(e.target.id);
    
    var dataAy = this.data.products;
    var obj = dataAy[e.target.id];
    // console.log(obj.num);

    if(parseInt(obj.num)>1)
    {

      this.setData({ clients: [] });

      var num = parseInt(obj.num)-1;

      var newObj = {'title':obj.title,
        'imgUrl':obj.imgUrl,
        'id': obj.id, 
        'proid': obj.proid, 
        'price': obj.price,
         'num': num, 
         'yunfei': obj.yunfei,
         'select': obj.select, 
         'standid': obj.standid,
         'clientId': obj.clientId,
         'clientName': obj.clientName,
        'standName': obj.standName};

      dataAy.splice(e.target.id,1,newObj);
      this.setData({products:dataAy});


      wx.setStorageSync('shopCar', this.data.products);


      this.zuheData(dataAy);
      this.sum();

    }

  },
selectTheThing:function(e){
  this.data.clients.splice(0, this.data.clients.length);
  var dataAy = this.data.products;
    var obj = dataAy[e.target.id];
    var newObj = {'title':obj.title,
      'imgUrl':obj.imgUrl,
      'id': obj.id, 
      'proid': obj.proid, 
      'price': obj.price, 
      'num': obj.num,
      'yunfei': obj.yunfei,
       'select': true, 
       'standid': obj.standid,
       'clientId': obj.clientId,
       'clientName': obj.clientName,
      'standName': obj.standName};
    
    dataAy.splice(e.target.id,1,newObj);

    this.setData({products:dataAy});
    this.sum();
    this.zuheData(dataAy);

},
cancleTheThing:function(e){
  this.data.clients.splice(0, this.data.clients.length);
    var dataAy = this.data.products;
    var obj = dataAy[e.target.id];
    var newObj = {'title':obj.title,
      'imgUrl':obj.imgUrl,
      'id': obj.id, 
      'proid': obj.proid, 
      'price': obj.price, 
      'num': obj.num, 
      'yunfei':obj.yunfei,
      'select': false, 
      'standid': obj.standid,
      'clientId': obj.clientId,
      'clientName': obj.clientName,
      'standName': obj.standName};
    
    dataAy.splice(e.target.id,1,newObj);

    this.setData({products:dataAy});

          this.sum();
          this.zuheData(dataAy);

          if (this.data.products.length > 0) {
            this.setData({
              hasContent: true
            });
          }
          else {
            this.setData({
              hasContent: false
            });
          }
},
  onLoad:function(options){
    // 生命周期函数--监听页面加载

    var res = wx.getSystemInfoSync()

    this.setData({ sheight: res.windowHeight });
    
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  zuheData:function(ay){

    if(ay.length>0)
    {
      for (var index in ay) {
        var dic = ay[index];

        this.chuChong(dic);
      }

    }
    else
    {
      this.setData({ clients: []});
    }
    
    console.log(this.data.clients);
  },
  chuChong:function(mmDic){
    if (this.data.clients.length>0)
    {
      var has = false;
      for (var index in this.data.clients) 
      {
          var iDic = this.data.clients[index];
          if(iDic.clientId==mmDic.clientId)
          {
            delete mmDic.clientId;
            delete mmDic.clientName;
            iDic.ay.push(mmDic);
            has = true;
            this.data.clients.splice(index,1,iDic);
            this.setData({ clients: this.data.clients });
          }
      }

      if(!has)
      {
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
    else
    {
      var sdic = {};
      sdic.ay = [];
      sdic.clientId=mmDic.clientId;
      sdic.clientName = mmDic.clientName;
      sdic.yunfei = mmDic.yunfei;

      delete mmDic.clientId;
      delete mmDic.clientName;      
      sdic.ay.push(mmDic);

      this.data.clients.push(sdic);
      this.setData({clients:this.data.clients});
    }
  },
  onShow:function(){
    // 生命周期函数--监听页面显示

    var shopPros = wx.getStorageSync('shopCar');

    this.setData({ products: shopPros });

    if(shopPros.length==0)
    {
      shopPros = [];
      this.setData({ clients: []});
    }
    else
    {
      this.setData({clients:[]});
      this.zuheData(shopPros);
    }
  

   

    // console.log(this.data.products);
    
    this.sum();
    

    if (this.data.products.length > 0)
    {
      this.setData({
        hasContent: true  });
    }
    else {
      this.setData({
        hasContent: false
      });
    }
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