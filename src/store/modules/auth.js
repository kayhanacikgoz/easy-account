import axios from "axios";

const state = {
    user: null,
};

const getters = {
   
    isAuthenticated: (state) => !!state.user,   
    StateUser: (state) => state.user,
};

const actions = {
    // localde çalıştırmak isterseniz axios içerisinde basee url den sonraki kısım localde olduğu için böyle uzun yazıldı. normalde sadece login, post_get vb. olacak
    async LogIn({commit}, user) {
        let response = await axios.post('hizmet.php?page=login', user);
        console.log(response.data);
        if (response.status==200 && response.data.MSG_TYPE =="S") {     
            await commit('setUser', user.get('email'));
            let res = await axios.post('hizmet.php?page=member_info');
            console.log(res.data);
        } else {
            alert(response.data.MSG_CONTENT);
        }
      },

    async LogOut({commit}){
        let response = await axios.post('hizmet.php?page=logout');
        console.log(response.data);
        let user = null
        commit('logout', user)
    },
};

const mutations = {
    setUser(state, email){
        state.user = email;
    },
    logout(state){
        state.user = null;
        //state.home = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};