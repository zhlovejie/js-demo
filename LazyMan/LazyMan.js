function LazyMan(name){
	return new _LazyMan(name)
}

function _LazyMan(name){
	this._name = name
	this._queue = []
	this._queue.push(this.display)

	var t = this
	setTimeout(function(){t.next()},0)
}

_LazyMan.prototype = {
	constructor:_LazyMan,
	display:function(){
		console.log('Hi! This is '+(this._name || 'Hank11111'))
		this.next()
	},
	sleepDisplay:function(delay){
		console.log('Wake Up after '+String(delay))
		this.next()
	},
	sleep:function(delay){
		var t = this
		t._queue.push(function(){
			setTimeout(function(){
				t.sleepDisplay(delay)
			},delay * 1000)
		})
		return this
	},
	sleepFirst : function(delay){
		var t = this
		t._queue.unshift(function(){
			setTimeout(function(){
				t.sleepDisplay(delay)
			},delay * 1000)
		})
		return this
	},
	eat : function(foodName){
		var t = this
		t._queue.push(function(){
			console.log('eat '+foodName+' ...')
			t.next()
		})
		return this
	},
	next : function(){
		var task = this._queue.shift()
		task && task.call(this)
	}
}

//test

// LazyMan('Hank')

 LazyMan('Hank').sleep(3).eat('dinner')

// LazyMan('Hank').eat('dinner').eat('supper')

//LazyMan('Hank').sleepFirst(5).eat('supper')