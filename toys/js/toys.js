Vue.component('panel',{
  props:['item'],
  template:`
  <div class="panel">
    <div class="title" v-if="item.title">{{item.title}}</div>
    <div class="content" v-html="item.content"></div>
  </div>
  `
})

Vue.component('toys',{
  data:function(){
    return {
      toyList:toyList
    }
  },
  template:`
  <div class="panel-group">
    <panel 
      v-for="(item,index) in toyList" 
      :key="index" 
      :item="item"
    >
    </panel>
  </div>`
})

new Vue({
  render:function(createElement){
    return createElement('toys')
  }
}).$mount('#app')