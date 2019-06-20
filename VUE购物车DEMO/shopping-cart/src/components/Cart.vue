<template>
  <div class="cart" v-if="selectGoods.length > 0">
    <cartHeader @select-all="SelectAllChange" :isSelectAll="isSelectAll"></cartHeader>
    <transition-group name="list" tag="p">
      <cartGoodList 
        v-for="good in selectGoods" 
        :good="good" 
        :key="good.id" 
        @good-change="goodChange"
        @del-good = "delGood" 
      ></cartGoodList>
    </transition-group>
    <cartFooter 
      @select-all="SelectAllChange" 
      @clearCart="clearCart"
      :isSelectAll="isSelectAll" 
      :totalGoods="totalGoods">
    </cartFooter>
  </div>
  <div class="cart empty-status" v-else>
    <p class="empty-status-text">购物车还是空的</p>
    <p class="empty-status-action">
        <a href="">登录</a><a href="">继续逛</a>
    </p>
  </div>
</template>

<script>
import cartHeader from './CartHeader.vue';
import cartFooter from './CartFooter.vue';
import cartGoodList from  './CartGoodList.vue';
import goodList from '../assets/js/data'

export default {
  props:{
    goods:{
      type:Array,
      require:true,
      default:function(){
        goodList.forEach(good=>{
          good.qty = 1
          good.checked = true
        })
        return goodList
      }
    }
  },
  data:function(){
    return {
      selectGoods:this.goods.slice()
    }
  },
  methods:{
    goodChange:function(good,checked,qty){
      let _index = this.indexGood(good.id)
      this.selectGoods[_index].qty = qty || 1
      this.selectGoods[_index].checked = checked
    },
    hasGood:function(id){
      return this.indexGood(id) >= 0
    },
    delGood:function(id){
      const _index = this.indexGood(id)
      if(_index !== -1){
        this.selectGoods.splice(_index,1)
      }
    },
    indexGood:function(id){
      const goods = this.selectGoods.filter(good=>good.id === id)
      return goods.length > 0 ? this.selectGoods.indexOf(goods[0]) : -1
    },
    SelectAllChange:function(val){
      this.selectGoods.forEach(good=>{good.checked = val})
    },
    clearCart:function(){
      this.selectGoods = []
    }
  },
  computed:{
    totalGoods:function(){
      let price = this.selectGoods
        .reduce(function(adder,val){
          return val.checked ? adder + (val.price * val.qty) : adder
        },0)
      return {
        qty:this.selectGoods.filter(good=>good.checked === true).length,
        price:Number(price).toFixed(2)
      }
    },
    isSelectAll:function(){
      return this.selectGoods.filter(good=>good.checked === true).length === this.selectGoods.length
    }
  },
  components:{
    cartHeader,
    cartFooter,
    cartGoodList
  }
}
</script>


<style>

</style>
