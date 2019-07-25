<template>
  <div id="search-bar-show" >
    <div class="search-bar" >
      <i class="cubeic-icon cubeic-back" v-if="showBackButton" @click="touchedBack"></i>
      <div class="search-input-wrap" @click="touched">
        <i class="cubeic-icon cubeic-search"></i>
        <input type="text" class="search-input" :disabled="disabled" v-model="searchText" :placeholder="placeholder">
        <i class="cubeic-icon cubeic-wrong" v-show="hasSearchText"  @click="touchedClearSearchText"></i>
      </div>
      <button class="search-btn-cancel" v-if="showCancelButton" @click="touchedCancel">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    showBackButton:{
      type:Boolean,
      default:false
    },
    showCancelButton:{
      type:Boolean,
      default:false
    },
    placeholder:{
      type:String,
      default:'搜索食材、菜谱'
    },
    value:{
      type:String,
      default:''
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data:function(){
    return {
      searchText:''
    }
  },
  created:function(){
    this.searchText = this.value
  },
  watch:{
    searchText:function(newText,oldText){
      this.$emit('update:searchText',newText)
    }
  },
  computed:{
    hasSearchText:function(){
      return this.searchText.length > 0 && !this.disabled
    }
  },
  methods:{
    touched:function(){
      this.$emit('touched')
    },
    touchedBack:function(){
      this.$emit('touchedBack')
    },
    touchedCancel:function(){
      this.$emit('touchedCancel')
    },
    touchedClearSearchText:function(){
      this.searchText = ''
    }
  }
}
</script>

<style lang="scss">
#search-bar-show{
  position: fixed;
  background-color: #fff;
  padding: 5px 0;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  .cubeic-icon{color: #a8a8a8;}
  .search-bar{
    display: flex;
    justify-content: center;
    align-items: center;
    

    .cubeic-back{
      font-weight: bold;
      padding-right: 15px;
      color: #333;
      font-size: 20px;
    }
    .cubeic-search{
      position: relative;
      top: 0;
    }
    .cubeic-wrong{padding: 0 5px 0 10px;}
    
    .search-btn-cancel{
      color: #2bbbee;
      font-size: 17px;
      background: none;
      border: none;
      outline: none;
      padding: 5px 10px 5px 20px;
      margin-left: 10px;
    }

    .search-input-wrap{
      position: relative;
      flex-grow:1;
      padding: 10px 15px;
      background-color: #f5f5f5;
      border-radius: 40px;
      display: flex;

      .search-input{
        outline: none;
        padding: 0 5px;
        color: #333;
        background-color: #f5f5f5;
        flex-grow:1;
        font-size: initial;
        line-height:normal
      }
    }
  }
}


</style>
