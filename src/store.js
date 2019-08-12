import Vue from 'vue'
import Vuex from 'vuex'
import pokemons from './modules/pokemons'
import config from './modules/config'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { pokemons, config }
})
