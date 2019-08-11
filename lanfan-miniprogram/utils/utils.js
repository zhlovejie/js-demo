function initStorage(){

  let searchRecommendTag = [
    { "name": "红烧肉", "kw": "红烧肉" }, 
    { "name": "可乐鸡翅", "kw": "可乐鸡翅" }, 
    { "name": "糖醋排骨", "kw": "排骨" }, 
    { "name": "炒饭", "kw": "饭" }, 
    { "name": "炒面", "kw": "面" }, 
    { "name": "土豆", "kw": "土豆" }, 
    { "name": "鱼", "kw": "鱼" }, 
    { "name": "鸡胸肉", "kw": "鸡" }, 
    { "name": "沙拉", "kw": "沙拉" },
    { "name": "虾", "kw": "虾" }
  ]

  let userStorage = {
    userInfo:{
      nickName:null,
      avatarUrl:null,
      openid:null,
      id:null
    },
    recipeHistory:[],//看过的菜谱
    recipeCollect:[], //收藏的菜谱
    searchRecommendTag: searchRecommendTag, //推荐搜索词条
    searchHistory:[] //搜索词条记录
  }
  //console.warn('初始化Storage...')
  try {
    let value = wx.getStorageSync('userStorage')
    if (!value) {
      console.log(userStorage)
      wx.setStorageSync('userStorage', JSON.stringify(userStorage))
    }else{
      //console.log(value)
    }
  } catch (e) {
    //console.error(e)
  }
}

function addRecipeHistory(recipe){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    let index = userStorage.recipeHistory.findIndex(item => item._id === recipe._id)
    if(index === -1){
      userStorage.recipeHistory.unshift({
        _id: recipe._id,
        name: recipe.name,
        image: recipe.square_image.ident
      })
      wx.setStorageSync('userStorage', JSON.stringify(userStorage))
    }
  } catch (e) {
    console.error(e)
  }
}

function clearRecipeHistory(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    userStorage.recipeHistory = []
    wx.setStorageSync('userStorage', JSON.stringify(userStorage))
  } catch (e) {
    console.error(e)
  }
}

function getRecipeHistory(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.recipeHistory
  } catch (e) {
    console.error(e)
  }
}

function addRecipeCollect(recipe){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    let index = userStorage.recipeCollect.findIndex(item => item._id === recipe._id)
    if(index === -1){
      userStorage.recipeCollect.unshift({
        _id: recipe._id,
        name: recipe.name,
        image: recipe.square_image.ident
      })
      wx.setStorageSync('userStorage', JSON.stringify(userStorage))
    }
  } catch (e) {
    console.error(e)
  }
}

function delRecipeCollect(recipe) {
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    recipe.addStorageTime = Date.now()
    userStorage.recipeCollect = userStorage.recipeCollect.filter(item => item._id !== recipe._id)
    wx.setStorageSync('userStorage', JSON.stringify(userStorage))
  } catch (e) {
    console.error(e)
  }
}

function getRecipeCollect(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.recipeCollect
  } catch (e) {
    console.error(e)
  }
}

function hasRecipeCollect(recipe){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.recipeCollect.filter(item => item._id === recipe._id).length > 0 ? true : false
  } catch (e) {
    console.error(e)
    return false
  }
}

function getSearchRecommendTag(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.searchRecommendTag
  } catch (e) {
    console.error(e)
  }
}

function getSearchHistory (){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.searchHistory
  } catch (e) {
    console.error(e)
  }
}

function addSearchHistory(item){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    let _index = userStorage.searchHistory.findIndex(_item => _item.name === item.name)
    if(_index >= 0){
      userStorage.searchHistory.splice(_index,1)
    }
    userStorage.searchHistory.unshift(item)
    wx.setStorageSync('userStorage', JSON.stringify(userStorage))
  } catch (e) {
    console.error(e)
  }
}

function clearSearchHistory(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    userStorage.searchHistory = []
    wx.setStorageSync('userStorage', JSON.stringify(userStorage))
  } catch (e) {
    console.error(e)
  }
}

function updateUser(user){
  try{
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    userStorage.userInfo = {
      nickName: user.nickName,
      avatarUrl: user.avatarUrl,
      openid: user.openid,
      id: user._id
    }
    wx.setStorageSync('userStorage', JSON.stringify(userStorage))
  } catch (e) {
    console.error(e)
  }
}

function getUserInfo(){
  try {
    let userStorage = JSON.parse(wx.getStorageSync('userStorage'))
    return userStorage.userInfo
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  initStorage,
  addRecipeHistory,
  clearRecipeHistory,
  getRecipeHistory,
  addRecipeCollect,
  delRecipeCollect,
  hasRecipeCollect,
  getRecipeCollect,
  getUserInfo,
  updateUser,
  getSearchRecommendTag,
  addSearchHistory,
  clearSearchHistory,
  getSearchHistory
}