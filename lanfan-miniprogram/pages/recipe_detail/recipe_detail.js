// miniprogram/pages/recipe_detail/recipe_detail.js
const app = getApp()
const dbInstance = require('../../utils/db.js')
const utils = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeList:[],
    mediaHeight: app.globalData.systemInfo.screenHeight,
    mediaWidth: app.globalData.systemInfo.screenWidth,
    videoContent:null,
    showVideoTips:true,
    isCollect:false,
    collectImg:'../../images/heart-fill.png',
    unCollectImg: '../../images/heart.png',
    shareImg: '../../images/share.png',
    scrollTop:0,
    scoreImgList:[],
    scoreValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.loadRecipe(options.id)
    }else{
      console.error('id 参数缺失，渲染失败')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.videoContent === null){
      let content = wx.createVideoContext('recipe-video')
      this.setData({videoContent: content})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let recipe = this.data.recipeList[0]
    let title = recipe.name_adj + recipe.name
    let path = `pages/recipe_detail/recipe_detail?id=${recipe._id}`
    
    return {
      title: title,
      path: path
    }
  },
  scrollHandler:function(event){
    if (event.detail.scrollTop > 100 && this.data.videoContent !== null){
      this.data.videoContent.pause()
      this.setData({ showVideoTips:false})
    }
    if (event.detail.scrollTop <= 100 && this.data.videoContent !== null){
      this.data.videoContent.play()
      this.setData({ showVideoTips: true })
    }
  },
  loadRecipe:function (id){
    wx.showLoading({ title: '加载中' })
    dbInstance.recipe.get(id).then(result => {
      if (result.errCode === 0) {
        this.setData({
          recipeList: this.data.recipeList.concat([result.data]),
          isCollect: utils.hasRecipeCollect(result.data),
          scoreImgList: this.formatScore(result.data.score),
          scoreValue: result.data.score.toFixed(1)
        })
        wx.nextTick(() => utils.addRecipeHistory(result.data))
      }
      wx.hideLoading()
    })
  } ,
  addCollect: function () {
    if (this.data.isCollect){
      utils.delRecipeCollect(this.data.recipeList[0])
    }else{
      utils.addRecipeCollect(this.data.recipeList[0])
    }
    this.setData({ isCollect: !this.data.isCollect })

    wx.nextTick(() =>{
      wx.showToast({
        title: this.data.isCollect ? '收藏成功' : '已取消收藏',
        icon: 'success',
        duration: 2000
      })
    })
  },
  videoErrorHandler:function(){
    wx.showModal({
      title: '提示',
      content: '视频播放出错了,先看看菜谱吧(￣ε￣*)',
      success(res) {
        if (res.confirm) {
          this.setData({ scrollTop: this.data.mediaHeight })
        } else if (res.cancel) {
          try{
            wx.navigateBack({ delta: 1 })
          }catch(err){
            console.log(err)
          }
        }
      }
    })
    return;
  },
  formatScore: function(score){
    let arr = []
    for (let i = 0; i < Math.floor(Number(score)) / 2;i++){
      arr.push(i)
    }
    return arr
  }
})