<template>
  <div class="search-container">
    <div class="search-wrapper">
      <SearchBar
        :searchText.sync="searchText" 
        :showCancelButton="true" 
        @touchedCancel="searchCancel"
      ></SearchBar>

      <div id="search-content">
        <div class="search-recommend" v-if="!hasSearchText">
          <div class="search-history" v-if="historyCategory.length > 0">
            <div class="__header">
              <div class="__title">最近搜索历史 </div><span @click="clearHistoryCategory">清空</span>
            </div>
            <ul class="__tags">
              <li class="__tag" v-for="(tag,index) in historyCategory" :key="index" @click="tapItemHandler(tag)">
                {{tag.name}}
              </li>
            </ul>
          </div>
          <div class="search-category" v-if="allCategory.length > 0">
            <div class="__header">
              <div class="__title">分类 </div><span @click="showCategory">全部分类</span>
            </div>
            <ul class="__tags">
              <li class="__tag" v-for="(tag,index) in allCategory" :key="index" @click="tapItemHandler(tag)">
                {{tag.name}}
              </li>
            </ul>
          </div>
          <div class="search-hot" v-if="hotCategory.length > 0">
            <div class="__header">
              <div class="__title">热门搜索</div>
            </div>
            <ul class="__tags">
              <li class="__tag" v-for="(tag,index) in hotCategory" :key="index" @click="tapItemHandler(tag)">
                {{tag.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="search-result" v-if="hasSearchText">
          <p v-if="searchError" class="searchError">未搜索到 <span>{{searchText}}</span> 内容</p>
          <p v-if="!searchError" class="searchKW" @click="tapItemHandler(searchText)">直接搜索 <span>{{searchText}}</span></p>
          <ul v-if="searchResult.length > 0" class="search-result-list">
            <li v-for="(item,index) in searchResult" :key="index" @click="tapItemHandler({name:item.name,kw:item.name})">{{item.name}}</li>
          </ul>
        </div>
        
      </div>
      
    </div>

    <transition :name="transitionName">
      <router-view name="searchPage" class="new-page"></router-view>
    </transition>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  data:function(){
    return {
      searchText:'',
      searchResult:[],
      searchError:false,
      allCategory:[],
      hotCategory:[],
      historyCategory:[],
      transitionName:'slide-left'
    }
  },
  
  created:function(){
    this.debouncedSearchAction = _.debounce(this.searchAction, 500)
    let that = this
    let _allRecipeCategory = {}
    let _allRecipeCategoryStr = window.localStorage.getItem('allRecipeCategory')
    if(_allRecipeCategoryStr){
      _allRecipeCategory = JSON.parse(_allRecipeCategoryStr)
      that.allCategory = _allRecipeCategory.allCategory || []
      that.hotCategory = _allRecipeCategory.hotCategory || []
      that.historyCategory = _allRecipeCategory.historyCategory || []
    }else{
      this.category = this.$http('allRecipeCategory').then(function(result){
        that.allCategory = result.data.allCategory || []
        that.hotCategory = result.data.hotCategory || []
        that.historyCategory = result.data.historyCategory || []
        window.localStorage.setItem('allRecipeCategory',JSON.stringify(result.data))
      })
    }
  },
  watch:{
    searchText:function(newText,oldText){
      this.debouncedSearchAction()
    }
  },
  computed:{
    hasSearchText:function(){
      return this.searchText.length > 0
    }
  },
  methods:{
    clearSearchText:function(){
      this.searchText = ''
    },
    searchCancel:function(){
      this.$router.go(-1)
    },
    searchAction:function(){
      let that = this
      if(this.searchText.length <= 0) return 
      that.$http(`search/${encodeURIComponent(that.searchText)}/1`).then(result =>{
        that.searchResult = result.data.recipeList
        that.searchError = that.searchResult.length === 0 ? true : false
      }).catch(error =>{
        that.searchResult = []
        that.searchError = true
      })
    },
    tapItemHandler:function(item){
      //保存到历史记录
        let _allRecipeCategory = {}
        let _allRecipeCategoryStr = window.localStorage.getItem('allRecipeCategory')
        if(_allRecipeCategoryStr){
          _allRecipeCategory = JSON.parse(_allRecipeCategoryStr)
          _allRecipeCategory.historyCategory = _allRecipeCategory.historyCategory || []
        }else{
          _allRecipeCategory.historyCategory = []
        }

        let _index = _allRecipeCategory.historyCategory.findIndex(tag => tag.name === item.name)
        if(_index >= 0){
          _allRecipeCategory.historyCategory.splice(_index,1)
        }

        let newItem = {
          name:item.name,
          kw:item.kw ? item.kw : (item.tags ? item.tags.map(tag => tag.kw).join(',') : '' )
        }
        _allRecipeCategory.historyCategory.unshift(newItem)

        window.localStorage.setItem('allRecipeCategory',JSON.stringify(_allRecipeCategory))
        this.historyCategory = _allRecipeCategory.historyCategory

        this.$router.push(`/search/${encodeURIComponent(newItem.kw)}`)

        window.localStorage.setItem('lastSearchItem',JSON.stringify(newItem))
    },
    clearHistoryCategory:function(){
      let _allRecipeCategory = {}
      let _allRecipeCategoryStr = window.localStorage.getItem('allRecipeCategory')
      if(_allRecipeCategoryStr){
        _allRecipeCategory = JSON.parse(_allRecipeCategoryStr)
        _allRecipeCategory.historyCategory = []
      }else{
        _allRecipeCategory.historyCategory = []
      }
      window.localStorage.setItem('allRecipeCategory',JSON.stringify(_allRecipeCategory))
      this.historyCategory = []
    },
    showCategory:function(){
      this.$router.push('/search/category')
    }
  },
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper{
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  background-color: #fff;
}

.search-wrapper #search-bar-show{
  left: 20px;
  right: 20px;
}

#search-content{
  position: absolute;
  left: 0;
  top: 48px;
  right: 0;
  bottom: 0;
  font-size: 14px;

  .__header{
    display: flex;
    align-items: center;
    color: #a8a8a8;
    line-height: 40px;

    .__title{flex-grow: 1;color: #999;}
    span{padding: 0 20px;}
  }


  .__tags{
    display: flex;
    flex-wrap: wrap;

    .__tag{
      padding: 10px 15px;
      text-align: center;
      margin: 0 15px 15px 0;
      background-color: #f5f5f5;
      border-radius: 30px;
    }
  }
}


.search-result{
  margin: 0 20px;

  .searchError,.searchKW{
    color: #999;
    padding: 15px 0;
    font-size: 16px;
    span{color: #333;padding: 0 10px;}
  }

  .search-result-list{
    color: #333;
    li {padding: 15px 0;}
  }
}


</style>
