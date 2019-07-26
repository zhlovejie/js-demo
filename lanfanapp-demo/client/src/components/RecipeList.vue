<template>
  <div class="recipe-list-wrapper" :style="{height:initHeight}">
    <cube-scroll
      ref="scroll"
      :scroll-events="['scroll','scroll-end']" 
      @scroll="onScrollHandle" 
      @scroll-end = "onScrollEndHandle" 
      :data="recipe10.repiceList"
      :options="scrollConfig"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      
        <RecommendTop6 v-if="recipeTop6.length > 0" :repiceList="recipeTop6" @tap="tapHandler"></RecommendTop6>
        <RecommendWeekTop10 v-if="recipeWeekTop10.length > 0" :repiceList="recipeWeekTop10" @tap="tapHandler"></RecommendWeekTop10>
        
        <div class="recommend-recipe-wrapper" v-if="recipe10.repiceList.length > 0">
          <div class="__header" v-if="isFirst">更多美味</div>
          <ul class="repice-list-content">
            <li class="repice-list-item" v-for="(item,index) in recipe10.repiceList" :key="index" @click="tapHandler(item,index)">
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
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: '刷新成功',
        },
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多啦',
          },
        },
      },
      initHeight: `${window.innerHeight - 90}px`,
      recipeTop6:[],
      recipeWeekTop10:[],
      recipe10:{
        currentPage:1,
        pageSize:10,
        repiceList:[]
      },
      prevsSrollPosY:0,
      scrollPosY:0,
      isTrigger:false,
      isFirstRendered:true
    };
  },
  created:function(){
    this.renderAction()
  },
  methods: {
    renderAction(){
      
      
      let that = this
      if(this.render && this.isFirstRendered){
        if(!this.toast){
          this.toast = this.$createToast()
        }
        this.toast.show()
        this.$http('getRecipe',{params:{tagName:this.recipeTag.name}}).then(function(result){
          that.recipeTop6 = result.data.recipe_top6 || []
          that.recipeWeekTop10 = result.data.recipe_weektop10 || []
          that.recipe10.currentPage = result.data.recipe_10.currentPage
          that.recipe10.pageSize = result.data.recipe_10.pageSize
          that.recipe10.repiceList = result.data.recipe_10.recipeList
          that.toast.hide()
          that.isFirstRendered = false
        })
      }
    },
    tapHandler:function(item,index){
      this.$router.push(`/recipe/${item.id}`)
    },
    formatImgURL(url){
      return this.$tools.formatImageUrl(url)
    },
    onScrollHandle:function(pos){
      this.scrollPosY = pos.y
      if(this.prevsSrollPosY >= this.scrollPosY){
        if(!this.isTrigger){
          this.$emit('slideDirectionAction','up')
        }
      }else{
        if(!this.isTrigger){
          this.$emit('slideDirectionAction','down')
        }
      }
      this.isTrigger = true
    },
    onScrollEndHandle:function(){
      this.prevsSrollPosY = this.scrollPosY
      this.isTrigger = false
    },
    onPullingDown() {
      this.loadMatch('down');
    },
    loadMatch(type) {

      // setTimeout(() => { // 这里用setTimeout模拟数据请求,真实情况下你需要向接口请求数据
      //   if (Math.random() > 0.5) {
      //     const match = [];
      //     for (let index = 5; index > 0; index--) {
      //       match.push(this.repiceList.recipe_10[index]);
      //     }
      //     if (type === 'down') {
      //       this.repiceList.recipe_10.unshift(...match);
      //     } else if (type === 'up') {
      //       this.repiceList.recipe_10 = this.repiceList.recipe_10.concat(match);
      //     }
      //   } else {
      //     this.$refs.scroll.forceUpdate();
      //     if (type === 'up') { // 上拉加载时，无更多数据的提示文案显示之后，让列表回到原位
      //       setTimeout(() => {
      //         this.$refs.scroll.scroll.scrollBy(0, 64, 800);
      //       }, 1000);
      //     }
      //   }
      // }, 1000);
    },
    onPullingUp() {
      this.loadMatch('up');
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
    font-size: 19px;
    color: #171717;
    padding: 10px 0 10px 20px;
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
      color: #171717;
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
