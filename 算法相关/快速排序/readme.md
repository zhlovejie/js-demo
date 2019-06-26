## 快速排序
> 快速排序是冒泡排序的改进版，也是最好的一种内排序，在很多面试题中都会出现，也是作为程序员必须掌握的一种排序方法。

### 理解
> 在待排序的元素任取一个元素作为基准(通常选第一个元素，但最的选择方法是从待排序元素中随机选取一个作为基准)，称为基准元素；
> 
> 将待排序的元素进行分区，比基准元素大的元素放在它的右边，比其小的放在它的左边；
> 
> 对左右两个分区重复以上步骤直到所有元素都是有序的。

### 代码实现

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

### 分析
1. 当分区选取的基准元素为待排序元素中的最大或最小值时，为最坏的情况，时间复杂度和直接插入排序的一样，移动次数达到最大值
	>Cmax = 1+2+...+(n-1) = n*(n-1)/2 = O(n2) 此时最好时间复杂为O(n2)
2. 当分区选取的基准元素为待排序元素中的"中值"，为最好的情况，时间复杂度为O(nlog2n)。
3. 快速排序的空间复杂度为O(log2n). 
4. 当待排序元素类似[6,1,3,7,3]且基准元素为6时，经过分区，形成[1,3,3,6,7],两个3的相对位置发生了改变

所是快速排序是一种不稳定排序。
