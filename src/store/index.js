import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isGiris: false
  },
  mutations: {
    updateIsGiris: (state) => {
      state.isGiris = true;
    },
    updateIsCikis: (state) => {
      state.isGiris = false;
    }
  },
  actions: {
    updateIsGiris: ({ commit }) => {
      commit('updateIsGiris');
    },
    updateIsCikis: ({ commit }) => {
      commit('updateIsCikis');
    }
  },
  modules: {
  }
})
