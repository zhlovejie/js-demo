<template>
  <div class="parent-component">
    <p>父组件</p>
    <ul>
      <li v-for="(item,index) in list" :key="item.id">
        {{index}}、{{item.title}}
      </li>
    </ul>
    <childComponent @change="change"></childComponent>
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
  methods:{
    change:function(action,arr){
      if(action === 'del'){
        this.list = this.list.filter(function(item,index){
          return !arr.includes(index)
        })
      }
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
