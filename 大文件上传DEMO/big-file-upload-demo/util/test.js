const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname)
try{
  let stat = fs.statSync(filePath)
  console.log(stat)
}catch(err){
  if(err.code === 'ENOENT'){
    console.log('路径不存在')
  }else if(err.code === 'EACCES'){
    console.log('文件禁止访问')
  }
}