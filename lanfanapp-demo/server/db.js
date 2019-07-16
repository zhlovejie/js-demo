const { MongoClient, ObjectID } = require('mongodb')
let dbName = 'lanfan'
let collectionName = 'recipe'
let connectString = `mongodb://localhost:27017`

let db

module.exports = () =>{
  return MongoClient.connect(connectString,{ useNewUrlParser: true })
  .then((client)=>{
    db = client.db(dbName)
  })
  .catch(err=>{
    console.log(err)
  })
}
// $gt -------- greater than  >
// $gte --------- gt equal  >=
// $lt -------- less than  <
// $lte --------- lt equal  <=
// $ne ----------- not equal  !=
// $eq  --------  equal  =
// age:{$gte:32,$lte:33} 条件查询
// job:eval(`/end/i`) 模糊查询
module.exports.action = {
  changeCollection(name){
    collectionName = name
    return true
  },
  add(item){
    return db.collection(collectionName).insertOne(item)
  },
  addMany(items){
    return db.collection(collectionName).insertMany(items)
  },
  findOne(query={}){
    if(query._id && typeof query._id !== 'object'){
      query._id = ObjectID(query._id)
    }
    return db.collection(collectionName).findOne(query)
  },
  findAll(query={},sort={}){
    return db.collection(collectionName).find(query).sort(sort).toArray()
  },
  updateOne(query,update){
    if(query._id && typeof query._id !== 'object'){
      query._id = ObjectID(query._id)
    }
    let _update = {$set:update}
    return db.collection(collectionName).updateOne(query,_update)
  },
  updateMany(query,update){
    if(query._id && typeof query._id !== 'object'){
      query._id = ObjectID(query._id)
    }
    let _update = {$set:update}
    //obj.result.nModified 更新的条数
    return db.collection(collectionName).updateMany(query,_update)
  },
  removeOne(query){
    return db.collection(collectionName).deleteOne(query)
  },
  removeMany(query){
    //obj.deletedCount 删除的条数
    return db.collection(collectionName).deleteMany(query)
  }
}
