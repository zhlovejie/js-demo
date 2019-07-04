//官方推荐loader工具
var loaderUtils = require("loader-utils");

module.exports = function(source){
  //获取参数
  var query = loaderUtils.getOptions(this) || {};
  console.log(query)
  if(source){
    console.log('---reverse-loader input:',source)

    if(query.suffix && Number(query.suffix) > 0){
      let nsuffix = Number(query.suffix)
      nsuffix = isNaN(nsuffix) ? 0 : nsuffix
      let arr = source.split('')
      let left =  arr.slice(0,nsuffix).reverse().join('')
      let other = source.slice(nsuffix)
      source = left + other
    }else{
      source = source.split('').reverse().join('')
    }
    console.log('---reverse-loader output:',source)
  }
  return source
}