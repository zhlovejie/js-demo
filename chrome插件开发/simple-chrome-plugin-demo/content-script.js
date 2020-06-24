/** 此处共享页面DOM 不共享变量事件等... */
document.addEventListener('DOMContentLoaded', function()
{
	console.log('脚本已注入执行...')
	setTimeout(injectCustomJs,0)
})



// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || './inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = () => this.parentNode.removeChild(this)
	document.body.appendChild(temp)
}


