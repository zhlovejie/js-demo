// miniprogram/pages/user/user.js
const app = getApp()
const dbInstance = require('../../utils/db.js')
const utils = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    logged: false,
    userInfo: {},
    tags:['看过的菜谱','我的收藏'],
    currentIndex:0,
    recipeHistory:[],
    recipeCollect:[],
    width: (app.globalData.systemInfo.screenWidth - 50) / 2,
    swiperHeight: app.globalData.systemInfo.windowHeight - 104
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      let user = Object.assign({}, {
        _openid: app.globalData.openid,
        createTime:Date.now()
      }, e.detail.userInfo)
      dbInstance.user.add(user)
    }
  },
  onGetOpenid: function (cb) {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        cb && cb({ errCode: 0, openid: res.result.openid })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        cb && cb({ errCode: 1, errMsg: err.message })
      }
    })
  },
  tagIndexChange:function(event){
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
  },
  swiperChange:function(event){
    let detail = event.detail
    if(detail.source === 'touch'){
      this.setData({
        currentIndex: detail.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let userInfo = utils.getUserInfo
    if (userInfo && userInfo.openid && userInfo.avatarUrl){
      this.setData({
        logged:true,
        avatarUrl: userInfo.avatarUrl,
        userInfo: userInfo
      })
    }else{
      this.onGetOpenid(result =>{
        if (result.errCode === 0){
          dbInstance.user.get(result.openid).then(userResult => {
            //console.log(userResult)
            if (userResult.errCode === 0){
              let user = userResult.data[0]

              utils.updateUser(user)

              that.setData({
                logged: true,
                avatarUrl: user.avatarUrl,
                userInfo:user
              })
            }
          })
        }
      })
    }
  },
  initHistoryAndCollect:function(){
    this.setData({
      recipeHistory: utils.getRecipeHistory(),
      recipeCollect: utils.getRecipeCollect()
    })
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
    wx.nextTick(() => this.initHistoryAndCollect())
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
  gotoRecipeDetail: function (event) {
    let url = `../recipe_detail/recipe_detail?id=${event.currentTarget.dataset.id}`
    wx.navigateTo({ url: url })
  },
})