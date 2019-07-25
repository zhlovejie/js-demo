import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RecipeDetail from './views/RecipeDetail.vue'
import Search from './views/Search.vue'
import SearchResult from './views/SearchResult.vue'
import Category from './views/Category.vue'

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
      component:Search
    },
    {
      path:'/search/:kw',
      name:'searchResult',
      component:SearchResult
    },
    {
      path:'/category',
      name:'category',
      component:Category
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
