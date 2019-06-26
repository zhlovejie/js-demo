//基础版本
function bubbleSort(list){
	let _count = 0
	let len = list.length
	for(let i = 0;i<len - 1;i++){
		for(let j=0;j<len - 1 - i;j++){
			_count++
			if(list[j] > list[j+1]){
				swap(j,j+1)
			}
		}
	}

	sortStepLog('v',_count)

	function swap(v1,v2){
		let tmp
		tmp = list[v1]
		list[v1] = list[v2]
		list[v2] = tmp
	}
}

//优化版本1 如果有序直接结束
function bubbleSortV1(list){
	let _count = 0

	let len = list.length
	for(let i=0;i<len - 1;i++){
		let isSorted = true //假设每次都是有序的
		for(let j=0;j<len - 1 - i;j++){
			_count++
			if(list[j] > list[j+1]){
				swap(j,j+1)
				isSorted = false //发生交互，说明是无序的
			}
		}
		if(isSorted) break //如果没有发生交换，说明已经有序，直接结束
	}
	sortStepLog('v1',_count)
	function swap(v1,v2){
		let tmp
		tmp = list[v1]
		list[v1] = list[v2]
		list[v2] = tmp
	}
}

//优化版本2 只处理无序的数据
function bubbleSortV2(list){
	let _count = 0

	let len = list.length
	let sortBorder = len -1 //无序边界 默认全部
	let sortBorderTmp = 0   //记录每次交互位置

	for(let i=0;i<len - 1;i++){
		let isSorted = true //假设每次都是有序的
		for(let j=0;j<sortBorder;j++){
			_count++
			if(list[j] > list[j+1]){
				swap(j,j+1)
				isSorted = false
				sortBorderTmp = j
			}
		}
		sortBorder = sortBorderTmp //每轮结束后确定新的无序边界
		if(isSorted) break //如果没有发生交换，说明已经有序，直接结束
	}
	sortStepLog('v2',_count)
	function swap(v1,v2){
		let tmp
		tmp = list[v1]
		list[v1] = list[v2]
		list[v2] = tmp
	}
}

function test(){
	let arr  = randomIntArray(20)
	let arr1 = arr.slice()
	let arr2 = arr.slice()
	bubbleSort(arr)
	console.log(arr)

	bubbleSortV1(arr1)
	console.log(arr1)

	bubbleSortV2(arr2)
	console.log(arr2)
  //-----------------------------------------------
	let _arr  = [5,8,6,3,9,2,1,7]
	let _arr1 = _arr.slice()
	let _arr2 = _arr.slice()

	bubbleSort(_arr)
	console.log(_arr)
	
	bubbleSortV1(_arr1)
	console.log(_arr1)

	bubbleSortV2(_arr2)
	console.log(_arr2)
	//-----------------------------------------------
	let __arr  = [3,4,2,1,5,6,7,8]
	let __arr1 = __arr.slice()
	let __arr2 = __arr.slice()

	bubbleSort(__arr)
	console.log(__arr)
	
	bubbleSortV1(__arr1)
	console.log(__arr1)

	bubbleSortV2(__arr2)
	console.log(__arr2)
  //-----------------------------------------------
	let ___arr  = randomIntArray(20)
	let ___arr1 = ___arr.slice()
	let ___arr2 = ___arr.slice()

	bubbleSort(___arr)
	console.log(___arr)
	
	bubbleSortV1(___arr1)
	console.log(___arr1)

	bubbleSortV2(___arr2)
	console.log(___arr2)
}

test()

//logger...
function sortStepLog(type,count){
	let _type = type === 'v' 
							? '基础版本' 
							: type === 'v1' 
								? '优化版本1' 
								: type === 'v2' 
									? '优化版本2' 
									: '' 
	console.log(`${_type} 共循环 [ ${count}] 次`)
}

//返回指定长度且100以内的随机数组
function randomIntArray(len){
	const arr = []
	for(let i=0;i<len;i++){
		let number = Math.floor(Math.random() * 100)
		arr.push(number)
	}
	return arr
}