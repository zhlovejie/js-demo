const { MongoClient, ObjectID } = require('mongodb')
let dbName = 'lanfan'
let connectString = `mongodb://localhost:27017`

module.exports = () =>{
  return MongoClient.connect(connectString,{ useNewUrlParser: true })
  .then (client => client.db(dbName))
  .catch(err => console.log(err))
}



// $gt -------- greater than  >
// $gte --------- gt equal  >=
// $lt -------- less than  <
// $lte --------- lt equal  <=
// $ne ----------- not equal  !=
// $eq  --------  equal  =
// age:{$gte:32,$lte:33} 条件查询
// job:eval(`/end/i`) 模糊查询
// module.exports.action = {
//   changeCollection(name){
//     collectionName = name
//     console.log(`collection change to ${collectionName}`)
//   },
//   count(query={},options={}){
//     return db.collection(collectionName).count(query,options)
//   },
//   add(doc, options={}){
//     return db.collection(collectionName).insertOne(item)
//   },
//   addMany(docs, options={}){
//     return db.collection(collectionName).insertMany(items)
//   },
//   findOne(query={},options={}){
//     if(query._id && typeof query._id !== 'object'){
//       query._id = ObjectID(query._id)
//     }
//     return db.collection(collectionName).findOne(query,options)
//   },
//   findAll(query={},options={}){
//     return db.collection(collectionName).find(query,options).toArray()
//   },
//   updateOne(filter, update, options={}){
//     return db.collection(collectionName).updateOne(filter,update,options)
//   },
//   updateMany(filter, update, options={}){
//     //obj.result.nModified 更新的条数
//     return db.collection(collectionName).updateMany(filter,update,options)
//   },
//   removeOne(query){
//     return db.collection(collectionName).deleteOne(query)
//   },
//   removeMany(query){
//     //obj.deletedCount 删除的条数
//     return db.collection(collectionName).deleteMany(query)
//   }
// }
