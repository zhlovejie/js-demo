<template>
  <div id="category-wrapper">
    <SearchBar 
      :showBackButton="true" 
      :disabled="true" 
      :value="''" 
      @touchedBack="touchedBack"
    ></SearchBar>
  <cube-scroll-nav
    :side="true"
    :data="category"
    :current="current" 
    class="cube-scroll-nav-wrapper"
  >
    <cube-scroll-nav-panel
      v-for="item in category"
      :key="item.name"
      :label="item.name"
      :title="item.name"
    >
      <ul>
        <li v-for="(tag,index) in item.tags" :key="index" @click="tapItemHandler(tag)">
          <div>
            <p>{{tag.name}}</p>
          </div>
        </li>
      </ul>
    </cube-scroll-nav-panel>
  </cube-scroll-nav>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  data:function(){
    return {
      category:[],
      current:''
    }
  },
  created:function(){
    this.category = this.getCategory()
    this.current = this.category[0].name
  },
  methods:{
    getCategory:function(){
      let allRecipeCategoryStr = window.localStorage.getItem('allRecipeCategory')
      let allRecipeCategory = JSON.parse(allRecipeCategoryStr)
      return allRecipeCategory.allCategory
    },
    tapItemHandler:function(item){
      this.$router.push(`/search/${encodeURIComponent(item.kw)}`)
    },
    touchedBack:function(){
      this.$router.go(-1)
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" >
  #category-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;

    .cube-scroll-nav-wrapper{
      top:48px;
    }
    // 侧边栏
    .cube-sticky-fixed{
      .cube-scroll-nav-bar{
        background-color: #f6f6f6;
        color: #aaa;

        .cube-scroll-nav-bar-item{
          padding: 10px 0;
          span{
            display: block;
            padding: 5px 15px;
            border-right: 3px solid transparent;
          }
        }
        .cube-scroll-nav-bar-item_active{
          span{
            border-right: 3px solid #2fbaf3;
            color:#333;
          }
        }
      }
    }
    //内容
    .cube-scroll-nav-panel{
      
      ul{
        display: flex;
        flex-wrap: wrap;
        margin-left: 20px;
        
        li{
          padding: 10px 15px;
          text-align: center;
          margin: 0 15px 15px 0;
          background-color: #f5f5f5;
          border-radius: 30px;
        }
      }
    }

    .cube-scroll-nav-panel-title{
      padding: 15px 20px;
      color: #aaa;
      background-color: #fff;
    }
  }

</style>
