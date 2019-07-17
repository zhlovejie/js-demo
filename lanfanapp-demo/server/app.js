const moment = require('moment')
const express = require('express')
const app = express()
const db = require('./db')

// app.set('port', process.env.PORT || 3000)

// app.get('/recipe-category',(req, res, next) => {
//   let category = ['今日推荐','早餐达人','新手不翻车','家常菜能手','懒人一锅出','主食控','爱吃肉肉','甜食至上']
//   res.send(category)
// })

// app.get('/week-top-10',(req, res, next) => {
//   getWeekTop10()
//   .then((items) =>{
//     res.send(items)
//   })
//   .catch(err => {
//     next(err)
//   })
// })

// app.listen(app.get('port'),() =>{
//   console.log(`服务运行在端口 ${app.get('port')}`)
// })

/**
 * 每日推荐指定数量的菜谱 (按更新时间，得分，浏览量倒序)
 * @param {数量 默认 6 条} topSize 
 */
async function getRecipeTop(topSize=6){
  let query = {}
  let options = {
    sort:{update_time:-1,score:-1,n_collects:-1},
    projection:{name:1,name_adj:1,"image.ident":1,"square_image.ident":1,"square_video.ident":1},
    limit:topSize
  }

  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  console.log('top 6 -----------------------------------')
  console.log(recipeList)
  console.log('-----------------------------------------')
  return recipeList
}

/**
 * 获取指定数量的周排行菜谱 (按得分，浏览量倒序)
 * @param {数量 默认10条} topSize 
 */
async function getRecipeWeekTop(topSize=10){
  let formatStr = 'YYYY-MM-DD HH:mm:ss'
  let statTime = moment().subtract(7,'days').format(formatStr)
  let endTime = moment().format(formatStr)

  let query = {
    $and:[
      {update_time:{$gte:statTime}},
      {update_time:{$lte:endTime}}
    ]
  }

  let options = {
    sort:{score:-1,n_collects:-1},
    projection:{name:1,name_adj:1,"image.ident":1,"square_image.ident":1,"square_video.ident":1},
    limit:topSize
  }

  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  console.log('top week 10 -----------------------------')
  console.log(recipeList)
  console.log('-----------------------------------------')
  return recipeList
}

/**
 * 获取指定页数的菜谱 (按浏览量倒序)
 * @param {第几页 默认第 1 页} currentPage 
 * @param {每页数量 默认每页 10 条} pageSize 
 */
async function getAllRecipe(currentPage=1,pageSize=10){
  let _currentPage = (currentPage < 1 ? 1 : currentPage) - 1
  _currentPage = _currentPage < 0 ? 0 : _currentPage

  let query = {}
  let options = {
    projection:{name:1,name_adj:1,n_collects:1,"image.ident":1,"square_image.ident":1,"square_video.ident":1},
    sort:{n_collects:-1},
    limit:pageSize,
    skip:_currentPage * pageSize
  }
  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  console.log(recipeList)
  console.log(recipeList.length)
  return recipeList
}

/**
 * 根据关键字搜索菜谱
 * @param {关键字} keyWord 
 * @param {第几页 默认第 1 页} currentPage 
 * @param {每页数量 默认每页 10 条} pageSize 
 */
async function searchRecipe(keyWord,currentPage=1,pageSize=10){
  let _currentPage = (currentPage < 1 ? 1 : currentPage) - 1
  _currentPage = _currentPage < 0 ? 0 : _currentPage

  let _kw = ''
  _kw = typeof keyWord !== 'string' ? String(keyWord) : keyWord
  let orKeyWords = []
  for(let kw of _kw.split(',')){
    orKeyWords.push({name:eval("/"+kw+"/i")},{name_adj:eval("/"+kw+"/i")})
  }

  let query = {$or:orKeyWords}
  let options = {
    projection:{name:1,name_adj:1,n_collects:1,"image.ident":1,"square_image.ident":1,"square_video.ident":1},
    sort:{n_collects:-1},
    limit:pageSize,
    skip:_currentPage * pageSize
  }
  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  console.log(recipeList)
  console.log(recipeList.length)
  return recipeList
}

/**
 * 获取全部菜谱分类
 */
async function allRecipeCategory(){
  let dbInstance = await db()
  let query = {}
  let options = {
    projection:{name:1,tags:1},
    sort:{level:1} //按照级别排序
  } 
  let result = await dbInstance.collection('recipe_category').find(query,options).toArray()
  return result
}

//allRecipeCategory()

//searchRecipe('冰,雪糕',1,5)

//getAllRecipe(10)

//getTop()

//getWeekTop()

