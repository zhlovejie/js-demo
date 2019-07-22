<template>
  <div class="recipe-list-wrapper" :style="{height:initHeight}">
    <cube-scroll
      ref="scroll"
      :data="recipe10.repiceList"
      :options="scrollConfig"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul class="repice-list-inner">
        <div class="recommend-top6-wrapper" v-if="recipeTop6.length > 0">
          <swiper :options="swiperOption" ref="mySwiper" >
            <!-- slides -->
            <swiper-slide v-for="(item, index) in recipe10.repiceList" class="repice-list-item" :key="index">
              <img class="repice-list-item-img" :src="formatImgURL(item.square_image)" style="width:100%;height:auto;" alt="">
              <div class="repice-list-item-desc">
                <div class="name-adj">{{item.name_adj}}</div>
                <div class="name">{{item.name}}</div>
              </div>
              <i class="cubeic-icon cubeic-like"></i>
              <p class="repice-list-item-text">{{item.name_adj}}{{item.name}}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="recommend-week-top10-wrapper" v-if="recipeWeekTop10.length > 0">
          <div class="__header">本周人气榜单</div>
          <cube-scroll
            ref="scroll-top10"
            :data="recipeTop6" 
            :options="scrollConfigTop10"
            direction="horizontal"
            class="horizontal-scroll-list-wrap" 
            >
            <ul class="list-wrapper">
              <li class="repice-list-item" v-for="(item,index) in recipeWeekTop10" :key="index" :style="recipeWeekTop10Image">
                <img class="repice-list-item-img" :src="formatImgURL(item.square_image)" :style="recipeWeekTop10Image" alt="">
                <p class="repice-list-item-text">No.{{index + 1}}·{{item.name_adj}}{{item.name}}</p>
              </li>
            </ul>
          </cube-scroll>
        </div>
        <div class="__header">更多美味</div>
        <ul class="repice-list-wrapper" v-if="recipe10.repiceList.length > 0">
          <li class="repice-list-item" v-for="(item,index) in recipe10.repiceList" :key="index">
            <img class="repice-list-item-img" :src="formatImgURL(item.square_image)" style="width:100%;height:auto;" alt="">
            <div class="repice-list-item-desc">
              <div class="name-adj">{{item.name_adj}}</div>
              <div class="name">{{item.name}}</div>
            </div>
            <i class="cubeic-icon cubeic-like"></i>
          </li>
        </ul>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>

export default {
  inject:['$http','$tools'],
  props: {
    recipeTag:{
      type:Object,
      require:true
    },
    render:{
      type:Boolean,
      require:true,
      default:false
    }
  },
  watch:{
    render:function(newVal,oldVal){
      if(newVal){
        this.renderAction()
      }
    }
  },
  data:function() {
    return {
      swiperOption:{
        slidesPerView: 1.1,
        spaceBetween: 15,
        slidesOffsetBefore:20,
        slidesOffsetAfter:20
      },
      recipeTop6Image:{
        width:(this.$tools.pageWidth - 40) + 'px',
        height:(this.$tools.pageWidth - 40)+ 'px',
      },
      recipeWeekTop10Image:{
        width:((this.$tools.pageWidth - 40) / 2) + 'px',
        height:((this.$tools.pageWidth - 40) / 2 * 1.5)+ 'px',
      },
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
      scrollConfigTop10:{
        //stopPropagation:true
        //nestMode:'free'
        //freeScroll:true
        stopPropagation:true
      },
      initHeight: `${window.innerHeight - 90}px`,
      recipeTop6:[],
      recipeWeekTop10:[],
      recipe10:{
        currentPage:1,
        pageSize:10,
        repiceList:[]
      }
    };
  },
  created:function(){
    //console.log(this)
    this.renderAction()
  },
  methods: {
    swiperInit(){
      console.log(arguments)
    },
    slideChangePage(){},
    slideClickHandler(){},
    renderAction(){
      let that = this
      if(this.render){
        console.log('渲染'+this.recipeTag.name)
        this.$http('getRecipe',{params:{tagName:this.recipeTag.name}}).then(function(result){
          that.recipeTop6 = result.data.recipe_top6 || []
          that.recipeWeekTop10 = result.data.recipe_weektop10 || []
          that.recipe10.currentPage = result.data.recipe_10.currentPage
          that.recipe10.pageSize = result.data.recipe_10.pageSize
          that.recipe10.repiceList = result.data.recipe_10.recipeList
        })
      }else{
        console.log('不渲染'+this.recipeTag.name)
      }
    },
    formatImgURL(url){
      return 'http://192.168.1.103:3000/public/image/0c36ca17c48e4c40a8be60da452de412_1920w_1920h.jpg'
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
    if(this.render && this.recipeTag.name === '今日推荐'){
      
    }
    //console.log('..................')
      window.vueInstance = this
  }
};
</script>

<style>
.recipe-list-wrapper{margin: 0;}
.recipe-list-wrapper .__header{font-size: 19px;color: #171717;padding: 10px 0 10px 20px;}
.repice-list-item
{
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background: #fff;
  vertical-align: top;
}
.repice-list-item .repice-list-item-img{
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
.repice-list-item .repice-list-item-desc{
  position: absolute;
  top:20px;
  left: 20px;
}
.repice-list-item .cubeic-icon{
  position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 200%;
    color: #fff;
}
.repice-list-item .repice-list-item-desc .name-adj{
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
.repice-list-item .repice-list-item-desc .name{
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  padding-top: 10px;
}
.repice-list-item .repice-list-item-text{
  position: absolute;
  left: 0;
  bottom: 10px;
  color: #171717;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-top6-wrapper .repice-list-item .cubeic-icon{
  bottom: 60px;
}

/* 横向滚动 */
.horizontal-scroll-list-wrap  .repice-list-item{
  display: inline-block;
}
.horizontal-scroll-list-wrap .cube-scroll-content{
  display: inline-block;
}
.horizontal-scroll-list-wrap .list-wrapper{white-space: nowrap}

.horizontal-scroll-list-wrap .list-wrapper .repice-list-item{
  display: inline-block;
  padding: 0;
  margin-right: 15px;
  height: auto !important;
}
.horizontal-scroll-list-wrap .list-wrapper .repice-list-item-img{
  position: static;
}
.horizontal-scroll-list-wrap .list-wrapper .repice-list-item:first-child{margin-left: 20px;}
.horizontal-scroll-list-wrap .list-wrapper .repice-list-item .repice-list-item-text{
  position: static;
  width: 100%;
  padding: 10px 0;
  overflow: auto;
  text-overflow: initial;
  white-space: normal;
}

.repice-list-wrapper{
  margin:0 20px;
}
.repice-list-wrapper .repice-list-item{
  margin-bottom: 20px;
}
/* .horizontal-scroll-list-wrap
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  .cube-scroll-content
    display: inline-block
  .list-wrapper
    padding: 0 10px
    line-height: 60px
    white-space: nowrap
  .list-item
    display: inline-block */
    
</style>
