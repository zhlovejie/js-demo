/**如何确定页面的浏览器选项卡是否处于前台活跃状态？ */
const isBrowserTabFocused = () => !document.hidden;
/**如何将一个字符串复制到剪贴板 */
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
/**POST 请求 */
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

/**GET 请求 */
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
/**获取当前 URL 参数的对象 */
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}
  );
/**移动设备还是桌面设备 */
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
  'Mobile' :
  'Desktop';

/**指定元素是否在视口可见 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect();
  const {
    innerHeight,
    innerWidth
  } = window;
  return partiallyVisible ?
    ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
    top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

/**平滑滚动到页面顶部 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

/**切换元素的类 */
const toggleClass = (el, className) => el.classList.toggle(className);
/**元素是否具有指定的类 */
const hasClass = (el, className) => el.classList.contains(className);
/**检测奇偶 偶数返回true 奇数返回false */
const checkEvenOdd = n => (n & 1) === 0

/**获取当前元素相对于文档的坐标 */
function getOffset(elem) {
  if (!elem || elem.nodeType !== 1) {// 非元素直接返回
    return
  }
  if (!elem.getClientRects().length) { // display:none 
    return { top: 0, left: 0 }
  }
  const rect = elem.getBoundingClientRect()
  const win = elem.ownerDocument.defaultView
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  }
}

/**
 * 获取文件后缀名
 * @param {String} filename
 */
function getExt(filename) {
  if (typeof filename == 'string') {
      return filename
          .split('.')
          .pop()
          .toLowerCase()
  } else {
      throw new Error('filename must be a string type')
  }
}

/**
 * 休眠xxxms
 * @param {Number} milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 生成随机id
 * @param {*} length
 * @param {*} chars
 */
function uuid(length, chars) {
  chars =
      chars ||
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  length = length || 8
  var result = ''
  for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**
 *深拷贝
 * @ * @param {*} obj
 * @returns
 */
function deepCopy(obj) {
  if (typeof obj != 'object') {
      return obj
  }
  if (obj == null) {
      return obj
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 数组去重
 * @param {*} arr
 */
function uniqueArray(arr) {
  if (!Array.isArray(arr)) {
      throw new Error('The first parameter must be an array')
  }
  if (arr.length == 1) {
      return arr
  }
  return [...new Set(arr)]
}

/**
 * 对象转化为formdata
 * @param {Object} object
 */

function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
      const value = object[key]
      if (Array.isArray(value)) {
          value.forEach((subValue, i) =>
              formData.append(key + `[${i}]`, subValue)
          )
      } else {
          formData.append(key, object[key])
      }
  })
  return formData
}

// 保留小数点以后几位，默认2位
function cutNumber(number, no = 2) {
  if (typeof number != 'number') {
      number = Number(number)
  }
  return Number(number.toFixed(no))
}

// js错误捕获处理
function handleGlobalError(){
  // JS运行中的大部分异常（包括语法错误），都会触发window上的error事件执行注册的函数，
  // 不同于try catch，onerror既可以感知同步异常也可以感知异步任务的异常（除了promise异常）
  // message：错误信息（字符串）。
  // source：发生错误的脚本URL（字符串）
  // lineno：发生错误的行号（数字）
  // colno：发生错误的列号（数字）
  // error：Error对象（对象）
  window.onerror = function(message, source, lineno, colno, error) {
    logger.log('捕获到异常：',{ message, source, lineno, colno, error });
  }

  // 作为以上方案的补充版，promise异常的捕获依赖于全局注册unhandledrejection，使用方法如下
  window.addEventListener('unhandledrejection', (e) => {
    console.error('catch', e)
  }, true)
}