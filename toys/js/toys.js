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

Vue.component('progress-bar',{
  data:function(){
    return {
      styleObj:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        width: 0,
        '-webkit-transition': 'width .2s,opacity .4s',
        transition: 'width .2s,opacity .4s',
        opacity: 1,
        backgroundColor: '#FEE46A',
        zIndex: 999999
      }
    }
  },
  template:`<div class='progress-bar' :style="styleObj"></div>`,
  mounted:function(){
    this.scrollHandler = _.debounce(this.scrollAction,100)
    window.addEventListener('scroll',this.scrollHandler,false)
  },
  beforeDestroy:function(){
    window.removeEventListener('scroll',this.scrollHandler)
  },
  methods:{
    scrollHandler:function(){},
    scrollAction:function(){
      let scrollTop = document.documentElement.scrollTop
      let pageTotalHeight = document.documentElement.offsetHeight
      let pageViewHeight  = window.innerHeight
      let scrollHeight = pageTotalHeight - pageViewHeight
      this.styleObj.width = scrollHeight <= 0 ? 0 : (scrollTop / scrollHeight) * 100+'%'
    }
  }
})

new Vue({
  render:function(createElement){
    return createElement('toys')
  }
}).$mount('#app')

new Vue({
  render:function(createElement){
    return createElement('progress-bar')
  }
}).$mount('#process-bar')