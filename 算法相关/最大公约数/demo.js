function maxCommonDivisor(a,b){
  if(a % b === 0) return b 
  return maxCommonDivisor(b,a % b)
}

maxCommonDivisor(1112,695)