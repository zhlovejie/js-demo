function quickSort(list,startIndex,endIndex){
	if(startIndex >= endIndex) return
	let pivotIndex = partition(list,startIndex,endIndex)

	quickSort(list,startIndex,pivotIndex - 1)
	quickSort(list,pivotIndex + 1,endIndex)

	function partition(list,startIndex,endIndex){
		let pivot = list[startIndex] //基准值
		let left  = startIndex //左指针 指向数组最左侧索引
		let right = endIndex   //右指针 指向数组最右侧索引
		while(left !== right){
			//先从右往左扫描 找到一个小于等于基准值的数字
			while(left < right && list[right] > pivot) right-- 
			//再从左往右扫描 找到一个大于基准值的数字
			while(left < right && list[left] <= pivot) left++ 
			//两者交换位置
			if(left < right){
				let tmp = list[left]
				list[left] = list[right]
				list[right] = tmp
			}
		}
		//重合指针的数字和基准值互换位置
		list[startIndex] = list[left]
		list[left] = pivot
		//第一轮分区结束返回基准值位置为后续递归做准备
		return left
	}
}


function test(){
	let arr = null

	arr = randomIntArray(10)
	console.log('原数组：'+arr)
	quickSort(arr,0,arr.length - 1)
	console.log('排序后：'+arr)

	console.log('')
	console.log('-------------------------------')
	console.log('')

	arr = randomIntArray(10)
	console.log('原数组：'+arr)
	quickSort(arr,0,arr.length - 1)
	console.log('排序后：'+arr)
}

test()

//返回指定长度且100以内的随机数组
function randomIntArray(len){
	const arr = []
	for(let i=0;i<len;i++){
		let number = Math.floor(Math.random() * 100)
		arr.push(number)
	}
	return arr
}