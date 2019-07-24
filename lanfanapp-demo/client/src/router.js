import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RecipeDetail from './views/RecipeDetail.vue'
import SearchBar from './views/SearchBar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/recipe/:id',
      name:'recipe',
      component:RecipeDetail
    },
    {
      path:'/search',
      name:'search',
      component:SearchBar
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
