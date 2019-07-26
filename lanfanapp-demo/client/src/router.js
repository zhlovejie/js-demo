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
      component: Home,
      children:[
        {path:'',component: Home},
        {path:'search',components: {search:Search}},
        {path:'category',components: {search:Category}},
        {path:'search/:kw',components: {search:SearchResult}},
        {path:'recipe/:id',components: {search:RecipeDetail}}
      ]
    },
    // {
    //   path:'/recipe/:id',
    //   name:'recipe',
    //   component:RecipeDetail
    // },
    // {
    //   path:'/search',
    //   name:'search',
    //   components:{
    //     search:Search
    //   }
    // },
    // {
    //   path:'/search/:kw',
    //   name:'searchResult',
    //   components:{
    //     search:SearchResult
    //   }
    // },
    // {
    //   path:'/category',
    //   name:'category',
    //   components:{
    //     category:Category
    //   }
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
