<template>
    <div class="cart-footer">
    <div class="fl w100">
      <div class="mt10 w-chkbox">
          <input type="checkbox" @click="selectAll" :checked="isSelectAll"  name="selectAll-1" id="selectAll-1">
          <label for="selectAll-1">已选({{_qty}})</label>
      </div>
    </div>
    <div class="fl w100">
      <div class="mt10">
          <a href="javascript:void(0);" class="good-del" @click="clearCart">批量删除</a>
      </div>
    </div>
    <div class="fl w200 c-aaa">
      <p>商品合计：¥{{_totalPrice}}</p>
      <p class="mt5">已优惠：¥0</p>
    </div>
    <div class="fl w200">
      <div class="">
          <p><span>应付总额：</span><span class="total-money">¥{{_totalPrice}}</span></p> 
      </div> 
    </div>

    <div class="fr w100 pos-rel">
      <a href="javascript:void(0);" @click="checkout" class="btn-buy">下单</a>  
    </div>
  </div>
</template>


<script>

import {TweenLite} from 'gsap'

export default {
  props:{
    isSelectAll:{
      type:Boolean,
      default:true
    },
    totalGoods:{
      type:Object,
      default:function(){
        return {
          qty:0,
          price:0
        }
      }
    }
  },
  computed:{
    _totalPrice:function(){
      return Number(this.copyTotalGoods.price).toFixed(2)
    },
    _qty:function(){
      return this.copyTotalGoods.qty.toFixed(0)
    }
  }
  ,
  data:function(){
    return {
      copyTotalGoods:Object.assign({},this.totalGoods)
    }
  },
  methods:{
    selectAll:function(e){
      this.$emit('select-all',e.target.checked)
    },
    clearCart:function(){
      this.$emit('clearCart')
    },
    checkout:function(){
      window.location.reload(true)
    }
  },
  watch:{
    totalGoods:function(newVal,oldVal){
      this.copyTotalGoods = Object.assign({},oldVal)
      TweenLite.to(this.$data.copyTotalGoods,0.5,{
        price:newVal.price,
        qty:newVal.qty
      })
    }
  }
}
</script>

<style scoped>

</style>

