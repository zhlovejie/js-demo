<template>
  <div class="recommend-top6-wrapper">
    <swiper :options="swiperOption" ref="mySwiper" @tap="tapHandler">
      <swiper-slide v-for="(item, index) in recipeList" class="repice-list-item" :key="index">
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
</template>

<script>
export default {
  props:['recipeList'],
  data:function(){
    return {
      swiperOption:{
        slidesPerView: 1.2,
        spaceBetween: 20,
        slidesOffsetBefore:20,
        slidesOffsetAfter:20
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods:{
    formatImgURL(url){
      return this.$tools.formatImageUrl(url)
    },
    tapHandler:function(){
      this.$emit('tap',this.recipeList[this.swiper.realIndex],this.swiper.realIndex)
    }
  }
}
</script>
<style lang="scss" scoped>
  .repice-list-item {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    vertical-align: top;

    .repice-list-item-img {
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

    .repice-list-item-desc {
      position: absolute;
      top:20px;
      left: 20px;
      right: 20px;
      white-space: normal;
      line-height: 1.2;
      
      .name-adj {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }

      .name {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        padding-top: 10px;
      }
    }

    .cubeic-icon {
      position: absolute;
      right: 20px;
      bottom: 60px;
      font-size: 200%;
      color: #fff;
    }

    .repice-list-item-text {
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
</style>

