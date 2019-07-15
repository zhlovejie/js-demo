## 辗转相除法
辗转相除法， 又名欧几里德算法（Euclidean algorithm），是求最大公约数的一种方法。它的具体做法是：用较大数除以较小数，再用出现的余数（第一余数）去除除数，再用出现的余数（第二余数）去除第一余数，如此反复，直到最后余数是0为止。如果是求两个数的最大公约数，那么最后的除数就是这两个数的最大公约数。

	function maxCommonDivisor(a,b){
	  if(a % b === 0) return b 
	  return maxCommonDivisor(b,a % b)
	}
	maxCommonDivisor(1112,695)
	==>139