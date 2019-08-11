//index.js
const app = getApp()
const dbInstance = require('../../utils/db.js')
const utils = require('../../utils/utils.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    recipteTop6:[],
    recipteWeekTop10: [],
    recipeList:[],
    scrollHeight: app.globalData.systemInfo.screenHeight,
    swiperTop6Height: app.globalData.systemInfo.windowWidth * 0.8,
    swiperWeekTopW: app.globalData.systemInfo.windowWidth * 0.3,
    swiperWeekTopH: app.globalData.systemInfo.windowWidth * 0.3 * 2.5,
    recipeListWidth: app.globalData.systemInfo.windowWidth - 40,
    page:1,
    noMoreRecipe:false,
    collectImg: '../../images/heart-fill.png',
    unCollectImg: '../../images/heart.png'
  },

  onLoad: function() {
    let that = this
    this.initRecipeTop6()

    setTimeout(function () {
      that.initRecipeWeekTop10()
    }, 300)

    setTimeout(function(){
      that.loadRecipe(that.data.page)
    },1000)
  },

  initRecipeTop6:function(){
    dbInstance.recipe.top6().then(result =>{
      if (result.errCode === 0){
        let data = this.updateCollect(result.data)
        this.setData({ recipteTop6: data})
      }
    })
  },
  initRecipeWeekTop10: function () {
    dbInstance.recipe.weekTop10().then(result => {
      if (result.errCode === 0) {
        this.setData({ recipteWeekTop10: result.data })
      }
    })
  },
  loadRecipe:function(_page){
    let that = this
    if (this.data.noMoreRecipe){
      wx.showToast({
        title: '没有更多的菜谱了',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    wx.showLoading({title: '加载中'})
    dbInstance.recipe.query(_page).then(result => {
      if (result.errCode === 0) {
        if(result.data.length === 0){
          that.setData({ noMoreRecipe:true})
          return;
        }
        let data = this.updateCollect(result.data)
        this.setData({ 
          recipeList: this.data.recipeList.concat(data),
          page:result.page,
          pageSize: result.pageSize 
        })
      }
      wx.hideLoading()
    })
  },
  gotoSearchPage:function(){
    wx.navigateTo({ url:'../search/search'})
  },
  gotoRecipeDetail:function(event){
    let url = `../recipe_detail/recipe_detail?id=${event.currentTarget.dataset.id}`
    wx.navigateTo({ url: url})
  },
  addCollect:function(event){
    let id = event.currentTarget.dataset.id
    let source = event.currentTarget.dataset.source
    let index = this.data[source].findIndex(item =>item._id === id)
    if(index >= 0){
      let recipe = this.data[source][index]
      if (recipe.isCollect) {
        utils.delRecipeCollect(recipe)
      }else{
        utils.addRecipeCollect(recipe)
      }
      recipe.isCollect = !recipe.isCollect
      if (source === 'recipteTop6'){
        this.setData({ 'recipteTop6': this.data[source]})
      }
      if (source === 'recipeList'){
        this.setData({ 'recipeList': this.data[source] })
      }
      
      wx.nextTick(() => {
        wx.showToast({
          title: recipe.isCollect ? '收藏成功' : '已取消收藏',
          icon: 'success',
          duration: 2000
        })
      })
    }
  },
  updateCollect:function(items){
    let collects = utils.getRecipeCollect()
    return items.map(function(item,index,arr){
      item.isCollect = collects.filter(collect => collect._id === item._id).length > 0 ? true : false
      return item
    })
  },
  scrolltolowerHandler:function(){
    this.setData({page:this.data.page + 1})
    wx.nextTick(() => this.loadRecipe(this.data.page))
  }
})
