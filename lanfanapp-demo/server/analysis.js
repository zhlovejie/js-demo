const fs = require('fs')
const path = require('path')

const filesBaseDir = path.resolve(__dirname,'data')

const pathList = [
  path.join(filesBaseDir,'index.json'),
  path.join(filesBaseDir,'index2.json'),
  path.join(filesBaseDir,'index3.json'),
  path.join(filesBaseDir,'index4.json')
]


function readJSON(filePath){
  let result
  try{
    if(!fs.existsSync(filePath)){
      throw new Error(filePath+' 不存在')
    }
    result = JSON.parse(fs.readFileSync(filePath))
  }catch(err){
    result = {}
  }
  return result
}


function getAllData(){
  let res = []
  pathList.reduce(function(total,val,index,arr){
    const data = readJSON(val)
    res = res.concat(data.recipeList)
    return res
  },res)
  console.log(res.length)
  return res
}


function test_n_collects(arrFilterKeys){
  let result = getAllData().filter(item=>{
    return checkFilter(item.name)
  })
  
  for(let item of result){
    console.log(`id:${item.id} - name:${item.name} - producer_id:${item.producer_id} - n_collects:${item.n_collects}`)
  }

  console.log(`共 ${result.length} 条记录`)

  function checkFilter(name){
    let b = false
    return arrFilterKeys.filter(key=>name.includes(key)).length > 0
  }

}

test_n_collects(['米','饭','面','面条'])


let category = [
  {
    tagName:'今日推荐',
    keys:['米','饭','面','面条'],
    page:10
  }
]

