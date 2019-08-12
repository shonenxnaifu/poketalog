<template>
  <div>
    <loading :active.sync="$store.getters['config/isLoading']"
      :is-full-page="true"
      :background-color="'#F6F6F6'"
      :color="'#dc3545'"></loading>
    <b-row>
      <b-col cols="12">
        <h4 class="text-center m-2">Pokemon List</h4>
      </b-col>
    </b-row>
    <b-list-group>
      <list-item
        v-for="(item, index) in $store.getters['pokemons/collection']"
        :key="index"
        :name="item.name"
        :qty-owned="item.owned">
      </list-item>
    </b-list-group>
    <b-row>
      <b-col cols="12" class="text-center mt-2">
        <b-button v-if="$store.getters['pokemons/prev']" @click="prevClick" class="mr-2" variant="primary">Prev</b-button>
        <b-button v-if="$store.getters['pokemons/next']" @click="nextClick" class="ml-2" variant="primary">Next</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListItem from '../components/ListItem'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'PokemonList',
  data () {
    return {
      listPokemon: []
    }
  },
  components: {
    ListItem,
    Loading
  },
  created () {
    this.$store.dispatch('pokemons/getAll', '?offset=0&limit=10')
  },
  methods: {
    nextClick () {
      this.$store.dispatch('pokemons/getAll', this.getNextParamPage())
    },
    prevClick () {
      this.$store.dispatch('pokemons/getAll', this.getPrevParamPage())
    },
    getNextParamPage () {
      const link = this.$store.getters['pokemons/next']
      const arr = link.split('?')

      return `?${arr[1]}`
    },
    getPrevParamPage () {
      const link = this.$store.getters['pokemons/prev']
      const arr = link.split('?')

      return `?${arr[1]}`
    }
  }
}
</script>
