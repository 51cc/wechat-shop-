function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Format(fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Date.prototype.Format = Format;

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}


function requestUrl(url,params,success){ 
    wx.request({
      url: url,
      data: params,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
              success(res);

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

}

//此方法会将一个对象中增加一些属性 不会创建新对象 只会返回之前对象的引用  第一个参数是一个json数组 第二个是一个json对象
function addAttr(obj, attr) {
  /*
    如果没有传东西是 undefined  typeof 为 undefined             Object.prototype.toString.call(obj) = [object Undefined]
    如果传 null 就是 null typeof 为 object                     Object.prototype.toString.call(obj) = [object Null]
    如果传入数字就是 数字本身 typeof 为 number                   Object.prototype.toString.call(obj) = [object Number]
    如果传入字符串就是 字符串本身 typeof 为 string                Object.prototype.toString.call(obj) = [object String]
    如果传入布尔值就是 布尔值本身 typeof 为 boolean               Object.prototype.toString.call(obj) = [object Boolean]
    如果传入json对象就是 json对象本身 typeof 为 object           Object.prototype.toString.call(obj) = [object Object]
    如果传入自定义对象就是 自定义对象本身 typeof 为 object         Object.prototype.toString.call(obj) = [object 自定义对象]
    如果传入数组对象就是 数组对象本身 typeof 为 object            Object.prototype.toString.call(obj) = [object Array]
    如果传入函数对象就是 函数对象本身 typeof 为 function          Object.prototype.toString.call(obj) = [object Function]
  */
  if (obj == null || typeof (obj) == "undefined") {
    return null;
  }
  if (typeof (obj) == "object" && Object.prototype.toString.call(obj) == "[object Array]" && obj.length > 0) {
    if (typeof (attr) == "undefined" || attr == null) {
      return obj;
    }
    if (typeof (attr) == "object" && Object.prototype.toString.call(attr) == "[object Object]") {
      for (var key in obj) {
        for (var id in attr) {
          if (typeof (obj[key]) == "object" && Object.prototype.toString.call(obj[key]) == "[object Object]") {
            obj[key][id] = attr[id];
          }
        }
      }
      return obj;
    } else {
      return obj;
    }
  } else {
    return obj;
  }
}


function jsonObjIsEmpty(obj) {
  　　for (var name in obj) {
    return false;//返回false，不为空对象
  　　}
  　　return true;//返回true，为空对象
}

//全局使用  当点击一个元素的时候选中并将其他的设置为非选中状态
function selectItem(id, items) {
  for (var i = 0; i < items.length; i++) {
    if (id == items[i].id) {
      items[i].style = 'select';
    } else {
      items[i].style = 'unselect';
    }
  }
  return items;
}

/*
js 中的定时器  一个是 setTimeout()   clearTimeout()  另一个是 setInterval()  clearInterval()
js 中将一个字符串进行执行的函数  eval()
 */

module.exports = {
  formatTime: formatTime,
  trim: trim,
  requestUrl: requestUrl,
  addAttr: addAttr,
  jsonObjIsEmpty: jsonObjIsEmpty,
  selectItem: selectItem
}



