//app.js
const utils = require('./utils/utils.js')

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:'bean-wx-cloud-d1f8d'
      })
      console.log('初始化云功能。。。')
    }

    this.globalData = {}
    this.globalData.systemInfo = wx.getSystemInfoSync()
    //console.log(JSON.stringify(this.globalData.systemInfo))
    
    utils.initStorage()

  }
})
