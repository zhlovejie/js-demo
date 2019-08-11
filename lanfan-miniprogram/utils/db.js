wx.cloud.init({traceUser: true,env: 'bean-wx-cloud-d1f8d'})

const db = wx.cloud.database()
const _ = db.command
//recipe 菜谱
const recipe = {
  top6(){
    return db.collection('recipe')
      .field({_id: 1,id: 1,name: 1,name_adj: 1,"square_image.ident": 1})
      .orderBy('update_time','desc')
      .limit(6)
      .get()
      .then(result => {
        result.errCode = result.errMsg === 'collection.get:ok' ? 0 : 1
        return result
      })
      .catch(err =>{
        return { errCode: 1, errMsg:err.message}
      })
  },
  weekTop10() {
    return db.collection('recipe')
      .field({ _id: 1, id: 1, name: 1, name_adj: 1, "image.ident": 1 })
      .orderBy('update_time', 'desc')
      .limit(10).skip(6).get()
      .then(result => {
        result.errCode = result.errMsg === 'collection.get:ok' ? 0 : 1
        return result
      })
      .catch(err => {
        return { errCode: 1, errMsg: err.message }
      })
  },
  get(id){
    return db.collection('recipe').doc(id).get()
    .then(result =>{
      result.errCode = result.errMsg === 'document.get:ok' ? 0 : 1
      return result
    })
    .catch(err => {
      return { errCode: 1, errMsg: err.message }
    })
  },
  search(key,page=1,pageSize=10){
    return db.collection('recipe')
    .field({ _id: 1, id: 1, name: 1, name_adj: 1, "square_image.ident": 1 })
    .where(
      _.or([
        { name: { $regex: '.*' + key, $options: 'i' }},
        { name_adj: { $regex: '.*' + key, $options: 'i' }}
      ])
    )
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .get()
    .then(result => {
      result.errCode = result.errMsg === 'collection.get:ok' ? 0 : 1
      result.page = page
      result.pageSize = pageSize
      return result
    })
    .catch(err => {
      return { errCode: 1, errMsg: err.message }
    })
  },
  query(page = 1, pageSize = 10){
    return db.collection('recipe')
      .field({ _id: 1, id: 1, name: 1, name_adj: 1, "square_image.ident": 1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .get()
      .then(result => {
        result.errCode = result.errMsg === 'collection.get:ok' ? 0 : 1
        result.page = page
        result.pageSize = pageSize
        return result
      })
      .catch(err => {
        return { errCode: 1, errMsg: err.message }
      })
  }
}

const note = {}

const user = {
  add(userinfo){
    return db.collection('user').add({
      data: userinfo
    }).then(result =>{
      result.errCode = result._id  ? 0 : 1 
      return result
    })
    .catch(err => {
      return { errCode: 1, errMsg: err.message }
    })
  },
  get(openid){
    return db.collection('user').where({_openid:openid}).limit(1).get()
    .then(result =>{
      result.errCode = result.errMsg === 'collection.get:ok' ? 0 : 1
      return result
    })
    .catch(err => {
      return { errCode: 1, errMsg: err.message }
    })
  }
}

module.exports = {
  recipe,
  note,
  user
}

