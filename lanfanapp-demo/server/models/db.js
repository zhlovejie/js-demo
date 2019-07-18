const { MongoClient, ObjectID } = require('mongodb')
let dbName = 'lanfan'
let connectString = `mongodb://localhost:27017`

module.exports = () =>{
  return MongoClient.connect(connectString,{ useNewUrlParser: true })
  .then (client => client.db(dbName))
  .catch(err => console.log(err))
}

module.exports.ObjectID = ObjectID