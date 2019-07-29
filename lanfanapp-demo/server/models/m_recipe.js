const moment = require('moment')
const db = require('./db')

/**
 * 每日推荐指定数量的菜谱 (按更新时间，得分，浏览量倒序)
 * @param {数量 默认 6 条} topSize 
 */
async function getRecipeTop(topSize=6){
  let query = {}
  let options = {
    sort:{update_time:-1,score:-1,n_collects:-1},
    projection:{id:1,name:1,name_adj:1,"time_consuming":1,"difficulty_text":1,"square_image":1,"square_video":1},
    limit:topSize
  }

  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  //console.log('top 6 -----------------------------------')
  //console.log(recipeList)
  //console.log('-----------------------------------------')
  return recipeList
}

/**
 * 获取指定数量的周排行菜谱 (按得分，浏览量倒序)
 * @param {数量 默认10条} topSize 
 */
async function getRecipeWeekTop(topSize=10){
  let formatStr = 'YYYY-MM-DD HH:mm:ss'
  let statTime = moment().subtract(180,'days').format(formatStr)
  let endTime = moment().format(formatStr)

  let query = {
    $and:[
      {update_time:{$gte:statTime}},
      {update_time:{$lte:endTime}}
    ]
  }

  let options = {
    sort:{score:-1,n_collects:-1},
    projection:{id:1,name:1,name_adj:1,"time_consuming":1,"difficulty_text":1,"square_image":1,"square_video":1},
    limit:topSize
  }

  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  //console.log('top week 10 -----------------------------')
  //console.log(recipeList)
  //console.log('-----------------------------------------')
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
    projection:{id:1,name:1,name_adj:1,n_collects:1,"time_consuming":1,"difficulty_text":1,"square_image":1,"square_video":1},
    sort:{n_collects:-1},
    limit:pageSize,
    skip:_currentPage * pageSize
  }
  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  //console.log(recipeList)
  //console.log(recipeList.length)

  return { currentPage, pageSize, recipeList}
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
    projection:{id:1,name:1,name_adj:1,n_collects:1,"time_consuming":1,"difficulty_text":1,"square_image":1,"square_video":1},
    sort:{n_collects:-1},
    limit:pageSize,
    skip:_currentPage * pageSize
  }
  let dbInstance = await db()
  let recipeList = await dbInstance.collection('recipe').find(query,options).toArray()
  //console.log(recipeList)
  //console.log(recipeList.length)
  return { currentPage, pageSize, keyWord, recipeList}
}

/**
 * 获取全部菜谱分类 
 * allCategory:全部分类 hotCategory:热门分类 customCategory:自定义分类
 */
async function allRecipeCategory(){
  let dbInstance = await db()
  let query = {}
  let options = {} 
  let result = await dbInstance.collection('recipe_category').findOne(query,options)
  return result
}
/**
 * 根据编号获取菜谱
 * @param {菜谱唯一ID} id 
 */
async function getRecipe(id){
  let dbInstance = await db()
  let query = {id:Number(id)}
  let result = await dbInstance.collection('recipe').findOne(query)
  return result
}

async function getRecipeFromTag(tagName){
  if(tagName === '今日推荐'){
    let result = await Promise.all([getRecipeTop(), getRecipeWeekTop(), getAllRecipe()])
    return {
      recipe_top6 : result[0], 
      recipe_weektop10 : result[1], 
      recipe_10 : result[2]
    }
  }else{
    let result = await getAllRecipe()
    return {recipe_10 : result}
  }
}

async function getRecommends(){
  let result = await Promise.all([getRecipeTop(), getRecipeWeekTop()])
  return {
    recipe_top6 : result[0], 
    recipe_weektop10 : result[1]
  }
}



module.exports = {
  getRecipeTop,
  getRecipeWeekTop,
  getAllRecipe,
  searchRecipe,
  allRecipeCategory,
  getRecipe,
  getRecipeFromTag,
  getRecommends
}
//allRecipeCategory()

//searchRecipe('冰,雪糕',1,5)

//getAllRecipe(10)

//getTop()

//getWeekTop()