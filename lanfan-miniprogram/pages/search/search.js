// miniprogram/pages/search/search.js
const dbInstance = require('../../utils/db.js')
const utils = require('../../utils/utils.js')
const debounce = require('../../utils/debounce.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasInput:false,
    inputValue:'',
    debouncedSearchAction:null,
    searchRecommendTag: [],
    searchHistory: [],
    searchResult:[],
    noResult:false,
    noResultTips:'没有找到相关菜谱，换个关键词试试？',
    searchTrigger:false
  },
  inputHandler:function(event){
    if (event.type === 'input') {
      this.setData({
        inputValue: event.detail.value,
        hasInput: event.detail.value.length > 0
      })
      return
    }
    if (event.type === 'focus'){
      this.setData({ searchTrigger: false, searchResult: [], noResult: false })
      this.initSearchData()
      return
    }
    if (event.type === 'confirm') {
      let kw = event.detail.value
      this.setData({ searchTrigger:true})
      utils.addSearchHistory({ name: kw, kw: kw})
      wx.nextTick(() => this.data.debouncedSearchAction(kw))
      return
    }
  },
  clearInput:function(){
    console.log('clearInput called...')
    this.setData({
      inputValue:'',
      hasInput:false
    })
  },
  backHandler:function(){
    wx.navigateBack({ delta: 1 })
  },
  search:function(kw){
    let that = this
    dbInstance.recipe.search(kw).then(result =>{
      console.log(result)
      if(result.errCode === 0){
        that.setData({
          searchResult: result.data,
          noResult: result.data.length > 0 ? false : true
        })
      }else{
        that.setData({searchResult:[],noResult:true})
      }
    })
  },
  searchFromTag:function(event){
    let _index  = event.currentTarget.dataset.index 
    let _source = event.currentTarget.dataset.source 
    let tag = this.data[_source][_index]
    utils.addSearchHistory(tag)
    this.setData({ inputValue: tag.name, searchTrigger: true })
    wx.nextTick(() => this.data.debouncedSearchAction(tag.kw))
  },
  searchFromResult:function(event){
    let id = event.currentTarget.dataset.id
    let name = event.currentTarget.dataset.name 
    utils.addSearchHistory({name:name,kw:name})
    let url = `../recipe_detail/recipe_detail?id=${id}`
    wx.navigateTo({ url: url })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      debouncedSearchAction: debounce(this.search,300)
    })
    this.initSearchData()
  },
  initSearchData:function(){
    this.setData({
      searchRecommendTag: utils.getSearchRecommendTag(),
      searchHistory: utils.getSearchHistory()
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
  onShareAppMessage: function () {

  }
})