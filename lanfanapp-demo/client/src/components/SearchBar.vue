<template>
  <div class="search-wrapper">
    <div id="search-header">
      <div class="search-bar">
        <div class="search-input-wrap">
          <i class="cubeic-icon cubeic-search"></i>
          <input type="text" class="search-input" v-model="searchText" placeholder="搜索食材、菜谱">
          <i class="cubeic-icon cubeic-wrong" v-show="hasSearchText"  @click="clearSearchText"></i>
        </div>
        <button class="search-btn-cancel">取消</button>
      </div>
    </div>
    
    <div id="search-content">
      <div class="search-history">
        <div class="__header">
          <div class="__title">最近搜索历史 </div><span>清空</span>
        </div>
        <ul class="__tags">
          <li class="__tag" v-for="(tag,index) in category.historyCategory" :key="index">
            {{tag.name}}
          </li>
        </ul>
      </div>
      <div class="search-category">
        <div class="__header">
          <div class="__title">分类 </div><span>全部分类</span>
        </div>
        <ul class="__tags">
          <li class="__tag" v-for="(tag,index) in category.allCategory" :key="index">
            {{tag.name}}
          </li>
        </ul>
      </div>
      <div class="search-hot">
        <div class="__header">
          <div class="__title">热门搜索</div>
        </div>
        <ul class="__tags">
          <li class="__tag" v-for="(tag,index) in category.hotCategory" :key="index">
            {{tag.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject:['$http'],
  data:function(){
    return {
      searchText:'',
      category:{
        allCategory:[],
        hotCategory:[],
        historyCategory:[]
      }
    }
  },
  created:function(){
    let that = this
    console.log(this)
    this.category = this.$http('allRecipeCategory').then(function(result){
      
      let data = result.data
      that.category = result.data
      // that.category.allCategory = data.allCategory
      // that.category.hotCategory = data.hotCategory
      // that.category.historyCategory = data.historyCategory

      console.log(that)
    })
  },
  computed:{
    hasSearchText:function(){
      return this.searchText.length > 0
    }
  },
  methods:{
    clearSearchText:function(){
      this.searchText = ''
    }
  }
}
</script>

<style>
.search-wrapper{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
#search-header{
  position: fixed;left: 10px;right: 10px;
  background-color: #fff;
  padding: 5px 0;
}
.search-bar{
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-input-wrap{
  position: relative;
  flex-grow:1;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 40px;
  display: flex;
}
.cubeic-icon{color: #aaa;}
.search-input{
  outline: none;
  padding: 0 5px;
  color: #333;
  background-color: #f5f5f5;
  flex-grow:1;
}

.search-btn-cancel{
  color: #2bbbee;
  font-size: 17px;
  background: none;
  border: none;
  outline: none;
  padding: 5px 10px 5px 20px;
  margin-left: 10px;
}


#search-content{
  position: absolute;
  left: 10px;
  top: 48px;
  right: 20px;
  bottom: 0;
   
}

.__header{
  display: flex;
  align-items: center;
  color: #a8a8a8;
  line-height: 40px;
}
.__header .__title{
  flex-grow: 1;
  color: #999;
}
.__header span{
  padding: 0 10px;
}

.__tags{
  display: flex;
  flex-wrap: wrap;
}

.__tags .__tag{
  padding: 10px 15px;
  text-align: center;
  margin-right: 10px;
  background-color: #f5f5f5;
  border-radius: 30px;
  margin-bottom: 10px;
}
</style>
