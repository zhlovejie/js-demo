const db = require('./db')

/**
 * 初始化序列
 */
async function initNextSequenceValue(){
  let dbInstance = await db()
  let counters = [
    {_id:"recipeID",sequence_value:0},//菜谱
    {_id:"noteID",sequence_value:0},  //笔记
    {_id:"userID",sequence_value:0},  //用户
    {_id:"commentID",sequence_value:0}//评论
  ] 

  // let pipeline = [{$group:{_id:"$status",maxRecipeID:{$max:"$id"}}}]
  // let res = await dbInstance.collection('recipe').aggregate(pipeline).limit(1).toArray()
  // console.log(res)

  await dbInstance.collection('counters').drop()
  let result = await dbInstance.collection('counters').insertMany(counters)
  return result
}

/**
 * 自增
 * @param {序列名} sequenceName 
 */
async function getNextSequenceValue(sequenceName,sequenceValue=1){
  let dbInstance = await db()
  let filter = {_id: sequenceName}
  let update = {$inc:{sequence_value:sequenceValue}}
  let options = {returnOriginal:false}
  let result = await dbInstance.collection('counters').findOneAndUpdate(filter,update,options)
  console.log(result)
  return result.value.sequence_value;
}

module.exports = {
  initNextSequenceValue,
  getNextSequenceValue
}