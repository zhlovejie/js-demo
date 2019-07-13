
const recipe = {
  template:__TEMPLATE__,
  data:function(){
    return {
      recipe:__NUXT__.data[0].recipe
    }
  },
  methods:{
    calcScore:function(val){
      let _v = parseFloat(val)
      _v = isNaN(_v) ? 0 : _v.toFixed(1)
      return Math.ceil(_v) / 2
    }
  },
  filters:{
    formatScore:function (val){
      let _v = parseFloat(val)
      return isNaN(_v) ? 0 : _v.toFixed(1)
    },
    formatVedioPoster:function(urlFormat){
      let _url = urlFormat
        .replace('{width}','600')
        .replace('{height}','600')
        .replace('{format}','png')
      return _url
    }
  }
}

new Vue({
  render:function(createElement){
    return createElement('recipe')
  },
  components:{
    recipe:recipe
  }
}).$mount('#app')