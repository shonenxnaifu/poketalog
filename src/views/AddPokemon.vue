<template>
  <div>
    <loading :active.sync="$store.getters['config/isLoading']"
      :is-full-page="true"
      :background-color="'#F6F6F6'"
      :color="'#dc3545'"></loading>
    <b-alert class="mt-2" v-model="showAlert" variant="success" dismissible>
      pokemon catched!! please give nickname!!
    </b-alert>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" label="Nick Name:" label-for="input-2">
        <b-form-input
        id="input-2"
        v-model="name"
        required
        placeholder="Enter nickname"
        ></b-form-input>
      </b-form-group>
      <b-button to="/" class="mr-2" variant="secondary">Cancel</b-button>
      <b-button type="submit" variant="primary">Add Pokemon</b-button>
    </b-form>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  data () {
    return {
      showAlert: true,
      name: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    async onSubmit (ev) {
      ev.preventDefault()
      const poke = this.$store.getters['pokemons/pokemon']
      let qty = 0
      qty = poke.owned + 1
      await this.$store.dispatch('pokemons/addPokemon', { name: poke.name, nickname: this.name, qty: qty })
      this.$router.push('/mypokemon')
    }
  }
}
</script>
