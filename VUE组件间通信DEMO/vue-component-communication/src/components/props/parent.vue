<template>
  <div class="parent-component">
    <p>父组件</p>
    <slot></slot>
    <childComponent :list="list">
      <p>子组件</p>
    </childComponent>
  </div>
</template>

<script>
import childComponent from './child'

export default {
  data:function(){
    return {
      list:[
        {id:1,title:'我是来自父组件的数据1'},
        {id:2,title:'我是来自父组件的数据2'},
        {id:3,title:'我是来自父组件的数据3'},
        {id:4,title:'我是来自父组件的数据4'}
      ]
    }
  },
  components:{
    childComponent
  }
}
</script>

<style scoped>
  .parent-component{
    padding: 20px;
    border: 1px solid red;
  }
</style>
