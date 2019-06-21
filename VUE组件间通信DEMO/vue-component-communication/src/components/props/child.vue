<template>
  <div class="child-component">
    <slot></slot>
    <ul>
      <li v-for="(item,index) in list" :key="item.id">
        {{index}}、{{item.title}}
      </li>
    </ul>
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
  }
}
</script>

<style scoped>
  .child-component{
    padding: 20px;
    border: 1px solid red;
  }
</style>