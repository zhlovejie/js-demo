<template>
  <!-- <SearchBar></SearchBar> -->
  <div class="container">
    <SearchBar @touched="searchBarTouched" :disabled="true"></SearchBar>
    <div class="main-container">
      <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp height-0">
        <div class="nav-bar-wrapper" v-show="showNavBar">
          <cube-scroll-nav-bar ref="scrollNavBar" :current="current" :labels="navLabels" @change="changeHandler" />
        </div>
      </transition>

      <div class="main-wrapper">
        <cube-slide
          :data="navLabels"
          :initialIndex="currentIndex"
          :loop="false"
          :autoPlay="false"
          :threshold="0.1"
          @change="slideChange"
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

    <router-view name="search" class="new-page"></router-view>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchBar from '@/components/SearchBar.vue'
import RecipeList from '@/components/RecipeList.vue'

export default {
  name: 'home',
  data:function(){
    return {
      navLabels:[],
      current:'',
      currentIndex:0,
      allRecipeCategory:{},
      showNavBar:true
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
      console.log(arguments)
      this.current = this.navLabels[index]

      this.showNavBar = true
      this.$nextTick(() => this.$refs.scrollNavBar.refresh())
    }
  },
  components: {
    HelloWorld,
    SearchBar,
    RecipeList
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
}

img,video {-webkit-touch-callout: none;}

.container #search-bar-show{
  left:20px;
  right: 20px;
}
.main-container{
  position: absolute;
  top:46px;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.nav-bar-wrapper{
  padding: 5px 0;
  .cube-scroll-nav-bar-items{
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
    .cube-scroll-nav-bar-item:first-child{
      margin-left: 20px;
    }
    .cube-scroll-nav-bar-item:last-child{
      margin-right: 20px;
    }
  }
}


.height-0{height: 0;overflow: hidden;}

.animated {
  -webkit-animation-duration: .2s;
  animation-duration: .2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInDown {
  -webkit-animation-name: slideInDown;
  animation-name: slideInDown;
}

@-webkit-keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

.slideOutUp {
  -webkit-animation-name: slideOutUp;
  animation-name: slideOutUp;
}


.new-page{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background-color: #fff;
}

</style>
