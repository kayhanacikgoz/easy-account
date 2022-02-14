import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:[],
    isGiris: false
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    }
   
  },
  mutations: {
    updateIsGiris: (state) => {
      state.isGiris = true;
    },
    updateIsCikis: (state) => {
      state.isGiris = false;
    },
    loadUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    updateIsGiris: ({ commit }) => {
      commit('updateIsGiris');
    },
    updateIsCikis: ({ commit }) => {
      commit('updateIsCikis');
    },
    loadUserInfo({ commit }) {
      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=member_info", {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data).then(userInfo => {
          console.log(userInfo);
          commit('loadUserInfo', userInfo)
        })
    }
  },
  modules: {
  }
})
