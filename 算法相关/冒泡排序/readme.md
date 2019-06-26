## 冒泡排序
> 从第一个数开始，依次往后比较，如果前面的数比后面的数大就交换，否则不作处理。这就类似烧开水时，壶底的水泡往上冒的过程。

### 理解
> 数组长度设为n。外层共循环了n-1次，外层循环增加一次，对应内层循环就 减少一次。
> 
> 外层循环为：for (int i = 0; i < arr.length-1; i++)
> 
> 内层循环为：for (int j = 0; j < arr.length - 1 - i; j++)

### 代码实现
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
			let isSorted = true
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
