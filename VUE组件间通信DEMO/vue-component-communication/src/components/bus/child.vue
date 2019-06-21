<template>
  <p>{{msg}}</p>
</template>

<script>
export default {
  data:function(){
    return {
      msg:''
    }
  },
  inject:['Bus'],
  created:function(){
    let that = this
    that.Bus.$on('send-child',function(data){
      that.msg = data
    })
  }
}
</script>

<style>

</style>
