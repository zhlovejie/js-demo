let arr = [8,7,6,4,5,1,3]
function quickSort(list,l,r){
	if( l < r){
		let i = l,j = r,x = list[l]
		while(i<j){
			while(i<j && list[j] > x){
				j--
			}
			if(i<j){
				list[i] = list[j]
				i++
			}
			while(i<j && list[i] <= x){
				i++
			}
			if(i<j){
				list[j] = list[i]
				j--
			}
			list[i] = x
			quickSort(list,l,i - 1)
			quickSort(list,i+1,r)
		}
	}
}

quickSort(arr,0,arr.length - 1)
console.log(arr)