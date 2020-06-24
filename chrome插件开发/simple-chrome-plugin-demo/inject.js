/** 此处共享页面DOM也共享变量事件... */
console.log('inject.js loaded.....')
//指定抢购时间点
const _TARGET_TIME_ = function(){ 
	let targetTime = new Date()
	targetTime.setHours(10)
	targetTime.setMinutes(0)
	targetTime.setSeconds(0)
	targetTime.setMilliseconds(0)
	return targetTime.getTime()
}()

init()

function init(){
  checkEventBinded()
  .then(res =>{
    console.log('耗时：'+res)
    setTimeout(initAction,200)
  })
  .catch(err =>console.log(err))
}

/**
 * 检测库是否加载，事件是否已绑定
 * @param {*} timeout 
 */
function checkEventBinded(timeout = 10){
	let s = Date.now()
	return new Promise((resolve,reject) =>{
		let handler = setInterval(function(){
			if(window && window.KISSY && window.KISSY.Event){
				clearInterval(handler)
				resolve(`${Date.now() - s} ms`)
			}else{
				let d = Date.now()
				if((d - s) / 1000 > timeout){
					clearInterval(handler)
					console.log('check times more than 10 sec , timeout....')
					reject('timeout')
				}
			}
		},50)
	})
}

function initAction(){
	console.log(window.KISSY)
	console.log('matching url...')
	let test_detail_url = 'detail.tmall.com/item.htm' //详情页面
	let test_order_url = 'buy.tmall.com/order/confirm_order.htm' //提交订单页面
	let test_pay_url = 'cashiersa128.alipay.com/standard/lightpay/lightPayCashier.htm' //支付页面
	let url = window.location.href
	if(url.includes(test_detail_url)){
		console.log('match goods detail page....')
		actionDetail()
	}else if(url.includes(test_order_url)){
		console.log('match submit order page....')
		actionOrder()
	}else if(url.includes(test_pay_url)){
		console.log('match pay pge....')
		actionPay()
	}else{
		return
	}
}

function actionDetail(){
  let S = window.KISSY
	let isTimeOver = () => {
    console.log(Date.now() - _TARGET_TIME_)
    return Date.now() - _TARGET_TIME_ >= 0
  }
	let buyBtnElement = document.querySelector('#J_LinkBuy')
  if(buyBtnElement){
    console.log('find buy button, click buy button....')
    let handler = setInterval(function(){
      if(isTimeOver()){
        clearInterval(handler)
        S.Event.fire(buyBtnElement,'click')
      }
    },50)
  }else{
    console.log('unfind buy button over.')
  }
}

function actionOrder(){ //点击提交订单
  let S = window.KISSY
	let btn = document.querySelector("a.go-btn")
	if(btn){
		console.log('find submit order button, submit order....')
    S.Event.fire(btn,'click')
	}else{
    console.log('unfind submit order over.')
  }
}

function actionPay(){
	//输入支付密码支付
}
