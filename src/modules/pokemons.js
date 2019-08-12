import Vue from 'vue'
import Pokemon from '../models/PokemonClass'
import store from '../store'
import { myPokemonsRef } from '../firebaseApp'

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
            myPokemonsRef.orderByChild('name').equalTo(pokemonObj.name).once('value', snap => {
              pokemonObj.owned = 0
              snap.forEach(event => {
                const res = event.val()
                pokemonObj.owned = pokemonObj.owned + res.owned
              })
            })
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
    },
    addPokemon: async (context, param) => {
      store.dispatch('config/setLoading', true)
      await myPokemonsRef.push({
        name: param.name,
        nickname: param.nickname,
        owned: param.qty
      })
      store.dispatch('config/setLoading', false)
    },
    updatePokemon: async (context, param) => {
      store.dispatch('config/setLoading', true)
      await myPokemonsRef.orderByChild('name').equalTo(param.name).once('value', snap => {
        snap.ref.update({
          owned: param.qty
        })
      })
      store.dispatch('config/setLoading', false)
    },
    getMyList: async (context) => {
      const newCollection = []
      store.dispatch('config/setLoading', true)
      await myPokemonsRef.once('value', snap => {
        snap.forEach(event => {
          let pokemonObj = new Pokemon(event.val())
          newCollection.push(pokemonObj)
        })
      })

      context.commit('setPokemons', newCollection)
      store.dispatch('config/setLoading', false)
    },
    release: async (context, param) => {
      store.dispatch('config/setLoading', true)
      let key = ''
      await myPokemonsRef.orderByChild('nickname').equalTo(param.name).once('value', snap => {
        snap.forEach(event => {
          key = event.key
        })
      })
      await myPokemonsRef.child(key).remove()
      store.dispatch('config/setLoading', false)
    }
  }
}
