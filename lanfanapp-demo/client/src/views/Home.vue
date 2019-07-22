<template>
  <!-- <SearchBar></SearchBar> -->
  <div class="container">
    <SearchBarShow @touched="searchBarTouched"></SearchBarShow>
    <div class="main-container">

      <div class="nav-bar-wrapper">
        <cube-scroll-nav-bar :current="current" :labels="navLabels" @change="changeHandler" />
      </div>

      <div class="main-wrapper">
        <cube-slide
          :data="navLabels"
          :initialIndex="currentIndex"
          :loop="false"
          :autoPlay="false"
          :threshold="0.1"
          @change="slideChange">
          <cube-slide-item v-for="(item, index) in navLabels" :key="index">
            <RecipeList :recipeTag="allRecipeCategory.customCategory[index]" :render="index === currentIndex"></RecipeList>
          </cube-slide-item>
          <div slot="dots"></div>
        </cube-slide>
      </div>

      <!-- <div class="recipe-top6-wrapper"></div>

      <div class="recipe-weektop10-wrapper"></div>

      <div class="recipe-list"></div> -->
    </div>
    
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchBar from '@/components/SearchBar.vue'
import SearchBarShow from '@/components/SearchBarShow.vue'
import RecipeList from '@/components/RecipeList.vue'

export default {
  inject:['$http'],
  name: 'home',
  data:function(){
    return {
      navLabels:[],
      current:'',
      currentIndex:0,
      allRecipeCategory:{}
    }
  },
  created:function(){
    let that = this
    let _allRecipeCategory = window.localStorage.getItem('allRecipeCategory')
    if(_allRecipeCategory){
      that.allRecipeCategory = JSON.parse(_allRecipeCategory)
      that.navLabels = that.allRecipeCategory.customCategory.map(item =>{return item.name})
      that.current = that.navLabels[0]
    }else{
      this.$http('allRecipeCategory').then(function(result){
        window.localStorage.setItem('allRecipeCategory',JSON.stringify(result.data))
        that.allRecipeCategory = result.data
        that.navLabels = that.allRecipeCategory.customCategory.map(item =>{return item.name})
        that.current = that.navLabels[0]
      })
    } 
  },
  methods:{
    searchBarTouched:function(){
      console.log('1111')
    },
    changeHandler:function(label){
      console.log(arguments)
      this.currentIndex = this.navLabels.findIndex(txt => txt === label)
    },
    slideChange:function(index){
      console.log(arguments)
      this.current = this.navLabels[index]
    }
  },
  components: {
    HelloWorld,
    SearchBarShow,
    RecipeList
  }
}
</script>

<style>
body {
    background: #fff;
    /* font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Arial,sans-serif;
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-font-smoothing: antialiased */

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

img,video {
    -webkit-touch-callout: none
}


.main-container{
  position: absolute;
  top:46px;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.nav-bar-wrapper{padding: 5px 0;}
.cube-scroll-nav-bar-items .cube-scroll-nav-bar-item:first-child{margin-left: 20px;}
.cube-scroll-nav-bar-items .cube-scroll-nav-bar-item:last-child{margin-right: 20px;}
.cube-scroll-nav-bar-item{
  display: inline-block;
  vertical-align: top;
  padding: 10px 15px;
  color: #a8a8a8;
}
.cube-scroll-nav-bar-item_active{
  color: #fff;
  background-color: #171717;
  border-radius: 30px;
}
</style>
