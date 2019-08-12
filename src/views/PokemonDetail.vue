<template>
  <div>
    <loading :active.sync="$store.getters['config/isLoading']"
      :is-full-page="true"
      :background-color="'#F6F6F6'"
      :color="'#dc3545'"></loading>
    <b-alert class="mt-2" v-model="showAlert" variant="danger" dismissible>
      failed to catch pokemon!! try again!!
    </b-alert>
    <b-row>
      <b-col cols="12" class="text-center">
        <b-card class="mt-2">
          <b-card-body>
            <b-card-title class="text-capitalize">{{$store.getters['pokemons/pokemon'].name}}</b-card-title>
            <b-img-lazy fluid :blank-color="'#EDE9E9'" :height="50" :src="`${ getImage() }`"></b-img-lazy>
          </b-card-body>
          <b-list-group flush>
            <b-list-group-item>Types: {{getTypes()}} </b-list-group-item>
            <b-list-group-item>Moves: {{getMoves()}} </b-list-group-item>
          </b-list-group>
          <b-card-footer>
            <b-button to="/" class="mr-2" variant="secondary">Back</b-button>
            <b-button href="#" @click="catchPoke()" class="ml-2" variant="success">Catch!!</b-button>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'PokemonDetail',
  data () {
    return {
      showAlert: false
    }
  },
  created () {
    this.$store.dispatch('pokemons/getDetail', this.$route.params.name)
  },
  components: {
    Loading
  },
  methods: {
    getImage () {
      return this.$store.getters['pokemons/pokemon'].image
    },
    getTypes () {
      const res = this.$store.getters['pokemons/pokemon'].types
      if (res) {
        const arr = res.map(item => {
          return item.type.name
        })
        return arr.toString().replace(/,/g, ', ')
      } else {
        return '-'
      }
    },
    getMoves () {
      const res = this.$store.getters['pokemons/pokemon'].moves
      if (res) {
        let arrTemp = []
        arrTemp = res.filter((item, index) => {
          return index < 5
        })
        const arr = arrTemp.map((item, index) => {
          return item.move.name
        })
        return arr.toString().replace(/,/g, ', ')
      } else {
        return '-'
      }
    },
    catchPoke () {
      const rand = Math.random()
      if (rand > 0.5) {
        this.$router.push('/add-pokemon')
      } else {
        this.showAlert = true
      }
      // myPokemonsRef.push({ name: 'poke test 2' })
    }
  }
}
</script>
