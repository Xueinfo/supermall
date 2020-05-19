// 防抖函数
export function debounce(func,delay){
    let timer = null
    return function(...args){
        if(timer) clearTimeout(timer)       
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}

// 转换时间戳封装函数
export function formatDate(date, fmt) {
    // 正则：
    // y+ 1个或者多个y
    // y* 0个或者多个y
    // y? 0个或者1个y
    if (/(y+)/.test(fmt)) {
        // RegExp.$1 表示匹配到的字符串
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,//获取月
      'd+': date.getDate(),//获取日
      'h+': date.getHours(),//获取小时
      'm+': date.getMinutes(),//获取分钟
      's+': date.getSeconds()//获取秒
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    //   为了遇到分钟或者是小时 为一个数字时 做截取用  
    // 如 原本是 4：4：4
    // 截取后：04：04：04
    return ('00' + str).substr(str.length);
  };