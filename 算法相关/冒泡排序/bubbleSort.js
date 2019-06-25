let arr = [8,7,6,4,5,1,3]

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

bubbleSort(arr)
console.log(arr)