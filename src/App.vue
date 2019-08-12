<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Pokétalog</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact-active-class="active">POKEMON LIST</b-nav-item>
          <b-nav-item to="/mypokemon" exact-active-class="active">MY POKEMON LIST</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col cols="12">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
</style>
