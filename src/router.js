import Vue from 'vue'
import Router from 'vue-router'
import PokemonList from './views/PokemonList.vue'
import PokemonDetail from './views/PokemonDetail.vue'
import MyPokemonList from './views/MyPokemonList.vue'
import AddPokemon from './views/AddPokemon.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList
    },
    {
      path: '/pokemon-detail/:name',
      name: 'PokemonDetail',
      component: PokemonDetail
    },
    {
      path: '/mypokemon',
      name: 'MyPokemonList',
      component: MyPokemonList
    },
    {
      path: '/add-pokemon',
      name: 'AddPokemon',
      component: AddPokemon
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
