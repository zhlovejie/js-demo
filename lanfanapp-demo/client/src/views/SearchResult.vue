<template>
  <div class="search-container">
    <SearchBar 
      :showBackButton="true" 
      :disabled="true" 
      :value="searchWord" 
      @touchedBack="touchedBack"
    ></SearchBar>
    <div class="search-result-wrapper">
      <cube-scroll 
        ref="searchResultScroll" 
        :data="recipeList"
        :options="scrollConfig"
        @pulling-up="onPullingUp"
      >
        <p v-if="noResult" class="no-result">无结果</p>
        <div class="search-result-content" v-if="recipeList.length > 0">
          <div 
            v-for="(item, index) in recipeList" 
            :data-index="index" 
            :key="index" 
            class="repice-list-item" 
            @click="tapHandler(item,index)"
            >
              <img class="repice-list-item-img" :data-index="index" :src="formatImgURL(item.square_image)" :style="recipeWeekTop10Image" >
              <p class="repice-list-item-text" :data-index="index">{{item.name_adj}}{{item.name}}</p>
              <p class="repice-list-item-info">{{item.time_consuming}} {{item.difficulty_text}}</p>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  data:function(){
    return {
      recipeWeekTop10Image:{
        width:((this.$tools.pageWidth - 40) / 2) + 'px',
        height:((this.$tools.pageWidth - 40) / 2 * 1.5)+ 'px',
      },
      searchWord:this.getSearchWord(),
      keyWord:'',
      currentPage:1,
      recipeList:[],
      noResult:false,
      scrollConfig: {
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多啦',
          },
        },
      },
      noMore:false
    }
  },
  created:function(){
    if(!this.toast){
      this.toast = this.$createToast()
    }
    this.toast.show()
    let kw = this.$route.params.kw
    this.keyWord = kw
    let that = this
    this.$http(`search/${encodeURIComponent(kw)}/${this.currentPage}`).then(result =>{
      that.recipeList = result.data.recipeList
      that.currentPage = Number(result.data.currentPage)
      that.keyWord = result.data.keyWord
      that.noResult = that.recipeList.length === 0 ? true : false
      that.toast.hide()
    }).catch(err => {
      that.recipeList = []
      that.noResult = true
      console.log(err.message)
      that.toast.hide()
    })
  },
  methods:{
    touchedBack:function(){
      this.$router.go(-1)
    },
    tapHandler:function(item,index){
      this.$router.push(`/recipe/${item.id}`)
    },
    getSearchWord:function(){
      let lastSearchItemStr = window.localStorage.getItem('lastSearchItem')
      let item = JSON.parse(lastSearchItemStr)
      return item.name
    },
    formatImgURL(url){
      return this.$tools.formatImageUrl(url)
    },
    onPullingUp() {
      //this.$refs.searchResultScroll.forceUpdate();
      let that = this
      if(that.noMore) {
        that.$refs.searchResultScroll.forceUpdate()
        setTimeout(function(){
          that.$refs.searchResultScroll.scroll.scrollBy(0, 64, 500);
        },500)
        return 
      }
      this.$http(`search/${encodeURIComponent(this.keyWord)}/${this.currentPage + 1}`).then(result =>{
        if(result.data.recipeList.length === 0) {
          that.$refs.searchResultScroll.forceUpdate()
          setTimeout(function(){
            that.$refs.searchResultScroll.scroll.scrollBy(0, 64, 500);
            that.noMore = true
          },500)
          return
        }
        that.recipeList = that.recipeList.concat (result.data.recipeList)
        that.currentPage = result.data.currentPage
        that.$refs.searchResultScroll.forceUpdate()
      }).catch(err => {
        console.log(err.message)
      })
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" scoped>

.search-container #search-bar-show{
  left: 20px;
  right: 20px;
}

.search-result-wrapper{
  position: absolute;
  top: 46px;
  left:0;
  right: 0;
  bottom: 0;
  .no-result{
    margin: 10px 20px;
    color: #333;
  }
  .search-result-content{

    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    align-items: center;
    margin: 0 10px;
    .repice-list-item{
      width: 50%;
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      padding: 10px;
      margin-bottom: 10px;
      .repice-list-item-img{
        width: auto !important;
        height: auto;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: 10px;
      }
      .repice-list-item-text{
        width: 100%;
        padding: 5px 0;
        overflow: auto;
        text-overflow: initial;
        white-space: normal;
        line-height: 1.2;
        font-size: 15px;
        font-weight: bold;
      }
      .repice-list-item-info{
        font-size: 13px;
        color: #aaa;
      }
    }
  }
}
</style>

