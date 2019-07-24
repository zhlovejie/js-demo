<template>
  <div id="recommend-week-top10-wrapper" >
    <div class="__header">本周人气榜单</div>
    <swiper :options="swiperOption" ref="mySwiperWeekTop10" @tap="tapHandler">
      <swiper-slide v-for="(item, index) in repiceList" :data-index="index" class="repice-list-item" :key="index">
          <img class="repice-list-item-img" :data-index="index" :src="formatImgURL(item.square_image)" :style="recipeWeekTop10Image" >
          <p class="repice-list-item-text" :data-index="index">No.{{index + 1}}·{{item.name_adj}}{{item.name}}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props:['repiceList'],
  data:function(){
    return {
      swiperOption:{
        slidesPerView: 2.2,
        spaceBetween: 15,
        slidesOffsetBefore:20,
        slidesOffsetAfter:20,
        freeMode: true
      },
      scrollConfigTop10:{
        freeScroll:true
      },
      recipeWeekTop10Image:{
        width:((this.$tools.pageWidth - 40) / 2) + 'px',
        height:((this.$tools.pageWidth - 40) / 2 * 1.5)+ 'px',
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiperWeekTop10.swiper
    }
  },
  methods:{
    formatImgURL(url){
      return this.$tools.formatImageUrl(url)
    },
    tapHandler:function(event){
      let _index = Number(event.srcElement.dataset['index'])
      this.$emit('tap',this.repiceList[_index],_index)
    }
  }
}
</script>

<style lang="scss">
/* 横向滚动 */
#recommend-week-top10-wrapper {
  .repice-list-item{
    .repice-list-item-img{
      width: 100% !important;
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
    }
  }
}
  

</style>
