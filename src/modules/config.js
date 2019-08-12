import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  getters: {
    isLoading: state => state.isLoading
  },
  mutations: {
    setLoading: (state, data) => {
      Vue.set(state, 'isLoading', data)
    }
  },
  actions: {
    setLoading: (context, data) => {
      context.commit('setLoading', data)
      return Promise.resolve(context.state.isLoading)
    }
  }
}
