const fs = require('fs')
const path = require('path')

const filesBaseDir = path.resolve(__dirname,'data')
const files = {
  'index':path.join(filesBaseDir,'index4.json'),
  'collects':path.join(filesBaseDir,'collects.json')
}

function readJSON(fname){
  let result
  try{
    if(!fs.existsSync(fname)){
      throw new Error(fname+' 不存在')
    }
    result = JSON.parse(fs.readFileSync(fname))
  }catch(err){
    result = {}
  }
  return result
}

function writeJSON(fname,fdata){
  // if(!fs.existsSync(fname)){
  //   throw new Error(fname+' 不存在')
  // }
  fs.writeFileSync(fname,fdata,{encoding :'utf8'})
}

function testCreate(fpath){


  let _fpath = fpath
  if(!path.isAbsolute(_fpath)){
    _fpath = path.join(__dirname,fpath)
  }
  if(!fs.existsSync(_fpath)){
    fs.mkdirSync(_fpath)
  }

  console.log(_fpath)

  if(fs.existsSync(_fpath)){
    console.log('create over:'+_fpath)
  }
}

module.exports = {
  files:files,
  readJSON:readJSON,
  writeJSON:writeJSON,
  testCreate:testCreate
}