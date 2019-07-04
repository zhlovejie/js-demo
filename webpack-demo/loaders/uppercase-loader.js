//官方推荐loader工具
var loaderUtils = require("loader-utils");

module.exports = function(source){
  //获取参数
  var query = loaderUtils.getOptions(this) || {};
  console.log(query)
  if(source){
    console.log('---uppercase-loader input:',source)
    if(query.type && query.type.toUpperCase() === 'ALL'){
      source = source.toUpperCase()
    }else{
      source = source.charAt(0).toUpperCase() + source.slice(1)
    }
    console.log('---uppercase-loader output:',source)
  }

  //webpack 会动态执行这里的代码 
  return ` module.exports = '${String(source)}' `
}