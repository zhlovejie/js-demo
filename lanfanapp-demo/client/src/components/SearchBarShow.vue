<template>
  <div id="search-bar-show" @click="touched">
    <div class="search-bar">
      <div class="search-input-wrap">
        <i class="cubeic-icon cubeic-search"></i>
        <div class="search-input">搜索食材、菜谱</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    touched:function(){
      this.$emit('touched')
    }
  }
}
</script>

<style lang="scss" scoped>
#search-bar-show{
  position: fixed;
  width: 100%;
  background-color: #fff;
  padding: 5px 0;
  z-index: 100;
}
.search-bar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
}
.search-input-wrap{
  position: relative;
  flex-grow:1;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 40px;
  display: flex;
}
.cubeic-icon{color: #a8a8a8}
.search-input{color: #a8a8a8}
</style>
