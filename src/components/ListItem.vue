<template>
  <b-list-group-item :to="{name: 'PokemonDetail', params: {name: name}}" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 text-capitalize">{{name}}</h5>
      <small class="text-muted">Owned: {{qtyOwned}}</small>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  props: {
    name: String,
    qtyOwned: Number
  }
}
</script>
