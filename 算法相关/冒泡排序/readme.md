## 冒泡排序
> 从第一个数开始，依次往后比较，如果前面的数比后面的数大就交换，否则不作处理。这就类似烧开水时，壶底的水泡往上冒的过程。

### 理解
> 数组长度设为n。外层共循环了n-1次，外层循环增加一次，对应内层循环就 减少一次。
> 
> 外层循环为：for (int i = 0; i < arr.length-1; i++)
> 
> 内层循环为：for (int j = 0; j < arr.length - 1 - i; j++)

### 代码实现

	function bubbleSort(list){
		let len = list.length
		for(let i = 0;i<len - 1;i++){
			for(let j=0;j<len - 1 - i;j++){
				if(list[j] > list[j+1]){
					swap(j,j+1)
				}
			}
		}
		function swap(v1,v2){
			let tmp
			tmp = list[v1]
			list[v1] = list[v2]
			list[v2] = tmp
		}
	}