<template>
  <childComponent></childComponent>
</template>

<script>
import childComponent from './child'
export default {
  inject:['Bus'],
  mounted:function(){
    console.log(this.Bus)
    this.Bus.$emit('send-child','123')
  },
  components:{
    childComponent
  }
}
</script>

<style>

</style>
