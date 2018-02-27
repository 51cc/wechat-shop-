const conf = {
  data: {

    selectNum:'',
    selectDay:'',
    selectTime:'',
    dangnian: '',
    dangyue: '',
    dangri: '',

    jiezhinian:'',
    jiezhiyue:'',
    jiezhiri:'',

    dayNum:0,
    sDic:{},
    shijiandianAy:[],
    hasEmptyGrid: true
  },
  onLoad(options) {

    console.log(JSON.parse(options.tStr));


    this.setData({ selectNum: options.selectNum});
    var ssDic = JSON.parse(options.tStr);

    this.setData({sDic:ssDic});

    console.log(this.data.dayNum);

    for (var index in ssDic.timeslot)
    {
      var mDic = ssDic.timeslot[index];
      this.data.shijiandianAy.push(mDic.time);
    }

    this.setData({ shijiandianAy: this.data.shijiandianAy});

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })

    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;

    var myDate = new Date();
    myDate.getDate();

    this.setData({ dangnian: cur_year });
    this.setData({ dangyue: cur_month });
    this.setData({ dangri: myDate.getDate() });

    var dd = new Date();
    dd.setDate(dd.getDate() + this.data.sDic.pz.appointDay);

    this.setData({ jiezhinian: dd.getFullYear()});
    this.setData({ jiezhiyue: (dd.getMonth() + 1) });
    this.setData({ jiezhiri: dd.getDate()});



    this.setData({ selectDay: (cur_year + '-' + cur_month + '-'+ myDate.getDate())});

    console.log(this.data.jiezhinian);
    console.log(this.data.jiezhiyue);
    console.log(this.data.jiezhiri);

    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })

  },
  selectTheDay: function (e) {

    var ssAy = [];
    for (var index in this.data.days) 
    {
      var sDic = this.data.days[index];
      var mDic = {};
      console.log(sDic);
      if (index == (e.currentTarget.id - 1)) 
      {
        mDic = { 'day': sDic.day, 'select': true, 'kexuan':sDic.kexuan, 'dangri': sDic.dangri};
      }
      else 
      {
        mDic = { 'day': sDic.day, 'select': false, 'kexuan':sDic.kexuan, 'dangri': sDic.dangri};
      }

      ssAy.push(mDic);
    }

    this.setData({ days: ssAy });
    
    this.setData({selectDay:(this.data.cur_year + '-' + this.data.cur_month + '-' + e.currentTarget.id)});


  },

  selectTime:function(e){

    var rDic = this.data.sDic.timeslot[e.currentTarget.id];

    if (this.data.selectNum >parseInt(rDic.personnum))
    {
      wx.showToast({
        image: '../../Asset/tanhao.png',
        title: '预约人数超额',
      })
    }
    else
    {
    var str = this.data.shijiandianAy[e.currentTarget.id];

    var rDic = this.data.sDic.timeslot[e.currentTarget.id];

    console.log(this.data.selectDay);

    var strs = (this.data.selectDay).split("-");
    console.log(strs);

    var nian ='';
    var yue = '';
    var ri = '';
    for(var index in strs)
    {
      console.log(strs[index]);
      if(index==0)
      {
        nian = strs[index];
      }
      else if(index==1)
      {
        console.log(strs[index]);
        if(parseFloat(strs[index])<=9)
        {
          if(strs[index].length==1)
          {
            yue = '0' + '' + strs[index];
          }
          else
          {
            yue = strs[index];
          }
        }
        else
        {
          yue =strs[index];
        }
      }
      else if(index==2)
      {
        console.log(strs[index]);
        if (parseInt(strs[index])<= 9) {
          if(strs[index].length==1)
          {
            ri = '0' + '' + strs[index];
          }
          else
          {
            ri = strs[index];
          }
        }
        else {
          ri = strs[index];
        }
      }

    }

    this.setData({ selectDay:(nian+'-'+yue+'-'+ri)});

    console.log(this.data.selectDay + ' ' + str);
var that = this;
    wx.showLoading({
      title: '加载中',
    })

    var paraDic = {
      'code': getApp().globalData.subCode,
      'serviceId': this.data.sDic.data.id,
      'assessDate': (this.data.selectDay + ' ' + str),
      'peopleNum': rDic.personnum
    };
    
    console.log(paraDic);

    wx.request({
      url: getApp().globalData.newBaseUrl + 'getAppointOrderCount',
      data:paraDic ,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideLoading();
        
        console.log(res);
        if(res.data.data)
        {
            wx.setStorageSync('selectTime',{'day': that.data.selectDay,
                                        'peopleNum': rDic.personnum,
                                            'hour':str});

              wx.navigateBack({
                delta:1
              });
        }
        else
        {
          wx.showToast({
            image:'../../Asset/tanhao.png',
            title: res.data.info,
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    }
  

  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);

    let empytGrids = [];

    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }

  },
  getDatNum(index,year,month)
  {
    var day;
    const thisMonthDays = this.getThisMonthDays(year, month);

    console.log(this.data.sDic.pz.appointDay);    

    if (this.data.sDic.pz.appointDay>(thisMonthDays-index))
    {
      if(month==this.data.dangyue)
      {
        day=thisMonthDays;
      }
      else if(month>this.data.dangyue)
      {
        this.setData({dangri:0});
        day = this.getDateNum(0, this.data.dangnian,);
      }
    }
    else 
    {
      day = index + this.data.sDic.pz.appointDay;
    }
    return day;
  },


  calculateDays(year, month) {

    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    var jintianTime = (new Date(this.data.dangnian, this.data.dangyue - 1, this.data.dangri)).getTime();

    var jiezhiTime = (new Date(this.data.jiezhinian, this.data.jiezhiyue - 1, this.data.jiezhiri)).getTime();
    

    for (let i = 1; i <= thisMonthDays; i++) 
    {

        // console.log(this.data.dangnian+''+this.data.dangyue+''+this.data.dangri);
        // console.log(year+ '' + month + '' + i);
        // console.log(this.data.jiezhinian + '' + this.data.jiezhiyue + '' + this.data.jiezhiri);

        var curtTime = (new Date(year, month - 1, i)).getTime();

        // console.log(curtTime);

        var dic = {};

        if (curtTime == jintianTime)
        {
          
            dic = { 'day': i, 'select': true, 'kexuan': true, 'dangri': true };
        }
        else if (curtTime > jintianTime &&curtTime<=jiezhiTime)
        {
            dic = { 'day': i, 'select': false, 'kexuan': true, 'dangri': false };
        }
        else
        {
          dic = { 'day': i, 'select': false, 'kexuan': false, 'dangri': false }; 
        }

      days.push(dic);
    }

    this.setData({
      days
    });
  },



  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);




      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  }

};

Page(conf);
