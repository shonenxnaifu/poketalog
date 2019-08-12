<template>
  <div>
    <loading :active.sync="$store.getters['config/isLoading']"
      :is-full-page="true"
      :background-color="'#F6F6F6'"
      :color="'#dc3545'"></loading>
    <b-row>
      <b-col cols="12">
        <h4 class="text-center m-2">My Pokemon List</h4>
      </b-col>
    </b-row>
    <b-list-group>
      <my-list-item
        v-for="(item, index) in $store.getters['pokemons/collection']"
        :key="index"
        :name="item.nickname"
        :qty-owned="item.owned">
      </my-list-item>
    </b-list-group>
  </div>
</template>

<script>
import MyListItem from '../components/MyListItem'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'MyPokemonList',
  data () {
    return {
      listPokemon: []
    }
  },
  components: {
    MyListItem,
    Loading
  },
  created () {
    this.$store.dispatch('pokemons/getMyList')
  }
}
</script>
