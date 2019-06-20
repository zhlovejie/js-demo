<template>
  <div class="cart-header">
    <div class="fl w100 w-chkbox">
      <input type="checkbox" @click="selectAll" :checked="isSelectAll" name="selectAll" id="selectAll">
      <label for="selectAll">全选</label>
    </div>
    <div class="fl w250">商品信息</div>
    <div class="fl w100 txt-center">单价</div>
    <div class="fl w150"><span class="ml30">数量</span></div>
    <div class="fl w100">小计</div>
    <div class="fl w100">操作</div>
  </div>
</template>

<script>
export default {
  props:{
    isSelectAll:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    selectAll:function(e){
      this.$emit('select-all',e.target.checked)
    }
  }
}
</script>

<style scoped>

</style>


