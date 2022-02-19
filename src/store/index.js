import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:[],
    reportItems:[],
    tranDetails: [],
    tranItems: [],
    isGiris: false,
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    reportItems: state => {
      return state.reportItems;
    },
    tranItems: state => {
      return state.tranItems;
    },
   
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
    },
    loadReportList(state, reportItems) {
      state.reportItems = reportItems;
    },
    loadTranList(state, tranItems) {
      state.tranItems = tranItems;
    },
    loadDetail(state,tranDetails) {
      state.tranDetails = tranDetails;
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
      let formData = new FormData();

        formData.append('member_id', 2);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=member_info", formData, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data).then(userInfo => {
          //console.log(userInfo);
          commit('loadUserInfo', userInfo)
        })
    },
    loadReportList({ commit }) {
      let formDataReport = new FormData();

      formDataReport.append('firma', 0);
      formDataReport.append('partner', null);
      formDataReport.append('kelime', '');
      formDataReport.append('hesap', null);
      formDataReport.append('sayfano', null);
      formDataReport.append('bastarih', '2021-07-01');
      formDataReport.append('sontarih', '2022-11-30');
      formDataReport.append('gosterim', 10);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_report", formDataReport, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.tran_list).then(reportItems => {
          console.log(reportItems);
          commit('loadReportList', reportItems)
        })
    },
    loadTranList({ commit }) {
      let formDataTran = new FormData();

      formDataTran.append('firma', 0);
      formDataTran.append('partner', null);
      formDataTran.append('kelime', '');
      formDataTran.append('hesap', null);
      formDataTran.append('parabr', null);
      formDataTran.append('sayfano', null);
      formDataTran.append('bastarih', '2021-07-01');
      formDataTran.append('sontarih', '2022-11-30');
      formDataTran.append('gosterim', 10);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_list", formDataTran, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.tran_list).then(tranItems => {
          console.log(tranItems);
          commit('loadTranList', tranItems)
        })
    },
    loadFaturaDetay({ commit }) {
      let formDataDetail = new FormData();

      formDataDetail.append('islem_id', 40);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction", formDataDetail, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.transaction).then(tranDetails => {
          console.log(tranDetails);
          commit('loadDetail', tranDetails)
        })
    },
  },
  modules: {
  }
})