<template>
  <div class="bottom-tab-bar-wrapper">
    <cube-tab-bar v-model="selectedLabelSlotsOnly" @click="clickHandler" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <i slot="icon" :class="item.icon"></i>
        <!-- use en empty tag to replace default slot -->
        <span></span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      selectedLabelSlotsOnly: '/',
      tabs: [{
        label: '/',
        icon: 'cubeic-home'
      }, {
        label: '/note',
        icon: 'cubeic-time'
      }, {
        label: '/notification',
        icon: 'cubeic-notification'
      }, {
        label: '/me',
        icon: 'cubeic-person'
      }]
    }
  },
  methods:{
    clickHandler:function (label) {
      console.log('tab was clicked', label)
    },
    changeHandler:function (label) {
      console.log('value has changed, now is', label)
      this.$router.push(label)
    }
  }
}
</script>

<style lang="scss">
.bottom-tab-bar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  height: 40px;
  overflow: hidden;
  .cube-tab{
    color:#aaa;
    padding: 10px 0;
    i{
      font-size: 20px;
    }
  }
  .cube-tab_active{
    color: #333;
  }
}
</style>
