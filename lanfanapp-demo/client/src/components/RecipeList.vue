<template>
  <div class="recipe-list-wrapper" :style="{height:initHeight}">
    <cube-scroll
      ref="scroll"
      :scroll-events="['scroll','scroll-end']" 
      @scroll="onScrollHandle" 
      @scroll-end = "onScrollEndHandle" 
      :data="recipeList"
      :options="scrollConfig"
      @pulling-up="onPullingUp">
      
        <RecommendTop6 v-if="recipeTop6.length > 0" :recipeList="recipeTop6" @tap="tapHandler"></RecommendTop6>
        <RecommendWeekTop10 v-if="recipeWeekTop10.length > 0" :recipeList="recipeWeekTop10" @tap="tapHandler"></RecommendWeekTop10>
        
        <div class="recommend-recipe-wrapper" v-if="recipeList.length > 0">
          <div class="__header" v-if="isFirst">更多美味</div>
          <ul class="repice-list-content">
            <li class="repice-list-item" v-for="(item,index) in recipeList" :key="index" @click="tapHandler(item,index)">
              <img class="repice-list-item-img" :src="formatImgURL(item.square_image)" style="width:100%;height:auto;" alt="">
              <div class="repice-list-item-desc">
                <div class="name-adj">{{item.name_adj}}</div>
                <div class="name">{{item.name}}</div>
              </div>
              <i class="cubeic-icon cubeic-like"></i>
            </li>
          </ul>
        </div>
      
    </cube-scroll>
  </div>
</template>

<script>
import RecommendTop6 from '@/components/RecommendTop6.vue'
import RecommendWeekTop10 from '@/components/RecommendWeekTop10.vue'

export default {
  props: ['recipeTag','render','isFirst'],
  watch:{
    render:function(newVal,oldVal){
      if(newVal){
        this.renderAction()
      }
    }
  },
  data:function() {
    return {
      scrollConfig: {
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多啦',
          },
        },
      },
      initHeight: `${window.innerHeight - 48}px`,
      recipeTop6:[],
      recipeWeekTop10:[],
      currentPage:1,
      recipeList:[],
      prevsSrollPosY:0,
      scrollPosY:0,
      isTrigger:false,
      isFirstRendered:true,
      noMore:false
    };
  },
  created:function(){
    if(!this.toast) this.toast = this.$createToast()
    this.renderAction()
  },
  methods: {
    renderAction(){
      let that = this
      let _url = ''
      if(this.render && this.isFirstRendered){
        this.toast.show()
        if(this.recipeTag.name === '今日推荐'){
          this.getRecommends()
          _url = `getAllRecipe/${this.currentPage}`
        }else{
          _url = `search/${encodeURIComponent(this.recipeTag.kw)}/${this.currentPage}`
        }
        this.$http(_url).then(function(result){
          that.currentPage = Number(result.data.currentPage)
          that.recipeList = result.data.recipeList
          that.toast.hide()
          that.isFirstRendered = false
        })
      }
    },
    getRecommends:function(callback){
      let that = this
      this.$http('getRecommends').then(function(result){
        that.recipeTop6 = result.data.recipe_top6 || []
        that.recipeWeekTop10 = result.data.recipe_weektop10 || []
        callback && callback()
      })
    },
    tapHandler:function(item,index){
      this.$router.push(`/recipe/${item.id}`)
    },
    formatImgURL(url){
      return this.$tools.formatImageUrl(url)
    },
    onScrollHandle:function(pos){
      this.scrollPosY = pos.y
      let offset = Math.abs(this.prevsSrollPosY - this.scrollPosY)
      if(!this.isTrigger && offset > 10){
        this.$emit('slideDirectionAction',(this.prevsSrollPosY >= this.scrollPosY) ? 'up' : 'down')
        this.isTrigger = true
      }
    },
    onScrollEndHandle:function(){
      this.prevsSrollPosY = this.scrollPosY
      this.isTrigger = false
    },
    onPullingUp() {
      let that = this
      if(that.noMore) {
        that.$refs.scroll.forceUpdate()
        setTimeout(function(){
          that.$refs.scroll.scroll.scrollBy(0, 64, 500);
        },500)
        return 
      }

      let _url = ''
      if(this.recipeTag.name === '今日推荐'){
        _url = `getAllRecipe/${this.currentPage + 1}`
      }else{
        _url = `search/${encodeURIComponent(this.recipeTag.kw)}/${this.currentPage + 1}`
      }

      this.$http(_url).then(result =>{
        if(result.data.recipeList.length === 0) {
          that.$refs.scroll.forceUpdate()
          setTimeout(function(){
            that.$refs.scroll.scroll.scrollBy(0, 64, 500);
            that.noMore = true
          },500)
          return
        }
        that.recipeList = that.recipeList.concat (result.data.recipeList)
        that.currentPage = result.data.currentPage
        that.$refs.scroll.forceUpdate()
      }).catch(err => {
        console.log(err.message)
      })
    }
  },
  mounted:function(){
    window.vueInstance = this
    //console.log(this)
  },
  components:{
    RecommendTop6,
    RecommendWeekTop10
  }
};
</script>

<style lang="scss">
.recipe-list-wrapper{
  margin: 0;
  .__header{
    font-size: 18px;
    color: #333;
    font-weight: bold;
    padding: 10px 0 10px 20px;
    margin-top: 20px;
  }
}
.recommend-recipe-wrapper{
  margin:0 20px;
  .__header{
    padding-left:0;
  }
  .repice-list-item{
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    vertical-align: top;
    margin-bottom: 20px;

    .repice-list-item-img{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 10px;
    }

    .repice-list-item-desc{
      position: absolute;
      top:20px;
      left: 20px;
      right: 20px;
      white-space: normal;
      line-height: 1.2;

      .name-adj{
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }
      .name{
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        padding-top: 10px;
      }
    }

    .cubeic-icon{
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 200%;
      color: #fff;
    }

    .repice-list-item-text{
      position: absolute;
      left: 0;
      bottom: 10px;
      color: #333;
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
      font-weight: bold;
    }
  }
}

</style>
