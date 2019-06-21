<template>
  <div class="child-component">
    <p>子组件</p>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      msg:"hello   ....."
    }
  },
  methods:{
    
  },
  created:function(){
    console.log(this.$attrs)
    console.log(this.$listeners)

    this.$listeners['change'] && this.$listeners['change'](this,'hell 123')
  }
}
</script>

<style scoped>
  .child-component{
    padding: 20px;
    border: 1px solid red;
  }
</style>