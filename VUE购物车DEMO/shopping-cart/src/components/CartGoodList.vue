<template>
  <div class="cart-good-list-item">
  <div class="fl w50">
    <div class="mt40">
        <input type="checkbox" :checked="good.checked" @click="goodChange">
    </div>
  </div>
  <div class="fl w300">
    <img :src="imgurl(good.url)" class="good-img img-thumb" alt="">
    <div class="good-info">
      <span class="good-name">{{good.name}}</span>
      <span class="good-desc mt5">{{good.desc}}</span>
      <span class="good-cont mt5">{{good.cont}}</span>
    </div>
  </div>
  <div class="fl w100">
    <div class="mt40 txt-center"><span>¥{{good.price}}</span></div>
  </div>
  <div class="fl w150">
    <div class="good-qty-wrap mt40 flex">
        <button class="btn btn-plus btn-add" @click="qtyChange('add')"></button>
        <input type="number" class="good-qty" v-model="qty">
        <button class="btn btn-minus btn-sub" @click="qtyChange('sub')"></button>
    </div>
  </div>
  <div class="fl w100">
    <div class="good-price mt40"><span>¥{{good.price}}</span></div>
  </div>
  <div class="fl w100">
    <div class="mt40">
        <a class="good-del" href="javascript:void(0);" @click="delgood(good.id)">删除</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    good:{
      type:Object,
      require:true
    }
  },
  data:function(){
    return {
      qty:1,
      checked:true
    }
  },
  methods:{
    goodChange:function(e){
      this.checked = e.target.checked
      this.$emit('good-change',this.good,this.checked,this.qty)
    },
    qtyChange:function(type){
      this.qty = this.qty + (type === 'add' ? 1 : -1)
      this.qty = this.qty <= 0 ? 1 :this.qty
    },
    delgood:function(id){
      this.$emit('del-good',id)
    },
    imgurl:function(imgName){
      return require('../assets/img/'+imgName)
    }
  },
  watch:{
    qty:function(val){
      if(!(/\d+/g.test(val))){
        this.qty = 1
      }
      this.$emit('good-change',this.good,this.checked,this.qty)
    }
  }
}
</script>
