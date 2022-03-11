import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    reportItems:[],
    tranDetails: [],
    tranItems: [],
    partnerItems: []
  },
  getters: {
    reportItems: state => {
      return state.reportItems;
    },
    tranItems: state => {
      return state.tranItems;
    },
    partnerItems: state => {
      return state.partnerItems;
    },
  },
  mutations: {
    loadReportList(state, reportItems) {
      state.reportItems = reportItems;
    },
    loadTranList(state, tranItems) {
      state.tranItems = tranItems;
    },
    loadFaturaDetay(state,tranDetails) {
      state.tranDetails = tranDetails;
    },
    loadPartnerList(state,partnerItems) {
      state.partnerItems = partnerItems;
    }
  },
  actions: {
    loadReportList({ commit }) {
      let formDataReport = new FormData();

      formDataReport.append('firma', 0);
      formDataReport.append('partner', null);
      formDataReport.append('kelime', '');
      formDataReport.append('hesap', null);
      formDataReport.append('sayfano', null);
      formDataReport.append('bastarih', '2021-07-01');
      formDataReport.append('sontarih', '2022-11-30');
      formDataReport.append('gosterim', 50);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_report", formDataReport, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.report_list).then(reportItems => {
          console.log(reportItems);
          commit('loadReportList', reportItems);
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
      formDataTran.append('gosterim', 50);

      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_list", formDataTran, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.tran_list).then(tranItems => {
          console.log(tranItems);
          commit('loadTranList', tranItems)
        })
    },

    loadFaturaDetay({ commit }, value  ) {
      console.log("loadFaturaDetay  girdim." + value)
      
      let formDataDetail = new FormData();
      formDataDetail.append('islem_id', value);
      axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction", formDataDetail, {
          headers: {'Content-type' : 'application/x-www-form-urlencoded'}
        }).then(response => response.data.transaction).then(tranDetails => {
          commit('loadFaturaDetay', tranDetails);
        })
    },

    loadPartnerList({ commit }) {
      /* let formDataPartner = new FormData();
      formDataPartner.append('none', 'none'); */
     axios.post("https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=partner_list").then(response => response.data.partner_list).then(partnerItems => {
          console.log(partnerItems);
          commit('loadPartnerList', partnerItems)
        })
    },
    
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()],
})