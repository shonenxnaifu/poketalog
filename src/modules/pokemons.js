import Vue from 'vue'
import Pokemon from '../models/PokemonClass'
import store from '../store'

export default {
  namespaced: true,
  state: {
    pokemons: [],
    pokemon: {},
    next: '',
    prev: ''
  },
  getters: {
    collection: state => state.pokemons,
    pokemon: state => state.pokemon,
    next: state => state.next,
    prev: state => state.prev
  },
  mutations: {
    setPokemons: (state, pokemons) => {
      Vue.set(state, 'pokemons', pokemons)
    },
    setPokemon: (state, pokemon) => {
      Vue.set(state, 'pokemon', pokemon)
    },
    setNext: (state, val) => {
      Vue.set(state, 'next', val)
    },
    setPrev: (state, val) => {
      Vue.set(state, 'prev', val)
    }
  },
  actions: {
    getAll: (context, param) => {
      store.dispatch('config/setLoading', true)
      return Vue.axios.get(`pokemon/${param}`)
        .then(resp => {
          const newCollection = []

          for (const pokemon of resp.data.results) {
            let pokemonObj = new Pokemon(pokemon)
            pokemonObj.owned = 0
            newCollection.push(pokemonObj)
          }

          context.commit('setPokemons', newCollection)
          context.commit('setNext', resp.data.next)
          context.commit('setPrev', resp.data.previous)
          store.dispatch('config/setLoading', false)
          return Promise.resolve(context.state.pokemons)
        })
        .catch(error => {
          context.commit('setPokemons', [])
          context.commit('setNext', '')
          context.commit('setPrev', '')
          return Promise.reject(error)
        })
    },
    getDetail: (context, param) => {
      store.dispatch('config/setLoading', true)
      return Vue.axios.get(`pokemon/${param}/`)
        .then(resp => {
          let pokemon = new Pokemon(resp.data)
          pokemon.image = resp.data.sprites.front_default
          pokemon.types = resp.data.types
          pokemon.moves = resp.data.moves
          context.commit('setPokemon', pokemon)
          store.dispatch('config/setLoading', false)
          return Promise.resolve(context.state.pokemon)
        })
        .catch(error => {
          context.commit('setPokemon', [])
          return Promise.reject(error)
        })
    }
  }
}
