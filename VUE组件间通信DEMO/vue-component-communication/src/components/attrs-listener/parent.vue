<template>
  <div class="parent-component">
    <p>父组件</p>
    <childComponent :name="123" named="named" title="12222" @change="change"></childComponent>
  </div>
</template>

<script>
import childComponent from './child'

export default {
  data:function(){
    return {}
  },
  methods:{
    change:function(child,msg){
      console.log(arguments)

      console.log(this)
      child.msg = msg
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
