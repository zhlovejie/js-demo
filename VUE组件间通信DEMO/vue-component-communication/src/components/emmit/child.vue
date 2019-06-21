<template>
  <div class="child-component">
    <p>子组件</p>
    <button @click="change">click 更新父组件数据</button>
  </div>
</template>

<script>
export default {
  props:{
    list:{
      type:Array,
      require:true,
      default:function(){
        return []
      }
    }
  },
  methods:{
    change:function(){
      this.$emit('change','del',[0,1,2])
    }
  }
}
</script>

<style scoped>
  .child-component{
    padding: 20px;
    border: 1px solid red;
  }
</style>