<template>
  <cube-scroll-nav
    :side="true"
    :data="category"
    :current="0"
    @change="changeHandler"
    @sticky-change="stickyChangeHandler">
    <cube-scroll-nav-panel
      v-for="item in category"
      :key="item.name"
      :label="item.name"
      :title="item.name">
      <ul>
        <li v-for="(tag,index) in item.tags" :key="index">
          <div>
            <p>{{tag.name}}</p>
          </div>
        </li>
      </ul>
    </cube-scroll-nav-panel>
  </cube-scroll-nav>
</template>

<script>
export default {
  data:function(){
    return {
      category:this.getCategory()
    }
  },
  methods:{
    getCategory:function(){
      let allRecipeCategoryStr = window.localStorage.getItem('allRecipeCategory')
      let allRecipeCategory = JSON.parse(allRecipeCategoryStr)
      return allRecipeCategory.allCategory
    },
    changeHandler:function(){
      console.log('changeHandler called..')
    },
    stickyChangeHandler:function(){
      console.log('stickyChangeHandler called...')
    }
  }
}
</script>

<style>

</style>
