<template>
    <b-list-group-item class="flex-column align-items-start">
      <loading :active.sync="$store.getters['config/isLoading']"
      :is-full-page="true"
      :background-color="'#F6F6F6'"
      :color="'#dc3545'"></loading>
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 text-capitalize">{{name}}</h5>
        <b-button variant="danger" size="sm" @click="onRelease(name)">release</b-button>
      </div>
    </b-list-group-item>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  components: {
    Loading
  },
  props: {
    name: String,
    qtyOwned: Number
  },
  methods: {
    async onRelease (name) {
      await this.$store.dispatch('pokemons/release', { name: name })
      this.$store.dispatch('pokemons/getMyList')
    }
  }
}
</script>
