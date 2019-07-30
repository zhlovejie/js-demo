<template>
  <!-- <SearchBar></SearchBar> -->
  <div class="container">
    <SearchBar @touched="searchBarTouched" :disabled="true"></SearchBar>
    
    <transition name="fade">
      <div class="nav-bar-wrapper" v-show="showNavBar">
        <cube-scroll-nav-bar ref="scrollNavBar" :current="current" :labels="navLabels" @change="changeHandler" />
      </div>
    </transition>

    <div class="main-container">
      <div class="main-wrapper">
        <cube-slide
          :data="navLabels"
          :initialIndex="currentIndex"
          :loop="false"
          :autoPlay="false"
          :threshold="0.2"
          @change="slideChange" 
          :class="{'cube-slide-wrapper-padding':showNavBar}"
          >
          <cube-slide-item v-for="(item, index) in navLabels" :key="index">
            <RecipeList 
              :recipeTag="allRecipeCategory.customCategory[index]" 
              :isFirst="index === 0" 
              :render="index === currentIndex"
              @slideDirectionAction="slideDirectionAction"
            ></RecipeList>
          </cube-slide-item>
          <div slot="dots"></div>
        </cube-slide>
      </div>
    </div>

    <TabBar></TabBar>

    <transition name="fade">
      <router-view name="search" class="new-page"></router-view>
    </transition>

    <transition :name="transitionName">
      <router-view name="defaultView" class="new-page"></router-view>
    </transition>

    <router-view name="topPageView" class="top-page-view"></router-view>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchBar from '@/components/SearchBar.vue'
import RecipeList from '@/components/RecipeList.vue'
import TabBar from '@/components/TabBar.vue'

export default {
  name: 'home',
  data:function(){
    return {
      navLabels:[],
      current:'',
      currentIndex:0,
      allRecipeCategory:{},
      showNavBar:true,
      enterActiveClass:"",
      leaveActiveClass:"",
      pageStack:['/'],
      transitionName:'slide-left'
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
  watch:{
    '$route':function (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods:{
    slideDirectionAction:function(direction){
      //console.log('slideDirectionAction called....'+direction)
      this.showNavBar = direction === 'down' ? true : false
      if(this.showNavBar){
        this.$nextTick(() => this.$refs.scrollNavBar.refresh())
      }
    },
    searchBarTouched:function(){
      this.$router.push('/search')
    },
    changeHandler:function(label){
      console.log(arguments)
      this.currentIndex = this.navLabels.findIndex(txt => txt === label)
    },
    slideChange:function(index){
      this.current = this.navLabels[index]
      if(!this.showNavBar){
        this.showNavBar = true
        this.$nextTick(() => this.$refs.scrollNavBar.refresh())
      }
    }
  },
  components: {
    HelloWorld,
    SearchBar,
    RecipeList,
    TabBar
  }
}
</script>

<style lang="scss">
body {
    background: #fff;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Arial,sans-serif;
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 640px;
    margin: auto;
}

img,video {-webkit-touch-callout: none;}

.container #search-bar-show{
  left:20px;
  right: 20px;
}
.main-container{
  position: absolute;
  top:45px;
  left:0;
  right: 0;
  bottom: 40px;
  z-index: 1;
  .cube-slide-wrapper-padding{
    padding-top: 40px;
  }
}
.nav-bar-wrapper{
  position: fixed;
  top: 45px;
  left: 0px;
  right: 0px;
  z-index: 10;
  background-color: #fff;

  .cube-scroll-nav-bar-items{
    .cube-scroll-nav-bar-item{
      display: inline-block;
      vertical-align: top;
      padding: 8px 15px;
      color: #888;
      font-size: 14px;
      font-weight: bold;
    }
    .cube-scroll-nav-bar-item_active{
      color: #fff;
      background-color: #333;
      border-radius: 30px;
    }
    .cube-scroll-nav-bar-item:first-child{
      margin-left: 20px;
    }
    .cube-scroll-nav-bar-item:last-child{
      margin-right: 20px;
    }
  }
}


.height-0{height: 0;overflow: hidden;}

.animated-short {
  -webkit-animation-duration: .2s;
  animation-duration: .2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.new-page{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	overflow-y: scroll;
}

.top-page-view{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 40px;
  z-index: 20;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
	overflow-y: scroll;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.new-page{
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}


</style>
